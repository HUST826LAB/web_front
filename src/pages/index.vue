
<template>
  <div class="wrapper">
    <div class="online-num">参与人数{{data.resCount}}</div>
    <my-list :oData="data"></my-list>
    <div class="middle">
      <img src="../assets/index-middle.jpg" alt="">
      <router-link :to="{path:userId?'choose':'game?none=1' , query:{group:group,refree:refree}}"  class="start" tag="button" id="J_weixin">play</router-link >
    </div>
   <!-- <div id="weixin-tip"><p><img src="" alt="微信打开"/><span id="close" title="关闭" class="close">×</span></p></div> -->

  </div>
</template>

<script>
import store from '@/store/vuex'
import myHeader from '@/components/my-header'
import myList from '@/components/my-list'
import getData from '@/server/vue-resource'
import doCookie from '@/server/docookie'
export default {
  name: 'app',
  data:function () {
    return {
      data:{},
      giveData:'',
      url:'?none=1',
      userId:doCookie('get','user_id'),
      group:'',
      refree:''
    }
  },
  components:{
        myHeader,
        myList
    },
  created:function () {
   
  },
  mounted:function () {
    if(window.location.search) {
      this.url = window.location.search;
      var obj = getUrl();
      store.commit('setReferee',obj['referee'])
      store.commit('setGroup',obj['group'])
      this.group = obj.group;
      this.refree = obj.refree;
    }
        getData('/index').then((res)=>{
        this.data = res.body.data
        if(!doCookie('get','cookie_id')){
          doCookie('set','cookie_id',res.body.data.cookie_id)
        }
      })
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
    console.log(doCookie('get', 'd'))
    //微信判断
    // var is_weixin = (function(){return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1})();
    // var winHeight = typeof window.innerHeight != 'undefined' ? window.innerHeight : document.documentElement.clientHeight; //兼容IOS，不需要的可以去掉
    // var btn = document.getElementById('J_weixin');
    // var tip = document.getElementById('weixin-tip');
    // var close = document.getElementById('close');
    // if (is_weixin) {
    //   // btn.onclick = function(e) {
    //     tip.style.height = winHeight + 'px'; //兼容IOS弹窗整屏
    //     tip.style.display = 'block';
    //     // return false;
    //   // }
    //   close.onclick = function() {
    //     tip.style.display = 'none';
    //   }
    // }
  },
  methods:{
   
    
  }
}

</script>

<style scoped>

.wrapper{
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
  align-items: center;
  background:linear-gradient(left,#000 50%,#fff 50%);
  overflow: hidden;
}
.online-num{
  width:1.1rem;
  height:0.5166666666666667rem;
  background:#fff;
  border:2px solid #000;
  margin-top:0.13333333333333333rem;
  border-radius: 50px;
  line-height: 0.5166666666666667rem;
  font-size:0.16666666666666666rem;
}
.my-list{
    width:2.8rem;
    margin-bottom: auto;
    margin-top:0.06666666666666667rem
}
.middle{
  margin-bottom:auto;
  width:1.4333333333333333rem;
}
.middle img{
  width: 1.4333333333333333rem;
}
.start{
  height: 0.5166666666666667rem;
  border:3px solid #000;
  width:1.3333333333333333rem;
  font-size:0.2rem;
  background:#fff;
  color:#000;
  border-radius: 50px;
  margin-top:-0.16666666666666666rem;
}
.start:focus{
  outline: 0;
}
#weixin-tip{display:none;position:fixed;left:0;top:0;background:rgba(0,0,0,0.8);filter:alpha(opacity=80);width:100%;height:100%;z-index:100;}
#weixin-tip p{text-align:center;margin-top:10%;padding:0 5%;position:relative;}
#weixin-tip .close{color:#fff;padding:5px;font:bold 20px/24px simsun;text-shadow:0 1px 0 #ddd;position:absolute;top:0;left:5%;}

</style>
