
<template>
  <div class="game" transition="fadeOutLeft">
    <draw></draw>
    <div class="control">
      
    </div>
  </div>
</template>

<script>
import draw from '@/components/draw'
import myList from '@/components/my-list'
export default {
  name: 'app',
  components:{
        draw
    },
}
</script>

<style scoped>

  .game{
    padding:20px 0;
  }
</style>
