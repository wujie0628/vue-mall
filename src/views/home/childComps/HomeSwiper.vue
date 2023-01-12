
<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  
  import {Swiper, SwiperItem} from "components/common/swiper/index"
  
  export default {
    components: {
      Swiper,
      SwiperItem
    },
    data() {
      return {
        isImgLoad: false
      }
    },
    props: {
      banners: {
        type: Array,
        default: []
      },
    },
    methods: {
      imgLoad() {
        if(!this.isImgLoad) {
          this.$emit("swiperImgLoad")
          this.isImgLoad = true;
        }
        
      }
    },
  }
  
</script>

<style>
</style>