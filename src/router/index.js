import Vue from 'vue'
import Router from 'vue-router'
import Slide from '../components/Slide.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
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
