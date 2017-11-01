<template>
  <div class="my-list">
      <ul>
        个人排行榜
      <li v-for="(score,index) in score">
        <span>{{index + 1}}.</span>
        <span>{{score.uname ? score.uname:score.username}}</span>
        <span>{{score.score}}</span>
      </li>
    </ul>
      <ul>
        团体排行榜
      <li v-for="(group,index) in group">
        <span>{{index + 1}}.</span>
        <span>{{group.name}}</span>
        <span>{{group.score >= 100000 ? group.score / 10000+'万' : group.score}}</span>
      </li>
    </ul>
    
  </div>
</template>

<script>
import getData from '@/server/vue-resource'
import store from '@/store/vuex'
export default {
  name:'list',
  props:{
    oData:{
      type:Object,
      default:{
        
      }
    }
  },
  data () {
    return {

    }
  },
  mounted:function () {
  
  },
  methods:{
    
  },
  computed:{
    group:function () {
      return this.oData.group ? this.oData.group.splice(0,3) : 0
    },
    score:function () {
      return this.oData.score ? this.oData.score.splice(0,3) : 0
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .my-list{
    display: flex;
    justify-content: space-between;
    width:2.8rem;
  }
  ul{
    width:1rem;
    height:1.6666666666666667rem;
    border:0.006666666666666667rem solid #000;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
    background:#000;
    color:#fff;
    border-radius:0.23333333333333334rem;
    padding:0.04666666666666667rem 0.06666666666666667rem 0 0.06666666666666667rem;
    font-weight: bolder;
  }
  ul:first-child{
    background: #fff;
    color:#000;
  }
  li{
    text-align:left;
    font-size:0.155rem;
    font-weight:bold;
    line-height:.4rem;
  }
  /* li{
    position: relative;
  }
  li>span{
    position: relative;
  }
  li>span:nth-child(1) {
    position: absolute;
    left:0.5rem;
    color:red;
  }
  li>span:nth-child(2){
    display: inline-block;
   
    width:4rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin:0px auto;
  }
  li>span:nth-child(3){
    position: absolute;
    right:0.5rem;
  } */

</style>
