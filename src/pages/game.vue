
<template>
  <div>
  <div class="game">
    <router-view></router-view>
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
   
  }
  
  
}
</script>

<style scoped>
  .game{
    padding:20px 0 0 0;
  }
</style>
