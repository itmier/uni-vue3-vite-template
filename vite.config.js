/*
 * @Author: 王云飞
 * @Date: 2023-01-09 15:57:35
 * @LastEditTime: 2023-01-11 15:49:43
 * @LastEditors: 王云飞
 * @Description:
 *
 */
import { defineConfig, loadEnv } from 'vite'
import h5ProdEffectPlugin from 'uni-vite-plugin-h5-prod-effect'
import Unocss from 'unocss/vite'
import uni from '@dcloudio/vite-plugin-uni'
// https://vitejs.dev/config/
import path from 'path'
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.log('env', env)
  return defineConfig({
    plugins: [
      uni(),
      // 对h5 production环境打包时的特殊处理，否则uni-crazy-router在这个环境会异常
      h5ProdEffectPlugin(),
      Unocss({
        /* options */
      })
    ],
    base: env.VITE_APP_BASE,
    host: '0.0.0.0',
    server: {
      host: '0.0.0.0',
      port: 6400,
      proxy: {
        '/mock': {
          target: 'https://mock.apifox.cn/m1/1156743-0-default',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/mock/, '')
        }
      }
    },
    esbuild: {
      drop: ['console', 'debugger']
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/global.scss";'
        }
      }
    }
  })
}
