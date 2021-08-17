// 第三方套件放上方
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
// vue-loading-overlay
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// font-awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// 自己撰寫的放下方
import App from './App.vue';
import router from './router';
import currencyFilter from './filters/currencyFilter';

library.add(faSpinner);

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.component('Loading', Loading);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.filter('currencyFilter', currencyFilter);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

// 有登陸驗證需求的頁面，使用導航守衛阻攔
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/login',
        });
      }
    });
  } else {
    next();
  }
});
