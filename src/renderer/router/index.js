import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'startpage',
      component: require('@/components/StartPage').default
    },
    {
      path: '/corkboard',
      name: 'Corkboard',
      component: require('@/components/Corkboard').default
    },
    {
      path: '/commitlog',
      name: 'CommitLog',
      component: require('@/components/CommitLog').default
    },
    {
      path: '/compile',
      name: 'Compile',
      component: require('@/components/Compile').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
