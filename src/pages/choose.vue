
<template>
  <div class="choose">
    <h1>难度等级</h1>
    <div class="wrapper">
      <div>
        <span class="circle" @click="circle"></span>
        <span class="trangle" @click="trangle"></span>
      </div>
      <div>
        <span class="mi" @click="mi"></span>
        <span class="yong" @click="yong"></span>
      </div>
      <div>
        <span class="tu" @click="tu"></span>
        <span class="miao" @click="miao"></span>
      </div>
      
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
    circle(){
      this.$router.push({path:'/game?none=1',query:this.$route.query})
    },
    trangle(){
      this.$router.push({path:'/game/triangle?none=1',query:this.$route.query})
    },
    mi(){
      this.$router.push({path:'/game/mi?none=1',query:this.$route.query})
    },
    yong(){
      this.$router.push({path:'/game/yong?none=1',query:this.$route.query})
    },
    tu(){
      this.$router.push({path:'/game/tu?none=1',query:this.$route.query})
    },
    miao(){
      this.$router.push({path:'/game/miao?none=1',query:this.$route.query})
    },
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
    height:75vh;
  }
  .choose .wrapper div{
    display: flex;
    justify-content: space-around;
    width:100%;
  }
  .choose .wrapper span{
    border:1px solid rgba(0,0,0,.3);
    border-radius: 10px;
    display: block;
    width:140px;
    height:140px;
  }
  .choose .wrapper .circle{
    background: url('../assets/icon.png') no-repeat;
    background-position:5px 5px;
  }
  .choose .wrapper .trangle{
    background: url('../assets/icon.png') no-repeat;
    background-position:-152px 2px;
  }
  .choose .wrapper .mi{
    background: url('../assets/icon.png') no-repeat;
    background-position:0px -105px;
  }
  .choose .wrapper .yong{
    background: url('../assets/icon.png') no-repeat;
    background-position:-152px -105px;
  }
  .choose .wrapper .tu{
    background: url('../assets/icon.png') no-repeat;
    background-position:0px -230px;
  }
  .choose .wrapper .miao{
    background: url('../assets/icon.png') no-repeat;
    background-position:-152px -230px;
  }


</style>
