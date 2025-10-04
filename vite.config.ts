import {
    defineConfig,
    loadEnv
} from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
// https://vite.dev/config/
export default defineConfig(
    ({ command, mode }) => {
        const env = loadEnv(
            mode,
            process.cwd()
        )
        return {
            base: env.VITE_APP_BASE,
            plugins: [
                vue(),
                tailwindcss(),
                AutoImport({
                    resolvers: [
                        ArcoResolver()
                    ]
                }),
                Components({
                    resolvers: [
                        ArcoResolver({
                            sideEffect: true
                        })
                    ]
                })
            ],
            server: {
                base: env.VITE_APP_BASE,
                port: 5173, // 指定端口号
                host: '0.0.0.0', // 允许局域网访问（默认只允许本机 localhost）
                strictPort: true, // 如果端口被占用，不要自动换端口，直接报错
                open: true, // 启动时自动打开浏览器
                proxy: {
                    '/api': {
                        target: env.VITE_API_BASE_URL, // 后端服务器地址
                        changeOrigin: true, // 允许跨域
                        rewrite: (
                            path
                        ) =>
                            path.replace(
                                /^\/api/,
                                ''
                            ) // 重写路径
                    }
                }
            },
            resolve: {
                alias: {
                    '@': path.resolve(
                        __dirname,
                        './src'
                    ),
                    '@components':
                        path.resolve(
                            __dirname,
                            './src/components'
                        ),
                    '@view':
                        path.resolve(
                            __dirname,
                            './src/view'
                        ),
                    '@router':
                        path.resolve(
                            __dirname,
                            './src/router'
                        )
                }
            }
        }
    }
)
