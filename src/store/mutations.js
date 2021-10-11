// 購物車
const updateCartArray = (state, newValue) => {
  state.cartArray = newValue;
};
const delFromCart = (state, index) => {
  state.cartArray.splice(index, 1);
};
const addToCart = (state, newItem) => {
  state.cartArray.push(newItem);
};

// 商品類別
const changeCategory = (state, newValue) => {
  state.category = newValue;
};

export default {
  updateCartArray,
  delFromCart,
  addToCart,
  changeCategory,
};
