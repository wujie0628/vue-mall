<template>
  <div class="goods">
    <GoodsListItem v-for="item in goodsList" :good="item"/>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem"
  
  export default {
    components: {
      GoodsListItem
    },
    props: {
      goodsList: {
        type: Array,
        default: [] 
      },
    },
  }
</script>

<style>
    .goods {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
  
      padding: 2px;
    }

</style>