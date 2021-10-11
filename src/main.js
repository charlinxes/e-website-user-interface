// 第三方套件放上方
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

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
import categoryTransform from './filters/categoryTransform';
// vee-validation
import './validation';

library.add(faTrashAlt, faAmericanSignLanguageInterpreting, faShoppingCart, faTshirt, faUtensils, faHome);

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.filter('currencyFilter', currencyFilter);
Vue.filter('categoryTransform', categoryTransform);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
