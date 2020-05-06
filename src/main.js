import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Http from './api/http'
import Api from './api/api'

import { Autocomplete, Tree, Pagination, Select, Option, Form, FormItem, Input, Cascader, Upload, Dialog, Message, Checkbox, Button, Breadcrumb, BreadcrumbItem, Radio, Row, Col ,Progress, MessageBox, Tooltip } from 'element-ui';
// import { Tabs } from 'element-ui';
// import { TabPane } from 'element-ui';

import 'video.js/dist/video-js.css'
import hls from 'videojs-contrib-hls'
Vue.use(hls)

import basedata from './common/data.js'
Vue.prototype.basedata = basedata

import 'swiper/css/swiper.min.css';
Vue.config.productionTip = false;
import baseUrl from './api/baseUrl.js'
Vue.prototype.baseUrl = baseUrl
//
// import 'bootstrap3/dist/css/bootstrap.min.css'
import 'webuploader/dist/webuploader.css'

Vue.prototype.$http = Http
Vue.prototype.$api = Api

Vue.use(Autocomplete);
Vue.use(Tree);
Vue.use(Pagination);
Vue.use(Select);
Vue.use(Option);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Cascader);
Vue.use(Input);
Vue.use(Upload);
Vue.use(Dialog);
Vue.use(Checkbox);
Vue.use(Button);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Radio);
Vue.use(Row);
Vue.use(Col);
Vue.use(Progress);
Vue.use(Tooltip);
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
// Vue.use(Tabs)
// Vue.use(TabPane)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
