import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import 'normalize.css'//让不同浏览器对 HTML 元素的默认样式表现更一致，避免样式混乱的问题
import './assets/common.css'
createApp(App).use(createPinia()).mount('#app')
