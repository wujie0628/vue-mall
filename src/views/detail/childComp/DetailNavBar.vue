<template>
  <div id="detailNavBar">
    <nav-bar>
      <div class="back" slot="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div class="title"  slot="center">
        <span v-for="(item, index) in titles" 
        :class="{active : index === currentIndex}" 
        class="title-item" @click="titleClick(index)">{{item}}</span>
      </div>
    </nav-bar>
  </div>
</template>


<script>
  import NavBar from "components/common/navbar/NavBar"
  
  export default {
    data() {
      return {
        titles:  ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    components: {
      NavBar
    },
    methods: {
      backClick() {
        this.$router.back();
      },
      titleClick(index) {
        this.currentIndex = index;
      }
    },
  }
</script>

<style>
  .title {
    display: flex;
    font-size: 13px;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text)
  }

  .back img {
    margin-top: 12px;
  }
</style>
