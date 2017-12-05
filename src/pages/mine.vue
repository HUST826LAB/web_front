
<template>
  <div class="mine">
    <h1>{{username ? username :''}}</h1>
      <div class="mine-wrapper">
        <div class="gold">
          <span>我的金币:</span><span>{{gold}}</span>
        </div>
        <div class="score">
          <span>最高分数:</span><span>{{score}}</span>
        </div>
        <div class="group">
          <span>所属小组:</span><span>{{groupName}}</span>
        </div>
        <div class="group-level" v-show="!groupName == '暂无分组'">
          <span>组内排名:</span><span>{{groupLevel}}/{{group}}</span>
        </div>
        <div class="sum">
          <span>全体排名:</span><span>{{sumLevel}}/{{sum}}</span>
        </div>
      </div>
      <div class="footer">
        <router-link tag="button" :to="{path:'/choose',query:{group:groupID}}">游戏</router-link>
        <button @click="signOut">退出登录</button>
      </div>
      
  </div>
  
</template>

<script>
import store from '@/store/vuex'
import doCookie from '@/server/docookie'
import getData from '@/server/vue-resource'
export default {
  name: 'app',
  data:function () {
    return {
      username :'llalllalallalala',
      score:1000,
      sumLevel :90,
      sum:100,
      gold:149,
      group:30,
      groupLevel:10,
      groupName:'土豆',
      groupID:''
    }
  },
  mounted:function (){
    var userId = doCookie('get','user_id')
    var postData = JSON.stringify({user_id:userId})
    console.log(postData)
    var $self = this;
    getData('/zone','post',postData).then((res)=>{
      if(res.body.code == 0){
        var data = res.body.data;
        $self.gold = data.gold;
        $self.score = data.score;
        $self.sumLevel = data.sum_level;
        $self.sum = data.sum;
        $self.group = data.sumGroup;
        $self.groupLevel = data.group_level;
        $self.groupLevel = data.group_level;
        $self.groupName = data.group_name ? data.group_name : '暂无分组'
        $self.username = data.username;
        if(data.group_name) {
          getData('/selectGroup','post',{"user_id": "1","name": data.group_name,}).then((res)=>{
            $self.gruopID = res.data.body
          })
        }
      }
    })
  },
  ready:function() {
    
  },
  components:{
    
  },
  methods:{
    signOut(){
      doCookie('set','username','')
      doCookie('set','user_id', '')
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
  .mine{
    font-family: 'huakang';
    display: flex;
    flex-direction: column;
    align-items:center;
    height:100vh;
    overflow: hidden;
    justify-content: space-around;
  }
  .mine-wrapper{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size:0.3125rem;
    width:70%;
    height: 50%;
  }
  .mine-wrapper div{
    display: flex;
    justify-content: space-between;
  }
  .mine-wrapper .gold{
    color:goldenrod;
  }
  .mine-wrapper .score{
    color:green;
  }
  .mine-wrapper .group{
    color:skyblue;
  }
  .mine-wrapper .group-level{
    color:deepskyblue;
  }
  .mine-wrapper .sum{
    color:red;
  }
  .footer {
    width:100%;
    display: flex;
    justify-content: space-around;
  }
  .footer button {
    font-family: 'huakang';
    border:3px solid #000;
    background: #fff;
    font-size:0.3125rem;
    padding:0.0375rem 0.1rem;
    border-radius:15px;
  }
</style>
