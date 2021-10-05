<template>
  <div>
    <!-- <Loading :active.sync="isLoading" loader="bars"></Loading> -->
    <header class="header--bgcolor">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <router-link class="navbar-brand" :to="{name:'Products'}">
            <h1 class="h3 text-warning">
              <font-awesome-icon icon="american-sign-language-interpreting" class="me-1"/>
              HOLO商城
            </h1>
          </router-link>
          <!-- 購物車 -->
          <div class="dropdown">
            <button class="btn btn-outline-secondary fs-4 border-0 position-relative" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
              <font-awesome-icon icon="shopping-cart" class="text-warning"/>
              <span class="position-absolute translate-middle badge rounded-pill bg-danger" v-if="cartArray.length">
                {{cartArray.length}}
              </span>
            </button>
            <div class="dropdown-menu dropdown-menu-dark dropdown-menu-end py-3 text-nowrap text-center"
              aria-labelledby="navbarDarkDropdownMenuLink" style="max-width:25rem">
              <p class="fs-5 mb-2 px-3 text-start">已選擇商品</p>
              <div v-for="item in cartArray" :key="item.id" class="d-flex mb-2 align-items-center justify-content-between px-3 py-1 link-hover">
                <div class="d-flex align-items-center justify-content-between text-decoration-none text-light w-100" @click="showDetail(item.product.id, item.qty, item.id)">
                  <div :style="{'background-image': `url(${item.product.imageUrl})`}" class="header__cart__bgimg me-3"></div>
                  <div class="me-2 single-ellipsis title-width-limit">{{item.product.title}}</div>
                  <div class="me-2 single-ellipsis qty-width-limit">{{item.qty}}{{item.product.unit}}</div>
                  <div class="me-2 single-ellipsis text-warning price-width-limit">{{item.product.price * item.qty | currencyFilter}}</div>
                </div>
                <button type="button" class="btn btn-outline-danger btn-sm py-1" @click.stop="delFromCart(item.id)">
                    <font-awesome-icon icon="trash-alt"/>
                </button>
              </div>
              <button type="button" class="btn btn-outline-danger mt-2 fs-5 d-block mx-auto w-75"
                @click="$router.push({name:'Checkout'})" :class="{'disabled':cartArray.length === 0}">
                結帳<font-awesome-icon icon="shopping-cart" class="ms-1"/>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
import Dropdown from 'bootstrap/js/dist/dropdown';
import { mapState } from 'vuex';

export default {
  name: 'CustomerHomePage',
  data() {
    return {
      myDropDown: {},
    };
  },
  created() {
    this.$store.dispatch('getCartArray');
  },
  mounted() {
    this.myDropDown = new Dropdown(document.getElementById('dropdownMenuButton'));
    // this.$router.push({ name: 'Products' });
  },
  computed: {
    ...mapState([
      'cartArray',
    ]),
  },
  methods: {
    delFromCart(id) {
      this.$store.commit('openLoading');
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      this.$http.delete(api).then(() => {
        this.$store.dispatch('getCartArray');
      });
    },
    showDetail(productId, productQty, cartId) {
      this.$router.push({ name: 'ProductDetail', query: { id: `${productId}`, qty: productQty, cardId: cartId } });
    },
  },
};
</script>

<style lang="scss" scoped>
  // .cart-img {
  //   width:80px;
  //   height:80px;
  //   background-size: cover;
  //   background-position: center;
  // }
  // .header-bg {
  //   background-color:rgb(22, 22, 22);
  // }
  // .navbar-brand {
  //   box-shadow:none;
  //   background-color: transparent;
  // }
  // .badge {
  //   font-size: 0.5em;
  //   top: 25%;
  // }
  // .dropdown-minsize {
  //   min-width: 18rem;
  // }
  // .link-hover:hover{
  //   background-color: rgb(95, 95, 95);
  // }
  // .single-ellipsis {
  // overflow: hidden;
  // text-overflow: ellipsis;
  // white-space: nowrap;
  // }
  // .title-width-limit {
  //   max-width: 90px;
  // }
  // .qty-width-limit {
  //   max-width: 50px;
  // }
  // .price-width-limit {
  //   max-width: 80px;
  // }

</style>
