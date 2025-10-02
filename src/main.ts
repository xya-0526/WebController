import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { pinia } from '@/store/index.ts'
import { router } from '@router/index'
import '@arco-design/web-vue/dist/arco.css'
import ArcoVue from '@arco-design/web-vue'
// @ts-ignore
import VMdEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
// @ts-ignore
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'

// highlightjs
import hljs from 'highlight.js'

VMdEditor.use(githubTheme, {
    Hljs: hljs
})
const app = createApp(App)
document.title =
    import.meta.env.VITE_APP_TITLE
app.use(VMdEditor)
app.use(router)
app.use(pinia)
app.use(ArcoVue)
app.mount('#app')
