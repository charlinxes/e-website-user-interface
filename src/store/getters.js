const cartTotalPrice = (state) => () => state.cartArray.reduce(
  (accumulator, currentValue) => currentValue.total + accumulator, 0,
);

export default {
  cartTotalPrice,
};
