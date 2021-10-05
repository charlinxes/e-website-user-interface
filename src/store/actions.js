import Vue from 'vue';

const getCartArray = ({ commit }) => {
  const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
  Vue.axios.get(api).then((response) => {
    commit('updateCartArray', response.data.data.carts);
    commit('updateCartTotalPrice', response.data.data.total);
    commit('closeLoading');
  });
};

export default {
  getCartArray,
};
