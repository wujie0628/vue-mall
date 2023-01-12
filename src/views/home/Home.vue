<template>
  <div id="home">

    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :tabs="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl1" class="tab-control"
      v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="scroll" :pullUpLoad="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <popular></popular>
      <tab-control :tabs="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goodsList="goods[currentType].list"></goods-list>
    </scroll>

    <back-top @click.native="toTop" v-show="isShowBackTop" />

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

  import {
    debounce
  } from "common/utils"
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
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
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
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh, 100)

      //监听列表图片加载完成事件
      this.$bus.$on("goodsItemImgLoad", () => {
        refresh()
      })

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
        };
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      toTop() {
        this.$refs.scroll.toTop(300);
      },

      scroll(position) {
        //是否显示向上小箭头
        this.isShowBackTop = (-position.y) > 1000

        //tab是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },

      loadMore() {
        this.getHomeData(this.currentType);
      },
      swiperImgLoad() {
        //获取tab-control的fixed高度
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop

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
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0);
      this.$refs.scroll.refresh();
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY();
      
    },

  }
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;

  }

  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
