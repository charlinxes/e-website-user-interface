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
  faTrashAlt, faAmericanSignLanguageInterpreting, faShoppingCart, faTshirt, faUtensils, faHome,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// 自己撰寫的放下方
import App from './App.vue';
import router from './router';
import store from './store';
import currencyFilter from './filters/currencyFilter';
// vee-validation
import './validation';

library.add(faTrashAlt, faAmericanSignLanguageInterpreting, faShoppingCart, faTshirt, faUtensils, faHome);

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.component('Loading', Loading);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.filter('currencyFilter', currencyFilter);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
