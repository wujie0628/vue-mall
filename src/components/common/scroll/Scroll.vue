<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll"
  
  export default {
    
    data() {
      return {
        scroll: Object
      }
    },
    
    mounted() {
      
      this.scroll = new BScroll(this.$refs.wrapper, {
        
      })
    }
  }
</script>

<style scoped>
</style>