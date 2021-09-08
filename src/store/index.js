import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartArray: [],
    isLoading: false,
    // 新增category的目的是讓頁面刷新時，能正確維持按鈕的active狀態
    category: 'cloth',
    cartTotalPrice: 0,
  },
  mutations: {
    updateCartArray(state, newValue) {
      state.cartArray = newValue;
    },
    updateCartTotalPrice(state, newValue) {
      state.cartTotalPrice = newValue;
    },
    changeCategory(state, newValue) {
      state.category = newValue;
    },
    openLoading(state) {
      state.isLoading = true;
    },
    closeLoading(state) {
      state.isLoading = false;
    },
  },
  actions: {
    getCartArray({ commit }) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      Vue.axios.get(api).then((response) => {
        commit('updateCartArray', response.data.data.carts);
        commit('updateCartTotalPrice', response.data.data.total);
        commit('closeLoading');
      });
    },
  },
  modules: {
  },
});
