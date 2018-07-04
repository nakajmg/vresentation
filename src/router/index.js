import Vue from 'vue'
import Router from 'vue-router'
import Slide from '../components/Slide.vue'
import TalkList from '../components/TalkList'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: TalkList,
      name: 'TalkList',
    },
    {
      path: '/:slug',
      component: Slide,
      name: 'SlideTop',
    },
    {
      path: '/:slug/:page',
      name: 'Slide',
      component: Slide,
    },
  ],
})
