import { Plugin, UserConfig } from 'vite'
import { SiteConfig, DefaultTheme } from 'vitepress'


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
        const slidebar = new Map<string, DefaultTheme.SidebarItem>()

        // paths.forEach(folder => {

        // })

        const deep = (index: number, parent: Map<string, DefaultTheme.SidebarItem>) => {
          const name = paths[index];
          const childFloder = paths[index + 1]
          if (folder) {
            let item = parent.get(folder)
            if (!item) {
              item = {
                text: folder,
                items: new Map()
              }
              parent.set(folder, item)
            }

            deep(index + 1, item)
            {
              document: [{
                typescript: []
              }]
            }
            ['document', 'typescript', 'vue', 'v2', 'a.md']
            ['document', 'typescript', 'vue', 'v2', 'b.md']
            ['document', 'typescript', 'vue', 'v3', 'b.md']
            ['document', 'typescript', 'vue', 'b.md']
            let parent = new Map()
            names.forEach(name => {
              item = parent.get(name)
              
            })

            map = {
              typescript: {
                children: {
                  v2: {
                    children: {},
                    items: []
                  }
                },
                items: []
              },
              javascript: {
                
              }
            }
            


            

            // const item = { text: folder }
            // if (childFloder) {
            //   // item.base =  
            // } else {
              
            // }
            // // const items = 
            // parentItems.push({
              
            // })
          }
        }

        // document = {
        //   js: [{
        //     vue: [{
        //       v2: []
        //     }],
        //   }],
        //   jsx: []
        // }

        // const sliderMap = new Map()

        

        // deep()

        

        


        // ['vue', 'v2', 'a.md']
        // ['vue', 'v2', 'b.md']


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