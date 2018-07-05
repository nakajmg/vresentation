import Vue from 'vue'
import Router from 'vue-router'
import SlideContainer from '../container/SlideContainer.vue'
import TalkList from '../components/TalkList'
Vue.use(Router)

const router = new Router({
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

router.beforeEach(({ params, name }, from, next) => {
  if (name === 'Slide' && parseInt(params.page) === 0) {
    return next({
      name: 'SlideTop',
      params,
      replace: true,
    })
  } else {
    return next()
  }
})

export default router
