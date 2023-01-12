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
    
    props: {
      probeType: {
        type: Number,
        default: 0 
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    
    mounted() {
      
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      }),
      
      this.scroll.on("scroll", positon => {
        this.$emit("scroll", positon);
      }),
      
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp")
      })
    },
    methods: {
      scrollTo(x, y, time) {
        this.scroll && this.scroll.scrollTo(x, y, time);
      },
      toTop(time) {
        // this.scroll && this.scroll.scrollTo(0, 0, time);
        this.scrollTo(0, 0, time)
      },
      
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp();
      },
      
      refresh() {
        this.scroll && this.scroll.refresh();
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    },
  }
</script>

<style scoped>
</style>