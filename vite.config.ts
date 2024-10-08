import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// vant 相关插件
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import postcsspxtoviewport from 'postcss-px-to-viewport'
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({ resolvers: [VantResolver()], }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '127.0.0.1',
    port: 3000,
    proxy: {
      // 跨域代理
      '/api': {
        target: 'http://localhost:8887',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }

  },

  css: {
    postcss: {
      plugins: [
        postcsspxtoviewport({
          unitToConvert: 'px', // 要转化的单位
          viewportWidth: 375, // UI设计稿的宽度
          unitPrecision: 6, // 转换后的精度，即小数点位数
          propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
          viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
          fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
          selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
          minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
          mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
          replace: true, // 是否转换后直接更换属性值
          landscape: false, // 是否处理横屏情况
          // landscapeUnit: 'vw', // 指定横屏情况下的视窗单位，默认vw
          // landscapeWidth: 375, // 指定横屏情况下的视窗宽度，默认375
          // landscapeMinPixelValue: 1, // 指定横屏情况下的最

        })
      ]
    }
  },
})
