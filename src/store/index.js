import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartArray: [],
    // 新增category的目的是讓頁面刷新時，能正確維持按鈕的active狀態
    category: 'cloth',
    cartTotalPrice: 0,
    isLoading: false,
  },
  mutations,
  actions,
  modules: {
  },
});
