import { defineConfig, DefaultTheme } from 'vitepress'
import AutoNav from './vite-plugin-vitepress-auto-nav';
console.log('[zdz]:', 'aaa')
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Awesome Project",
  description: "A VitePress Site",
  outDir: './.dist',
  base: '/vitepress',
  themeConfig: {
      
    // nav: nav(),

    // sidebar: {
    //   '/document/': { base: '/document/', items: slidebarDocument() }
    // },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  vite: {
    plugins: [AutoNav()]
  }
})


function nav():DefaultTheme.NavItem[] {
  return [{ text: '文档', link: '/document/index', activeMatch: '/document/' }]
}

function slidebarDocument():DefaultTheme.SidebarItem[] {
  return [{
    text: 'javascript',
    base: '/document/javascript/',
    collapsed: false,
    items: [
      { text: 'index', link: 'index' },
      { text: 'cropper', link: 'cropper' },
      { text: 'proxy-receiver', link: 'proxy-receiver' },
      { text: 'proxy', link: 'proxy' },
      { text: 'WeakMap', link: 'WeakMap' },
    ]
  },{
    text: 'typescript',
    base: '/document/typescript/',
    collapsed: false,
    items: [
      { text: 'conditional-types', link: 'conditional-types' },
      { text: 'data-type', link: 'data-type' },
      { text: 'discrominated-union', link: 'discrominated-union' },
      { text: 'exclamation', link: 'exclamation' },
      { text: 'infer', link: 'infer' },
      { text: 'intersections', link: 'intersections' },
      { text: 'keyword-is', link: 'keyword-is' },
      { text: 'keyword-keyof', link: 'keyword-keyof' },
      { text: 'keyword-typeof', link: 'keyword-typeof' },
      { text: 'namespace', link: 'namespace' },
      { text: 'new-normal-function', link: 'new-normal-function' },
      { text: 'Symbol.iterator', link: 'Symbol.iterator' },
      { text: 'challenges', base: '/document/typescript/challenges/', collapsed: false, items: [
        { text: 'easy', link: 'easy'}
      ]}
    ]
  }]
}

