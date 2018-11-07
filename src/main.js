// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iView'
import 'iView/dist/styles/iview.css'
import axios from './http'
import global_ from './globalVariable'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'mavon-editor/dist/css/index.css'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import store from './store'
import highlightJs from 'highlight.js';

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.GlobalVar = global_
Vue.use(MuseUI)
Vue.use(iView)
Vue.use(mavonEditor)

Vue.prototype.successModal = function(message){
  this.$Notice.success({
    title: '提示',
    desc: message,
    duration: 2
  });
}

Vue.prototype.errorModal = function (message) {
    this.$Notice.error({
      title: '提示',
      desc: message,
      duration: 2
    });
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
