import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'


import plugins from '@/plugins'

import "@/assets/font/text.css";

// import VMdPreview from '@kangc/v-md-editor/lib/preview';
// import '@kangc/v-md-editor/lib/style/preview.css';
// import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
// import '@kangc/v-md-editor/lib/theme/style/github.css';
// import hljs from 'highlight.js';






const app = createApp(App)

Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key as keyof typeof Icons])
  })

  // VMdPreview.use(githubTheme, {
  //   Hljs: hljs,
  // });







app.use(store)
app.use(router)
app.use(plugins) 
app.use(ElementPlus)
// app.use(VMdPreview);

app.mount('#app')

