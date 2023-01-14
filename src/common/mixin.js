import {debounce} from "common/utils"

export const itemListenterMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 100)
  
    //对监听事件进行保存
    this.itemImgListener = () => {
      refresh()
    }
    //监听列表图片加载完成事件
    this.$bus.$on("goodsItemImgLoad", this.itemImgListener)
  }
}