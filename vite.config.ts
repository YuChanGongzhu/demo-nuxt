// // vite.config.ts
// import { viteMockServe } from 'vite-plugin-mock'

// export default {
//   plugins: [
//     viteMockServe({
//       mockPath: './src/mock'
//     })
//   ]
// }

//官网配置
import type { UserConfigExport, ConfigEnv } from 'vite'

import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'

export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      vue(),
      viteMockServe({
        mockPath: '~/mock',
        enable: true,
      }),
    ],
  }
}