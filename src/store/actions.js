
import {ADD_PRODUCT, ADD_PRODUCT_NUM} from "./mutations-type"


export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      for (let item of context.state.cartList) {
        if (item.iid === payload.iid) {
          context.commit(ADD_PRODUCT_NUM, item);
          resolve("商品数量添加成功")
          return;
        }
      }
      
      context.commit(ADD_PRODUCT, payload);
      resolve("新商品添加成功")
    })
  }
}
