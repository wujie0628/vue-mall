<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @navBarClick="navBarClick" ref="detailNavBar"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad" ref="goods"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
      <goods-list :goodsList="recommend" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
    
    <back-top @click.native="toTop" v-show="isShowBackTop" />
    
  </div>
</template>

<script>
  import DetailNavBar from "./childComp/DetailNavBar"
  import DetailSwiper from "./childComp/DetailSwiper"
  import DetailBaseInfo from "./childComp/DetailBaseInfo"
  import DetailShopInfo from "./childComp/DetailShopInfo"
  import DetailGoodsInfo from "./childComp/DetailGoodsInfo"
  import DetailParamInfo from "./childComp/DetailParamInfo"
  import DetailBottomBar from "./childComp/DetailBottomBar"
  
  import GoodsList from "components/content/goodsList/GoodsList"
  import Scroll from "components/common/scroll/Scroll"
  import BackTop from "components/content/backTop/BackTop"
  
  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail"
  import {itemListenterMixin} from "common/mixin"
  import { debounce } from "@/common/utils"
  
  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        recommend: [],
        themeTopYs: [],
        getThemeTopY: null,
        datailNavBarCurrentIndex: 0,
        isShowBackTop: false,
      }
    },
     
    mixins: [itemListenterMixin],
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      GoodsList,
      DetailBottomBar,
      BackTop,
      Scroll
    },
    
    created() {
      this.iid = this.$route.params.iid
      getDetail(this.iid).then(res => {
        const data = res.result
        //???????????????????????????
        this.topImages = data.itemInfo.topImages
        // 2.??????????????????
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 3.????????????????????????
        this.shop = new Shop(data.shopInfo)
        // 4.????????????????????????
        this.detailInfo = data.detailInfo
        // 5.??????????????????
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //?????????????????????????????????
        this.getThemeTopY = debounce(() => {
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        }, 100)
      })
      
      getRecommend().then(res => {
        this.recommend = res.data.list
       })
    },
    mounted() {
    //   const refresh = debounce(this.$refs.scroll.refresh, 100)
    
    //   //???????????????????????????
    //   this.itemImgListener =  () => {
    //     refresh()
    //   }
    //   //????????????????????????????????????
    //   this.$bus.$on("goodsItemImgLoad", this.itemImgListener)
    
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh();
        this.getThemeTopY();
      },
      navBarClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300)
      },
      contentScroll(position) {
        
        //????????????????????????????????????????????????
        let index = 0;
        
        let index0 = this.themeTopYs[0];
        let index1 = this.themeTopYs[1];
        let index2 = this.themeTopYs[2];
        let index3 = this.themeTopYs[3];
        let y = -position.y
        
        if(y>=index0 && y<index1) {
          index = 0;
        }else if(y>=index1 && y<index2) {
          index = 1;
        }else if(y>=index2 && y<index2) {
          index = 2;
        }else {
          index = 3;
        }
        
        if(index !== this.datailNavBarCurrentIndex) {
          this.$refs.detailNavBar.setCurrentIndex(index)
          this.datailNavBarCurrentIndex = index
        }
        
        //???????????????????????????
        this.isShowBackTop = (-position.y) > 1000
      },
      toTop() {
        this.$refs.scroll.toTop(300);
      },
      
      addCart() {
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid; 
        product.num = 1;
        this.$store.dispatch("addCart", product).then(res => {
          this.$toast.show(res)
        })
      }
    },
    
    destroyed() {
      //???????????????????????????
      this.$bus.$off('goodsItemImgLoad', this.itemImgListener)
    },
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
    height: calc(100% - 44px - 49px);
  }
  
  .detail-nav-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>