import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

// const myHeader = () =>
//   import ('@/components/my-header');
const index = () =>
  import ('@/pages/index');
const game = () =>
  import ('@/pages/game');
const signUp = () =>
  import ('@/pages/signUp')

Vue.use(Router)
export default new Router({
  mode: "history",
  routes: [{
      path: '/',
      component: index,
      children: [],
    },
    {
      path: '/game',
      component: game,
    },
    {
      path: '/signUp',
      component: signUp
    }
  ]
})