<template>
  <header :style="{height: height + 'px',background:color,color:fontColor,fontSize:fontSize+'px'}" >
    <button @click="goBack">返回</button>
    <slot class="logo" name="logo"></slot>
    <h1 class="title" :style="{lineHeight:height+'px'}">{{title}}</h1>
  </header>  
</template>

<script scoped>
export default {
  name: 'myHeader',
  props:{
    height:{
      type:String,
      default:'40'
    },
    color:{
      type:String,
      default:'#000'
    },
    fontColor:{
      type:String,
      default:'#fff'
    },
    title:{
      type:String,
      default:'demo'
    }, 
    fontSize:{
      type:String,
      default:'20'
    }
  },
  data () {
    return {
    }
  },
  methods:{
    goBack:function (){
        history.go(-2)
        
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  *{
    padding:0;
    margin:0;
  }
  header{
    height: 2rem;
    width:100vw;

  }
  .title{
    height: 100%;
  }
  button{
    color:#fff;
  }
</style>
