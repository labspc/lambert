import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "labspc",
  description: "Lambert 的卡片盒",
  themeConfig: {
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about' } // New nav item
    ],
    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   },
    //   {
    //     text: 'New Section', // New sidebar section
    //     items: [
    //       { text: 'Item 1', link: '/new-section/item-1' },
    //       { text: 'Item 2', link: '/new-section/item-2' }
    //     ]
    //   }
    // ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/labspc' }
    ],
    footer: {
      message: '<a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">CC BY-NC-ND 4.0 禁止转载，引用请注明作者与原链.</a>'
         +' - ' + '<a href="http://beian.miit.gov.cn/">陕ICP备2024028002号</a> \n',
      copyright: 'Copyright © 2024 | Lambert'
    }
  }
})