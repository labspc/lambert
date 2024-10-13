// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'

// 只需添加以下一行代码，引入时间线样式
import "vitepress-markdown-timeline/dist/theme/index.css";
import { inBrowser } from 'vitepress'
import busuanzi from 'busuanzi.pure.js'

export default {
    extends: DefaultTheme,

    enhanceApp({ app , router }) {
        if (inBrowser) {
            router.onAfterRouteChanged = () => {
                busuanzi.fetch()
            }
        }
    },
}