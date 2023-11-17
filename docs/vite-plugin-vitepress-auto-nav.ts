import { Plugin, UserConfig } from 'vite';
import { SiteConfig, DefaultTheme } from 'vitepress';

interface Item {
  name: string;
  base: string[];
  floders: Map<string, Item>;
  files: string[];
}

export default function (options = {}): Plugin {
  return {
    name: 'vite-plugin-vitepress-auto-nav',
    config(config) {
      const { vitepress } = config as UserConfig & { vitepress: SiteConfig };

      const createItem = (name: string = '', base: string[] = []): Item => ({
        name,
        base,
        floders: new Map(),
        files: []
      });

      const tree = createItem();

      vitepress.pages.forEach((path) => {
        const names = path.split('/');
        const last = names.pop() as string;
        const isIndexMd = last === 'index.md';

        if (!names.length || (names.length > 1 && isIndexMd)) return;

        const base: string[] = [];
        let item = tree;
        names.forEach((name) => {
          base.push(name);
          if (!item.floders.get(name)) {
            item.floders.set(name, createItem(name, [...base]));
          }
          item = item.floders.get(name)!;
        });

        !isIndexMd && item.files.push(last.replace(/\.md$/, ''));
      });

      const deep = (current: Item): DefaultTheme.SidebarItem[] => {
        let items: any[] = [];
        current.floders.forEach((value) => {
          items = items.concat(deep(value));
        });

        if (current.files.length) {
          const files = current.files.map((fileName) => ({ text: fileName, link: fileName }));
          items = items.concat(files);
        }

        if (current.name) {
          const base = `/${current.base.join('/')}/`;
          items = [
            {
              text: current.name,
              base,
              collapsed: false,
              items
            }
          ];
        }
        return items;
      };

      const nav: DefaultTheme.NavItem[] = [];
      const sidebar: DefaultTheme.Sidebar = {};

      deep(tree).forEach((item) => {
        const link = item.base as string;
        nav.push({
          text: item.text!,
          link,
          activeMatch: link
        });
        if (item.items?.length) {
          sidebar[link] = {
            base: link,
            items: item.items!
          };
        }
      });
      debugger
      vitepress.site.themeConfig.nav = nav;
      vitepress.site.themeConfig.sidebar = sidebar;

      return config;
    }
  };
}
