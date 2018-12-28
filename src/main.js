// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import request from './api/request'
import style from './style'
import Vuex from 'vuex'
import VueTouch from 'vue-touch'
//Vue.use(VueTouch,{name:'v-touch'})
Vue.use(style)
Vue.use(Vuex)

const store=new Vuex.Store({
  state:{
    count:100
  },
  mutations: {
    change(state,num){
      state.count=num
    }
  }
})

Vue.prototype.$http=request
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
