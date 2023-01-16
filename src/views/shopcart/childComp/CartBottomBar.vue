<template>
  <div class="bottom-bar">
    <div class="check-content" @click="selectAllClick">
      <check-button class="check-button" :isChecked="isSelectAll"></check-button>
      <span>全选</span>
    </div>
    
    <div class="price">
      合计：{{totalPrice}}
    </div>
    
    <div class="calculate">
      去计算({{checkedLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton"
  import {mapGetters} from "vuex"
  
  export default {
    components: {
      CheckButton
    },
    
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return this.cartList.filter(product => product.isChecked)
        .reduce((preValue, item) => {
          return preValue + item.price * item.num
        }, 0).toFixed(2)
      },
      
      checkedLength() {
        return this.cartList.filter(product => product.isChecked).length
      },
      
      isSelectAll() {
        return this.cartList.length !==0 && this.checkedLength === this.cartList.length;
      }
    },
    
    methods: {
      selectAllClick() {
        if(this.isSelectAll) {
          this.cartList.forEach(item => item.isChecked = false)
        }else {
          this.cartList.forEach(item => item.isChecked = true)
        }
      }
    },
  }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #eee;
    font-size: 14px;
  }
  
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  
  .price {
    margin-left: 20px;
    flex: 1;
  }
  
  .calculate {
    text-align: right;
    width: 90px;
    background: red;
    color: #fff;
    text-align: center;
  }
</style>