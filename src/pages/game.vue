
<template>
  <div>
  <div class="game">
    <draw></draw>
    <div class="control">
      
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
  }

  
}
</script>

<style scoped>

  .game{
    padding:20px 0 0 0;
  }
</style>
