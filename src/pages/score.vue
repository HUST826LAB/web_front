
<template>
  <div class="score">
    <div class="header">
      <router-link tag="button" :to="{path:username ? '/' : '/signIn'}" class="sign-in">{{username?'主页':'登录'}}</router-link>
      <button id="shareBtn" @click="share">分享</button>
    </div>
    <div class="score-wrapper">
      <h1>{{username ? username :''}}</h1>
      <div class="gold">
        <span>金币:</span><span>{{gold}}</span>
      </div>
      <div class="score1">
        <span>分数:</span><span>{{score}}</span>
      </div>
      <div class="group" v-show="groupLevel">
        <span>组内排名:</span><span>{{groupLevel}}/{{group}}</span>
      </div>
      <div class="sum">
        <span>全体排名:</span><span>{{sumLevel}}/{{sum}}</span>
      </div>
    </div>
    <div>
       <img class="res" src="../assets/res.jpg" alt="">
      <div class="footer">
        <router-link tag="button" :to="{path:username ? '/mine':'/signUp',query:{resId:this.$route.query.resId}}">{{username ? '空间' : '注册'}}</router-link>
        <router-link tag="button" :to="userId ? 'choose' :'game?none=1'">{{username ? '再来一局' : '再看看'}}</router-link>
        
      </div>
    </div>
   <transition name="fade">
        <div class="drump" v-show="loading">
                <input id="share" type="text" :value="shareText">
                <span>复制上面的连接，粘贴分享给好友吧</span>
                <button @click="ok">好的</button>
        </div>
    </transition>
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
      username:doCookie('get', 'username'),
      userId:doCookie('get','user_id'),
      link : '',
      shareText:'zhchy.info/?referee=0' +'&group=' + this.$route.query.group,
      loading:false,
      count:0
    }
  },
  mounted:function (){
    var $self = this;
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
    share(){
      // window.location = this.link
      this.loading=true
      
       
    },
    ok(){
      var $self = this;   
      // var input = document.querySelectorAll('#share')[0];
      // input.focus();
      // input.select();
      // if(document.execCommand("copy",false))
      $self.loading=false
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
    overflow: hidden;
    justify-content: space-around;
    height: 100vh;
  }
  .header{
    width:90vw;
    display: flex;
    justify-content: space-between;
  }
  .header button{
    font-family: 'huakang';
    height:0.3333333333333333rem;
    width:0.8666666666666666rem;
    font-size:0.26666666666666666rem;
    line-height:0.2333333333333333rem;
    border:3px solid #000;
    background: #fff;
    border-radius: 20px;
    text-align:center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .score-wrapper{
    display: flex;
    width:80vw;
    flex-direction: column;
    align-items: center;
    font-size:0.26666666666666666rem;
    /* margin-top:0.3666666666666666rem; */
  }
  .score-wrapper div{
    width:2.6333333333333335rem;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
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
  .drump{
      position :absolute;
      width: 2.6666666666666665rem;
      height:1.6666666666666667rem;
      border:3px solid #000;
      background: #fff;
      top:0;
      left:0;
      bottom:0;
      right:0;
      margin:auto;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      border-radius: 40px;
  }
  .drump span{
    width:1.875rem;
  }
  .drump button{
      width:1.3333333333333333rem;
      height:0.3333333333333333rem;
      border:3px solid #000;
      background:#fff;
      font-size:0.16666666666666666rem;
      line-height: 0.3333333333333333rem;

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
  }
    /* 开始过渡阶段,动画出去阶段 */
.fade-enter-active,.fade-leave-active{
  transition: all 0.5s ease-out;
}
/* 进入开始 */
.fade-enter{
  transform: translatey(-0.6666666666666666rem);
  opacity: 0;
}
/* 出去终点 */
.fade-leave-active{
  transform: translateY(0.6666666666666666rem);
  opacity: 0;
}
.go-score{
    width: 2.6666666666666665rem;
    height:0.56666666666666666rem;
    border:3px solid #000;
    background:#fff;
    font-size:0.2rem;
    line-height:0.26666666666666666rem;
    border-radius: 30px;
}
</style>
