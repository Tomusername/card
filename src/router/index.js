import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import card from '@/components/card.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'card',
      component: card
    },

  ]
})
