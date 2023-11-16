import { Plugin, UserConfig } from 'vite'
import { SiteConfig } from 'vitepress'


export default function(options = {}): Plugin {
  return {
    name: 'vite-plugin-vitepress-auto-nav',
    config(config) {
      const { vitepress } = config as UserConfig & { vitepress: SiteConfig }
      
      // ['document', 'javascript', 'vue', 'index.md']

      // const nav = {
      //   'document': {},
      //   'zdz': {}
      // }
      const navNames = new Set<string>()

      vitepress.pages.forEach(item => {
        const paths = item.split(',')

        if (paths.length === 1) return;

        const last = paths.pop();
        // navNames.add(paths[0]);
        if (last === 'index.md') return;

        const navName = paths.shift();

        paths.forEach(folder => {

        })

        

        


        // ['vue', 'v2', 'index.md']
        // ['vue', 'v3', 'index.md']


      })
      // navNames.add()


      // // vitepress.pages.forEach
      // {
      //   document: {
      //     js,
      //     ts
      //   }
      // }
      // // Object.keys()
      // const paths = []

      // debugger
      
      return config;
    }
  }
}