<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    
    <cart-list></cart-list>
    
    <cart-bottom-bar></cart-bottom-bar>
  </div>
  
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import CartList from "./childComp/CartList"
  import CartBottomBar from "./childComp/CartBottomBar"
  
  import {mapGetters} from "vuex"
  
  export default {  
    name: "Shopcart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters(['cartLength'])
    },
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>