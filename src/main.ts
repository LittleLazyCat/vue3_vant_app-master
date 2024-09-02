import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
// 1. 引入你需要的组件
import Vant from 'vant';
import { Lazyload, Toast, Dialog, ActionSheet, SwipeCell, SubmitBar, ImagePreview,Picker  } from 'vant';
import { Col, Row } from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';
import 'bootstrap/dist/css/bootstrap.css' 

// 全局配置
import { ConfigProvider } from 'vant';
// 瀑布流布局vue-masonry
import { VueMasonryPlugin } from "vue-masonry";

 

import App from './App.vue'
import router from './router'

import './assets/main.css' 

const pinia = createPinia()
pinia.use(piniaPersist)


const app = createApp(App)
app.use(pinia)
app.use(router)  
//app.use(numberKeyboard)
app.use(Vant).use(Lazyload).use(Toast).use(Dialog).use(ActionSheet).use(SwipeCell).use(SubmitBar).use(ImagePreview).use(Picker)
app.use(Vant).use(Col).use(Row)
app.use(ConfigProvider)
app.use(VueMasonryPlugin)   
app.mount('#app')
