<template>
  <div>
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
              <p class="fs-5 mb-2 px-3 text-start">
                已選擇商品
                <span class="spinner-border spinner-border-sm" v-if="showSpinner" role="status" aria-hidden="true"/>
              </p>
              <div v-for="(item,index) in cartArray" :key="item.id" class="d-flex mb-2 align-items-center justify-content-between px-3 py-1 link-hover">
                <div class="d-flex align-items-center justify-content-between text-decoration-none text-light w-100" @click="showDetail(item.product.id, item.qty, item.id, index)">
                  <div :style="{'background-image': `url(${item.product.imageUrl})`}" class="header__cart__bgimg me-3"></div>
                  <div class="me-2 single-ellipsis title-width-limit">{{item.product.title}}</div>
                  <div class="me-2 single-ellipsis qty-width-limit">{{item.qty}}{{item.product.unit}}</div>
                  <div class="me-2 single-ellipsis text-warning price-width-limit">{{item.product.price * item.qty | currencyFilter}}</div>
                </div>
                <button type="button" class="btn btn-outline-danger btn-sm py-1" @click.stop="delFromCart(item.id,index)">
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
import cartAPI from '../apis/cart_api';

export default {
  name: 'CustomerHomePage',
  data() {
    return {
      myDropDown: {},
      showSpinner: false,
    };
  },
  created() {
    cartAPI.get().then((response) => {
      this.$store.commit('updateCartArray', response.data.data.carts);
    });
  },
  mounted() {
    this.myDropDown = new Dropdown(document.getElementById('dropdownMenuButton'));
  },
  computed: {
    ...mapState([
      'cartArray',
    ]),
  },
  methods: {
    delFromCart(id, index) {
      this.showSpinner = true;
      cartAPI.delete(id).then(() => {
        this.$store.commit('delFromCart', index);
        this.showSpinner = false;
      });
    },
    showDetail(productId, productQty, cartId, index) {
      this.$router.push({
        name: 'ProductDetail',
        query: {
          id: `${productId}`, qty: productQty, cardId: cartId, index,
        },
      });
    },
  },
};
</script>
