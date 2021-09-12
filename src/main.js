import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入elementui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { ElementTiptapPlugin } from 'element-tiptap'
// 加载全局样式文件
import './styles/index.less'

Vue.use(ElementUI)
Vue.use(ElementTiptapPlugin)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
