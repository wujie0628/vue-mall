import {ADD_PRODUCT, ADD_PRODUCT_NUM} from "./mutations-type"

export default {
  [ADD_PRODUCT](state, payload) {
    payload.isChecked = true;
    state.cartList.push(payload);
  },
  [ADD_PRODUCT_NUM](state, payload) {
    payload.num++;
  }
}
