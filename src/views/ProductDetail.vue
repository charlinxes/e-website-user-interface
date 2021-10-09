<template>
  <div>
    <Header></Header>
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
          <div :style="{'background-image': `url(${product.imageUrl})`}" class="productDetail__img"></div>
        </div>
        <div class="col-lg-6 col-md-5">
          <div class="text-light">
            <h1 class="mt-3">{{ product.title }}</h1>
            <div class="h4 text-danger py-3" v-if="product.price == product.origin_price">售價 {{ product.origin_price | currencyFilter }} 元</div>
            <div class="d-flex align-items-baseline" v-else>
              <div><del class="h6 text-secondary">售價 {{ product.origin_price | currencyFilter }} 元</del></div>
              <div class="h4 text-danger ms-5">特價 {{ product.price | currencyFilter }} 元</div>
            </div>

            <div class="d-flex mb-4 mt-3">
              <button class="productDetail__btn productDetail__btn--color productDetail__btn--hover
                productDetail__btn--active border border-warning" type="button" id="reductBtn" @click="number > 1 && number--">-</button>
              <input type="text" class="form-control bg-transparent rounded-0 border-warning border-start-0 border-end-0
                text-warning text-center productDetail__input" v-model="number">
              <button class="productDetail__btn productDetail__btn--color productDetail__btn--hover
                productDetail__btn--active border border-warning" type="button" id="addBtn" @click="number++">+</button>
            </div>
            <button type="button" class="btn btn-outline-warning" @click="addToCart(id,number,cardId)">加入購物車</button>
            <div class="mt-4">
              <p class="h4 fw-light">商品說明</p>
              <p class="fs-5">{{ product.content }}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import cartAPI from '../apis/cart_api';
import productsAPI from '../apis/products_api';

export default {
  data() {
    return {
      product: {},
      number: this.qty,
    };
  },
  components: {
    Header,
    Footer,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    qty: {
      default: 1,
    },
    cardId: {
      type: String,
    },
  },
  created() {
    this.getProduct(this.id);
  },
  beforeRouteUpdate(to, from, next) {
    this.getProduct(to.query.id);
    this.number = to.query.qty;
    next();
  },
  computed: {
    category() {
      switch (this.product.category) {
        case 'cloth':
          return '服飾區';
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
      productsAPI.get(productId).then((response) => {
        const result = response.data?.product;
        if (result?.category && result?.title) {
          this.product = result;
        } else {
          console.log(response.data.message);
        }
        this.$store.commit('closeLoading');
      }).catch((error) => { console.log(error); });
    },
    addToCart(id, qty = 1, cardId) {
      this.$store.commit('openLoading');
      cartAPI.delete(cardId).then(() => {
        cartAPI.post(id, qty).then(() => {
          this.$store.dispatch('getCartArray');
        });
      });
    },
  },
};
</script>
