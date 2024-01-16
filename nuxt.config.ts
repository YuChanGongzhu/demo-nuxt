// https://nuxt.com/docs/api/configuration/nuxt-config
// import { viteMockServe } from 'vite-plugin-mock'

export default defineNuxtConfig({
  devtools: { enabled: true },
  // app: {
  //   baseURL: './src/app.vue'
  // },
  modules: [
    // ...
    'tdesign-vue-next/es/nuxt',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt'
  ],
  build: {
    transpile: ['tdesign-vue-next'],
  },
  ssr: false
  // vite: {
  //   plugins: [
  //     viteMockServe({
  //       // 指定 mock 文件夹路径
  //       mockPath: '~/mock',
  //       enable: true
  //     })
  //   ]
  // },
})