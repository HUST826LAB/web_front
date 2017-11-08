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
  import ('@/pages/signUp');
const signIn = () =>
  import ('@/pages/signIn')
const score = () =>
  import ('@/pages/score')
const mine = () =>
  import ('@/pages/mine')

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
    },
    {
      path: '/score',
      component: score
    },
    {
      path: '/signIn',
      component: signIn
    },
    {
      path: '/mine',
      component: mine
    }
  ]
})