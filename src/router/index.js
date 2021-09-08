import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import ProductList from '@/views/ProductList.vue';
import Products from '@/views/Products.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    children: [
      {
        path: 'product_list',
        name: 'ProductList',
        component: ProductList,
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
        path: 'product_Detail/:id',
        name: 'ProductDetail',
        component: () => import('@/views/ProductDetail.vue'),
        props: true,
      },
      {
        path: 'checkout',
        name: 'Checkout',
        component: () => import('@/views/Checkout.vue'),
      },
    ],
  },
  {
    path: '*',
    redirect: '/product_list/products',
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
