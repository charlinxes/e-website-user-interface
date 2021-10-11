import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import Products from '@/views/Products.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    redirect: { name: 'Products', query: { category: 'cloth' } },
    children: [
      {
        path: 'products',
        name: 'Products',
        component: Products,
        props: (route) => ({ category: route.query.category }),
      },
    ],
  },
  {
    path: '/product_Detail',
    name: 'ProductDetail',
    component: () => import('@/views/ProductDetail.vue'),
    props: (route) => ({
      id: route.query.id, qty: route.query.qty, cardId: route.query.cardId, index: route.query.index,
    }),
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('@/views/Checkout.vue'),
  },
  {
    path: '*',
    redirect: { name: 'Products', query: { category: 'cloth' } },
  },
];

const router = new VueRouter({
  routes,
});

// 防止導航到同一路由時報錯，因為Vue-router在3.1之後把$router.push()方法改成了Promise，所以錯誤的情況需要回調函式
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export default router;
