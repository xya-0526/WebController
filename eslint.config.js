import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'
import eslintConfigPrettier from '@vue/eslint-config-prettier'
// import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfig([
    // 基础配置 - 适用于所有文件类型
    {
        files: [
            '**/*.{js,mjs,cjs,ts,mts,cts,vue}'
        ],
        languageOptions: {
            globals: globals.browser
        },
        rules: {
            'prettier/prettier': 'error' // 让 Prettier 规则作为 ESLint 错误出现
        }
    },

    // TypeScript 推荐配置
    ...tseslint.configs.recommended,

    // Vue 基础配置
    pluginVue.configs['flat/essential'],

    // Vue 文件的 TypeScript 解析器配置
    {
        files: ['**/*.vue'],
        languageOptions: {
            parserOptions: {
                parser: tseslint.parser
            }
        }
    },

    // Prettier 集成 - 只需引入一次
    eslintConfigPrettier,

    // 跳过格式化相关规则
    // skipFormatting,

    // 忽略文件配置
    {
        ignores: [
            'node_modules/',
            'dist/',
            'build/'
        ]
    }
])
