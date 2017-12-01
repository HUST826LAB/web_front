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
const draw = () =>
  import ('@/components/draw')
const triangle = () =>
  import ('@/components/draw-triangle')
const choose = () =>
  import ('@/pages/choose')
const admin = () =>
  import ('@/pages/admin')
const groupList = () =>
  import ('@/pages/groupList')
const person = () =>
  import ('@/pages/person')

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
      children: [{
        path: '',
        component: draw
      }, {
        path: 'triangle',
        component: triangle
      }]
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
    },
    {
      path: '/choose',
      component: choose
    },
    {
      path: '/admin',
      component: admin,
      // children: [{
      //   path: 'groupList',
      //   component: groupList
      // }]
    }, {
      path: '/admin/groupList',
      component: groupList
    }, {
      path: '/admin/groupList/person',
      component: person
    }
  ]
})