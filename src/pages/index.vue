
<template>
  <div class="wrapper">
    <div class="online-num">在线人数{{data.resCount}}</div>
    <my-list :oData="data"></my-list>
    <div class="middle">
      <img src="../assets/index-middle.jpg" alt="">
      <router-link to="game"  class="start" tag="button">play</router-link >
    </div>
  </div>
</template>

<script>
import store from '@/store/vuex'
import myHeader from '@/components/my-header'
import myList from '@/components/my-list'
import getData from '@/server/vue-resource'
export default {
  name: 'app',
  data:function () {
    return {
      data:{},
      giveData:'',
    }
  },
  components:{
        myHeader,
        myList
    },
  created:function () {
   
  },
  mounted:function () {
    console.log('index')
    if(window.location.search) {
      var arr = window.location.search.substr(1).split('&')
      for(let i =0;i<arr.length;i++){
        arr[i]=arr[i].split('=')
      }
      console.log(arr)
      store.commit('setReferee',arr[0][1])
      store.commit('setGroup',arr[1][1])
    }
        getData('/index').then((res)=>{
        this.data = res.body.data
      })
      
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
</style>
