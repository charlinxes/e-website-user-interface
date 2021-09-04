import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import CustomerHomePage from '../views/CustomerHomePage.vue';

Vue.use(VueRouter);

const routes = [
  { // 登陸頁面
    path: '/login',
    name: 'LognIn',
    component: () => import('../views/LogIn.vue'),
  },
  { // 管理員頁面
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/Products.vue'),
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('../views/Orders.vue'),
      },
      {
        path: 'coupons',
        name: 'Coupons',
        component: () => import('../views/Coupons.vue'),
      },
      {
        path: 'coupons',
        name: 'Coupons',
        component: () => import('../views/Coupons.vue'),
      },
      {
        path: 'customer_orders',
        name: 'CustomerOrders',
        component: () => import('../views/CustomerOrders.vue'),
      },
      {
        path: 'customer_checkout/:orderId',
        name: 'CustomerCheckout',
        component: () => import('../views/CustomerCheckout.vue'),
        props: true,
      },
    ],
  },
  { // 客戶端頁面
    path: '/',
    name: 'CustomerHome',
    component: CustomerHomePage,
    children: [
      {
        path: 'product_list',
        name: 'ProductList',
        component: () => import('../views/CustomerProductList.vue'),
      },
    //   { // 客戶端結帳頁面
    //     path: 'customer_checkout/:orderId',
    //     name: 'CustomerCheckout',
    //     component: () => import('../views/CustomerCheckout.vue'),
    //     props: true,
    //   },
    ],
  },
  {
    path: '/product',
    name: 'CustomerProductDetail',
    component: () => import('../views/CustomerProductDetail.vue'),
  },
  {
    path: '*',
    // 若已登陸，會直接轉到首頁；若未登錄，會被導航守衛轉到/login
    redirect: '/admin/products',
  },
];

const router = new VueRouter({
  routes,
});

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

export default router;
