<template>
  <div>
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
  import DetailNavBar from "./childComp/DetailNavBar"
  
  export default {
    data() {
      return {
        iid: null
      }
    },
    components: {
      DetailNavBar
    },
    
    created() {
      this.iid = this.$route.params.iid
    }
  }
</script> 

<style>
</style>