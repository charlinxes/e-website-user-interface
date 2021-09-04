<template>
  <div>
    <Loading :active.sync="isOuterLoading" loader="bars"></Loading>
    <header class="header-bg">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <router-link class="navbar-brand" :to="{name:'CustomerHome'}">
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
            <div class="dropdown-menu dropdown-menu-dark dropdown-menu-end py-3 dropdown-minsize text-nowrap"
              aria-labelledby="navbarDarkDropdownMenuLink">
              <p class="fs-5 mb-2 px-3">已選擇商品</p>
              <div v-for="item in cartArray" :key="item.id" class="d-flex mb-2 align-items-center justify-content-between px-3 py-1 link-hover">
                <a class="d-flex align-items-center justify-content-between text-decoration-none text-light">
                  <div :style="{'background-image': `url(${item.product.imageUrl})`}" style="width:80px;height:80px" class="card-img me-3"></div>
                  <div class="me-2">{{item.product.title}}</div>
                  <div class="me-2">{{item.qty}}{{item.product.unit}}</div>
                  <div class="me-3">{{item.product.price | currencyFilter}}</div>
                </a>
                <button type="button" class="btn btn-outline-danger btn-sm py-1" @click.prevent="delFromCart(item.id)">
                    <font-awesome-icon icon="trash-alt"/>
                </button>
              </div>
              <a class="btn d-block mt-1 fs-5 btn-secondary text-light mx-4" :class="{'disabled':cartArray.length === 0}" href="#" role="button">
                  結帳<font-awesome-icon icon="shopping-cart" class="ms-1"/>
              </a>
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

export default {
  name: 'CustomerHomePage',
  data() {
    return {
      isOuterLoading: false,
      myDropDown: {},
      cartArray: [],
      catgory: 'cloth',
    };
  },
  created() {
    this.getCart();
  },
  mounted() {
    this.myDropDown = new Dropdown(document.getElementById('dropdownMenuButton'));
  },
  methods: {
    delFromCart(id) {
      this.isOuterLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      this.$http.delete(api).then(() => {
        this.getCart();
        this.isOuterLoading = false;
      });
    },
    getCart() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      this.$http.get(api).then((response) => {
        console.log('cart', response.data.data.carts);
        this.cartArray = response.data.data.carts;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
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
    position: absolute;   //
    background-color:rgb(22, 22, 22);
  }

</style>
