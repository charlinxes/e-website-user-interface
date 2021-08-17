import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  // { // 登陸後的首頁
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  //   meta: { requiresAuth: true },
  // },
  { // 登陸頁面
    path: '/login',
    name: 'LognIn',
    component: () => import('../views/LogIn.vue'),
  },
  {
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
    ],
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

export default router;
