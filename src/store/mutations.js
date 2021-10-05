const updateCartArray = (state, newValue) => {
  state.cartArray = newValue;
};
const updateCartTotalPrice = (state, newValue) => {
  state.cartTotalPrice = newValue;
};
const changeCategory = (state, newValue) => {
  state.category = newValue;
};
const openLoading = (state) => {
  state.isLoading = true;
};
const closeLoading = (state) => {
  state.isLoading = false;
};

export default {
  updateCartArray,
  updateCartTotalPrice,
  changeCategory,
  openLoading,
  closeLoading,
};
