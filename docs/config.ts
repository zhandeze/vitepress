import { defineConfig } from 'vitepress'
import AutoNav from './vite-plugin-vitepress-auto-nav';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Awesome Project",
  description: "A VitePress Site",
  outDir: './.dist',
  base: '/vitepress',
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  vite: {
    plugins: [AutoNav()]
  }
})


