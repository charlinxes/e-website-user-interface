<template>
 <div>
    <Loading :active.sync="isLoading" loader="bars"></Loading>
    <main class="container mt-3">
      <!-- 麵包屑-->
      <nav aria-label="breadcrum">
        <ol class="breadcrumb mb-5">
          <li class="breadcrumb-item fs-5">
            <router-link :to="{name: 'Products', query: { category: `${product.category}` } }"
              class="text-decoration-none">{{category}}</router-link>
          </li>
          <li class="breadcrumb-item active fs-5" aria-current="page">{{ product.title }}</li>
        </ol>
      </nav>

      <section class="row gx-5">
        <div class="col-lg-6 col-md-7">
          <div :style="{'background-image': `url(${product.imageUrl})`}" class="card-img"></div>
        </div>
        <div class="col-lg-6 col-md-5">
          <div class="text-light">
            <h1 class="mt-3">{{ product.title }}</h1>
            <div class="h4 text-end text-danger p-3" v-if="product.price == product.origin_price">售價 {{ product.origin_price | currencyFilter }} 元</div>
            <div class="d-flex align-items-baseline" v-else>
              <div><del class="h6 text-secondary">售價 {{ product.origin_price | currencyFilter }} 元</del></div>
              <div class="h4 text-danger ms-5">特價 {{ product.price | currencyFilter }} 元</div>
            </div>

            <div class="d-flex mb-4 mt-3">
              <button class="btn btn-outline-warning rounded-0" type="button" id="reductBtn"
                @click="product.num > 1 && product.num--">-</button>
              <input type="text" class="form-control bg-transparent rounded-0 border-warning border-start-0 border-end-0
                text-warning text-center input-width" v-model="product.num">
              <button class="btn btn-outline-warning rounded-0" type="button" id="addBtn" @click="product.num++">+</button>
            </div>
            <button type="button" class="btn btn-outline-warning" @click="addToCart(id,product.num)">加入購物車</button>
            <div class="mt-4">
              <p class="h4 fw-light">商品說明</p>
              <p class="fs-5">{{ product.content }}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer>
        <div class="footer position-absolute end-0 bottom-0 start-0 p-3 text-center fs-4 text-warning">
          <p>@copyright</p>
        </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      product: {},
    };
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  created() {
    this.getProduct(this.id);
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to, from);
    this.getProduct(to.params.id);
    next();
  },
  computed: {
    ...mapState([
      'isLoading',
    ]),
    category() {
      switch (this.product.category) {
        case 'cloth':
          return '衣飾區';
        case 'food':
          return '食品區';
        default:
          return '家居區';
      }
    },
  },
  methods: {
    getProduct(productId) {
      this.$store.commit('openLoading');
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${productId}`;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        this.$store.commit('closeLoading');
        this.product = response.data.product;
        // 讓數量預設為1，但因為原本API傳進來的物件中沒有該屬性，所以要用set方法或ES6{...}使能夠追蹤其狀態
        if (!this.product.num) { this.$set(this.product, 'num', 1); }
        console.log(this.product);
      });
    },
    addToCart(id, qty = 1) {
      this.$store.commit('openLoading');
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      this.$http.post(api, { data: { product_id: id, qty } }).then((response) => {
        console.log(response.data.data.product);
        this.$store.dispatch('getCartArray');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .card-img {
    height: 450px;
    background-size: cover;
    background-position: center;
    @media(max-width: 767.98px){
      height: 350px;
    }
  }
  .input-width {
    width:60px;
  }
</style>
