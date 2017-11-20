
<template>
  <div class="choose">
    <h1>难度等级</h1>
    <div class="wrapper">
      <div class="easy" @click="easy">简单难度<span class="circle"></span></div>
      <div class="middle" @click="middle">中等难度<span class="triangle"></span></div>
      <!-- <div class="difficulty">困难难度<span class="square"></span></div> -->
    </div>
  </div>
</template>

<script>
import draw from '@/components/draw'
import myList from '@/components/my-list'
import myHeader from '@/components/my-header'
export default {
  name: 'app',
  components:{
        draw,
  },
  methods:{
    easy(){
      this.$router.push({path:'/game?none=1'})
    },
    middle(){
      this.$router.push({path:'/game/triangle?none=1'})
    }
  }
  
  
}
</script>

<style scoped>
  .choose{
    padding:0.25rem;
  }
  .choose .wrapper{
    padding:0.25rem 0 0 0;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
  }
  .easy,.middle,.difficulty{
    width:3.5rem;
    height:1.25rem;
    border:2px solid #000;
    border-radius: 30px;
    font-size:0.375rem;
    margin-bottom:0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    /* line-height:1.625rem; */
  }
  .easy{
    color:deepskyblue;
  }
  .middle{
    color:green
  }
  .circle{
    display: inline-block;
    width:0.625rem;
    height: 0.625rem;
    background-repeat: no-repeat;
    background-size: 100%;
    margin-left:0.125rem;
    background-image: url('../assets/circle.png');
  }
  .triangle{
    display: inline-block;
    width:0.625rem;
    height: 0.625rem;
    background-repeat: no-repeat;
    background-size: 100%;
    margin-left:0.125rem;
    background-image: url('../assets/trangle.png');
  }
  .square{
    display: inline-block;
    width:0.625rem;
    height: 0.625rem;
    background-repeat: no-repeat;
    background-size: 100%;
    margin-left:0.125rem;
    background-image: url('../assets/正方形.png');
  }
</style>
