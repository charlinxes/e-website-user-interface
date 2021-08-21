// 第三方套件放上方
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
// vue-loading-overlay
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// font-awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSpinner, faBoxOpen, faTrashAlt, faReceipt, faListAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// 自己撰寫的放下方
import App from './App.vue';
import router from './router';
import currencyFilter from './filters/currencyFilter';
import dateFilter from './filters/dateFilter';

library.add(faSpinner, faBoxOpen, faTrashAlt, faReceipt, faListAlt);

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.component('Loading', Loading);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.filter('currencyFilter', currencyFilter);
Vue.filter('dateFilter', dateFilter);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
