<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar"></detail-nav-bar>
    <scroll class="content">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from "./childComp/DetailNavBar"
  import DetailSwiper from "./childComp/DetailSwiper"
  import DetailBaseInfo from "./childComp/DetailBaseInfo"
  import DetailShopInfo from "./childComp/DetailShopInfo"
  import Scroll from "components/common/scroll/Scroll"
  import {getDetail, Goods, Shop} from "network/detail"
  
  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {}
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll
    },
    
    created() {
      this.iid = this.$route.params.iid
      getDetail(this.iid).then(res => {
        const data = res.result
        //获取顶部轮播图数据
        this.topImages = data.itemInfo.topImages
        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 3.获取商店信息数据
        this.shop = new Shop(data.shopInfo)
      })
      
      
    }
  }
</script> 

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  
  .content {
    height: calc(100% - 44px);
  }
  
  .detail-nav-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>