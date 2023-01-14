
import {ADD_PRODUCT, ADD_PRODUCT_NUM} from "./mutations-type"


export default {
  addCart(context, payload) {
    for (let item of context.state.cartList) {
      if (item.iid === payload.iid) {
        context.commit(ADD_PRODUCT_NUM, item);
        return;
      }
    }

    context.commit(ADD_PRODUCT, payload);
  }
}
