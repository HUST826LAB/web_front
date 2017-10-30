<template>
  <div id="app">
    <transition name="fade">
          <router-view transition="outLeftInRight"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>

*{
  padding:0;
  margin:0;
  list-style:none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  margin:0;
  font-size:.18rem;
}
/* 开始过渡阶段,动画出去阶段 */
.fade-enter-active,.fade-leave-active{
  transition: all 0.5s ease-out;
}
/* 进入开始 */
.fade-enter{
  transform: translateX(-500px);
  opacity: 0;
}
/* 出去终点 */
.fade-leave-active{
  transform: translateX(-500px);
  opacity: 0;
}
</style>
