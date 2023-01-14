import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartList: [],
  },
  mutations: {
    addProduct(state, payload) {
      state.cartList.push(payload);
    },
    addProductNum(state, payload) {
      payload.num++;
    }
  },
  actions: {
    addCart(context, payload) {
      for (let item of context.state.cartList) {
        if(item.iid === payload.iid) {
          context.commit("addProductNum", item);
          return;
        }
      }
      
      context.commit("addProduct", payload);
    }
  }
})

export default store