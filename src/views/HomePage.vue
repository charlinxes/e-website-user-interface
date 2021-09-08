<template>
  <div>
    <Loading :active.sync="isLoading" loader="bars"></Loading>
    <header class="header-bg">
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
              <span class="position-absolute start-75 translate-middle badge rounded-pill bg-danger" v-if="cartArray.length">
                {{cartArray.length}}
              </span>
            </button>
            <div class="dropdown-menu dropdown-menu-dark dropdown-menu-end py-3 dropdown-minsize text-nowrap text-center"
              aria-labelledby="navbarDarkDropdownMenuLink" style="max-width:25rem">
              <p class="fs-5 mb-2 px-3 text-start">已選擇商品</p>
              <div v-for="item in cartArray" :key="item.id" class="d-flex mb-2 align-items-center justify-content-between px-3 py-1 link-hover">
                <div class="d-flex align-items-center justify-content-between text-decoration-none text-light w-100" @click="showDetail(item.product.id)">
                  <div :style="{'background-image': `url(${item.product.imageUrl})`}" class="cart-img me-3"></div>
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

    <!-- 主要內容 -->
    <router-view></router-view>

    <footer>
      <div class="footer position-absolute end-0 bottom-0 start-0 p-3 text-center fs-4 text-warning">
        <p>@copyright</p>
      </div>
    </footer>

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
      catgory: 'cloth',
      currentId: '',
    };
  },
  created() {
    this.$store.dispatch('getCartArray');
  },
  mounted() {
    this.myDropDown = new Dropdown(document.getElementById('dropdownMenuButton'));
  },
  computed: {
    ...mapState([
      'cartArray',
      'isLoading',
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
    showDetail(productId) {
      this.$router.push({ name: 'ProductDetail', params: { id: `${productId}` } });
    },
  },
};
</script>

<style lang="scss" scoped>
  .cart-img {
    width:80px;
    height:80px;
    background-size: cover;
    background-position: center;
  }
  .header-bg {
    background-color:rgb(22, 22, 22);
  }
  .navbar-brand {
    box-shadow:none;
    background-color: transparent;
  }
  .badge {
    font-size: 0.5em;
    top: 25%;
  }
  .dropdown-minsize {
    min-width: 18rem;
  }
  .link-hover:hover{
    background-color: rgb(95, 95, 95);
  }
  .footer {
    height: 10rem;
    position: absolute;
    background-color:rgb(22, 22, 22);
  }
  .single-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  }
  .title-width-limit {
    max-width: 90px;
  }
  .qty-width-limit {
    max-width: 50px;
  }
  .price-width-limit {
    max-width: 80px;
  }

</style>
