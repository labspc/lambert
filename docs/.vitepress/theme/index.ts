// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'

// // 引入时间线样式
// import "vitepress-markdown-timeline/dist/theme/index.css";

// // 引入浏览人数统计
// import { inBrowser } from 'vitepress'
// import busuanzi from 'busuanzi.pure.js'

// 引入图片放大
import mediumZoom from 'medium-zoom';
import { onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';

// // 引入看板娘
// import { useLive2d } from 'vitepress-theme-website'

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


}