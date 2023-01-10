<template>
  <div id="home">

    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content" 
            ref="scroll" 
            :probeType="3" 
            @scroll="scroll" 
            :pullUpLoad="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <popular></popular>
      <tab-control :tabs="['流行', '新款', '精选']" @tabClick="tabClick"></tab-control class="tab-control">
      <goods-list :goodsList="goods[currentType].list"></goods-list>
    </scroll>
    
    <back-top @click.native="toTop" v-show="isShowBackTop"/>
    
  </div>

</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import HomeSwiper from "./childComps/HomeSwiper"
  import HomeRecommend from "./childComps/HomeRecommend"
  import Popular from "./childComps/Popular"
  import TabControl from "components/content/tabControl/TabControl"
  import GoodsList from "components/content/goodsList/GoodsList"
  import Scroll from "components/common/scroll/Scroll"
  import BackTop from "components/content/backTop/BackTop"

  import {
    getHomeMultidata,
    getHomeData
  } from "network/home"

  export default {
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommend,
      Popular,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          pop: {
            page: 0,
            list: []
          },
          new: {
            page: 0,
            list: []
          },
          sell: {
            page: 0,
            list: []
          },
        },
        currentType: "pop",
        isShowBackTop: false
      }
    },
    created() {
      //获取banner图以及推荐列表
      this.getHomeMultidata()

      //获取流行、新款、精选数据
      this.getHomeData('pop')
      this.getHomeData('new')
      this.getHomeData('sell')
    },
    methods: {
      /**
       * 事件点击相关
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = "pop";
            break;
          case 1:
            this.currentType = "new";
            break;
          case 2:
            this.currentType = "sell";
            break;
        }
      },
      toTop() {
        this.$refs.scroll.toTop(300);
      },
      
      scroll(position) {
        this.isShowBackTop = (-position.y) > 1000
      },
      
      loadMore() {
        this.getHomeData(this.currentType);
      },
      /**
       * 网络相关
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeData(type) {
        const reqPage = this.goods[type].page + 1
        getHomeData(type, reqPage).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          
          this.$refs.scroll.finishPullUp()
        })
      }
    },
  }
</script>

<style scoped>
  #home {
    padding-top: 44px; 
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;   
    right: 0;

  }
</style>  
 