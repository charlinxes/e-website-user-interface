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
        <div class="position-relative col-12" v-if="spinner.showMainSpinner" style="height:300px">
          <div class="position-absolute top-50 start-50 translate-middle">
            <div class="spinner-border text-warning" role="status" style="width: 5rem; height: 5rem;"/>
          </div>
        </div>
        <div class="col-lg-6 col-md-7" v-if="!spinner.showMainSpinner">
          <div :style="{'background-image': `url(${product.imageUrl})`}" class="productDetailList productDetailList__img"></div>
        </div>
        <div class="col-lg-6 col-md-5" v-if="!spinner.showMainSpinner">
          <div class="text-light">
            <h1 class="mt-3">{{ product.title }}</h1>
            <div class="h4 text-danger py-3" v-if="product.price == product.origin_price">售價 {{ product.origin_price | currencyFilter }} 元</div>
            <div class="d-flex align-items-baseline" v-else>
              <div><del class="h6 text-secondary">售價 {{ product.origin_price | currencyFilter }} 元</del></div>
              <div class="h4 text-danger ms-5">特價 {{ product.price | currencyFilter }} 元</div>
            </div>

            <div class="d-flex mb-4 mt-3">
              <button class="countGroup__btn countGroup__btn--color countGroup__btn--hover
                countGroup__btn--active border border-warning" type="button" id="reductBtn" @click="amount > 1 && amount--">-</button>
              <input type="text" class="form-control bg-transparent rounded-0 border-warning border-start-0 border-end-0
                text-warning text-center countGroup__input" v-model="amount">
              <button class="countGroup__btn countGroup__btn--color countGroup__btn--hover
                countGroup__btn--active border border-warning" type="button" id="addBtn" @click="amount++">+</button>
            </div>
            <button type="button" class="btn btn-outline-warning" @click="addToCart(id,amount,cardId)">
              加入購物車
              <span class="spinner-border spinner-border-sm" v-if="spinner.showProductSpinner" role="status" aria-hidden="true"/>
            </button>
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
      amount: this.qty,
      spinner: {
        showMainSpinner: false,
        showProductSpinner: false,
      },
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
      type: Number,
    },
    cardId: {
      type: String,
    },
    index: {
      type: Number,
    },
  },
  created() {
    this.getProduct(this.id);
  },
  beforeRouteUpdate(to, from, next) {
    this.getProduct(to.query.id);
    this.amount = to.query.qty;
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
      this.spinner.showMainSpinner = true;
      productsAPI.get(productId).then((response) => {
        console.log(response);
        const result = response.data?.product;
        if (result?.category && result?.title) {
          this.product = result;
        } else {
          console.log(response.data.message);
        }
        this.spinner.showMainSpinner = false;
      }).catch((error) => { console.log(error); });
    },
    addToCart(id, amount = 1, cardId) {
      this.spinner.showProductSpinner = true;
      if (cardId) {
        cartAPI.delete(cardId).then(() => {
          this.$store.commit('delFromCart', this.index);
        });
      }
      cartAPI.post(id, amount).then((response) => {
        this.$store.commit('addToCart', response.data.data);
        this.spinner.showProductSpinner = false;
      });
    },
  },
};
</script>
