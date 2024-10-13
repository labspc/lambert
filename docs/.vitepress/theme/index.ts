// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'

// // 引入时间线样式
// import "vitepress-markdown-timeline/dist/theme/index.css";

// // 引入浏览人数统计
// import { inBrowser } from 'vitepress'
// import busuanzi from 'busuanzi.pure.js'

// // 引入图片放大
// import mediumZoom from 'medium-zoom';
// import { onMounted, watch, nextTick } from 'vue';
// import { useRoute } from 'vitepress';

// // 引入看板娘
// import { useLive2d } from 'vitepress-theme-website'

// 引入评论
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import { useData, useRoute } from 'vitepress';

export default {
    extends: DefaultTheme,

    // enhanceApp({ app , router }) {
    //     if (inBrowser) {
    //         router.onAfterRouteChanged = () => {
    //             busuanzi.fetch()
    //         }
    //     }
    // },

    // setup() {
    //     const route = useRoute();
    //     const initZoom = () => {
    //         // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
    //         mediumZoom('.main img', { background: 'var(--vp-c-bg)' }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    //     };
    //     onMounted(() => {
    //         initZoom();
    //     });
    //     watch(
    //         () => route.path,
    //         () => nextTick(() => initZoom())
    //     );


        // useLive2d({
        //     enable: true,
        //     model: {
        //         url: 'https://raw.githubusercontent.com/iCharlesZ/vscode-live2d-models/master/model-library/tororo/tororo.model.json'
        //     },
        //     display: {
        //         position: 'right',
        //         width: '135px',
        //         height: '300px',
        //         xOffset: '35px',
        //         yOffset: '5px'
        //     },
        //     mobile: {
        //         show: true
        //     },
        //     react: {
        //         opacity: 0.8
        //     }
        // })
    setup() {
        // Get frontmatter and route
        const { frontmatter } = useData();
        const route = useRoute();

        // giscus配置
        giscusTalk({
                repo: 'labspc/lambert', //仓库
                repoId: 'R_kgDOM_cCYA', //仓库ID
                category: 'Announcements', // 讨论分类
                categoryId: 'DIC_kwDOM_cCYM4CjUwT', //讨论分类ID
                mapping: 'pathname',
                inputPosition: 'bottom',
                lang: 'zh-CN',
            },
            {
                frontmatter, route
            },
            //默认值为true，表示已启用，此参数可以忽略；
            //如果为false，则表示未启用
            //您可以使用“comment:true”序言在页面上单独启用它
            true
        )}
}