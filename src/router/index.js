import Vue from 'vue'
import Router from 'vue-router'
import SlideContainer from '../container/SlideContainer.vue'
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
      name: 'SlideTop',
      component: SlideContainer,
    },
    {
      path: '/:slug/:page',
      name: 'Slide',
      component: SlideContainer,
    },
  ],
})
