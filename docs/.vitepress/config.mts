// docs/.vitepress/config.mts
import { defineConfig } from 'vitepress';
import AutoSidebar from 'vite-plugin-vitepress-auto-sidebar';
import timeline from "vitepress-markdown-timeline";


export default defineConfig({
  title: 'labspc',
  description: 'Lambert 的卡片盒',
  vite: {
    // 配置 Vite 插件
    plugins: [
      AutoSidebar({
        // 要忽略的文件列表
        ignoreList: ['README.md'],
        // 侧边栏生成的根路径
        path: 'docs',
        // 是否忽略仅包含 index.md 的页面
        ignoreIndexItem: true,
        // 默认是否折叠侧边栏
        collapsed: false,
        // 删除侧边栏项目的前缀
        deletePrefix: 'docs',
        // 处理侧边栏数据的回调函数
        sideBarResolved(data) {
          return data;
        },
        // 处理解析后的侧边栏项数据的回调函数
        sideBarItemsResolved(data) {
          return data;
        },
        // 生成侧边栏项目之前处理文件名列表的回调函数
        beforeCreateSideBarItems(data) {
          return data;
        },
        // 是否使用文件标题作为侧边栏标题
        titleFromFile: false,
      }),
    ],
  },

  markdown: {
    lineNumbers: true,
    config: (md) => {
      md.use(timeline);
    },
  },


  themeConfig: {
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/labspc' }
    ],
    footer: {
      message: '<a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">CC BY-NC-ND 4.0 禁止转载，引用请注明作者与原链.</a>'
          + ' - ' + '<a href="http://beian.miit.gov.cn/">陕ICP备2024028002号</a> \n',
      copyright: 'Copyright © 2024 | Lambert'
    }
  }
});
