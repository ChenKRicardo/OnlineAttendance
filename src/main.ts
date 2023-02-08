import { createApp } from 'vue'
import router from "./router/index";
import App from './App.vue'
import pinia from '@/utils/continueStore';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/theme-chalk/index.css';
import 'normalize.css';
import './assets/tailwind.css'
import './assets/iconfont.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(pinia).use(router).use(ElementPlus, { locale: zhCn, }).mount('#app');