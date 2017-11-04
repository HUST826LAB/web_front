
<template>
  <div class="score">
    <div class="my-score">
      我的分数为{{score}}
    </div>
    <div class="sum-level">
      我在全体中的排名为{{sumLevel}}/{{sum}}
    </div>
    <div class="button">
      <router-link tag="button" :to="{path:'signUp'}" class="sign-up">注册</router-link>
    </div>
  </div>
  
</template>

<script>
import store from '@/store/vuex'
export default {
  name: 'app',
  data:function () {
    return {
      score:0,
      sumLevel :0,
      sum:0,
    }
  },
  mounted:function (){
     //查找url参数
    function getUrl () {
      var obj = {};
      var arr = window.location.search.substr(1).split('&')
      for(let i =0;i<arr.length;i++){
        arr[i]=arr[i].split('=')
      }
      arr.forEach(function (v) {
        obj[v[0]] = v[1];
      })
      return obj
    } 
    var obj = getUrl();
    this.score = obj.score;
    this.sum = obj.sum;
    this.sumLevel = obj.sumLevel;
  },
  ready:function() {
    
  },
  components:{
    
  },
  
  
  
}
</script>

<style scoped>

  .game{
    padding:0.06666666666666667rem 0 0 0;
  }
  .button .sign-up{
    width: 1.6666666666666667rem;
    height:0.23333333333333334rem;
    border:3px solid #000;
    font-size:0.16666666666666666rem;
    line-height: 0.23333333333333334rem;
    background: #fff;
  }
</style>
