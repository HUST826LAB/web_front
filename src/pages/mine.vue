
<template>
  <div class="score">
   正在建设中
    <div class="footer">
      <router-link tag="button" :to="{path:'/game?none=1',query:{resId:this.$route.query.resId}}">游戏</router-link>
      <button @click="signOut">退出登录</button>
    </div>
  </div>
  
</template>

<script>
import store from '@/store/vuex'
import doCookie from '@/server/docookie'
export default {
  name: 'app',
  data:function () {
    return {
      score:0,
      sumLevel :0,
      sum:0,
      gold:0,
      group:0,
      groupLevel:0,
    }
  },
  mounted:function (){
    this.score = this.$route.query.score;
    this.sum = this.$route.query.sum;
    this.sumLevel = this.$route.query.sumLevel;
    this.gold = this.$route.query.gold;
    this.group = this.$route.query.group;
    this.groupLevel = this.$route.query.groupLevel;
  },
  ready:function() {
    
  },
  components:{
    
  },
  methods:{
    signOut(){
      doCookie('set','username','')
      this.$router.push({path:'/'})
    }
  }
  
  
  
}
</script>

<style scoped>
  @font-face {
    font-family: 'huakang';
    src: url('../assets/华康娃娃体简W5.ttf');
  }
  .score{
  
    font-family: 'huakang';
    display: flex;
    flex-direction: column;
    align-items:center;
    height:100vh;
    overflow: hidden;
  }
  .header{
    width:90vw;
    display: flex;
    justify-content: space-between;
  }
  .header button{
    font-family: 'huakang';
    height:0.3333333333333333rem;
    width:0.6666666666666666rem;
    font-size:0.26666666666666666rem;
    line-height:0.2333333333333333rem;
    border:3px solid #000;
    background: #fff;
    border-radius: 20px;
    text-align:center;
  }
  .score-wrapper{
    display: flex;
    width:80vw;
    flex-direction: column;
    align-items: center;
    font-size:0.26666666666666666rem;
    margin-top:0.6666666666666666rem;
  }
  .score-wrapper div{
    width:2.3333333333333335rem;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin-bottom:0.06666666666666666rem;
  }
  .score-wrapper span:first-child{
    width:1.4333333333333333rem;
    text-align:right;
  }
  .score-wrapper .gold{
    color:goldenrod;
  }
  .score-wrapper .score1{
    color:green;
  }
  .score-wrapper .group{
    color:skyblue;
  }
  .score-wrapper .sum{
    color:red;
  }
  .res{
    width:2.3333333333333335rem;
  }
  .footer{
    width:3rem;
    display: flex;
    justify-content: space-around;
  }
  .footer button{
    font-family: 'huakang';
    border:3px solid #000;
    background: #fff;
    border-radius: 20px;
    /* width:1.333333333333334rem; */
    padding:0 .1rem;
    height:0.3333333333333333rem;
    font-size:0.23333333333333334rem;
  }
  .footer button:first-child{
    /* width:1.3333333333333333rem; */
    height: 0.6666666666666666rem;
    font-size:0.6rem;
    color:red;
    font-weight: bolder;
    line-height:0.66666rem;
  }
</style>
