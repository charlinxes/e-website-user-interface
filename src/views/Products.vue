<template>
  <main class="col-md-10">
    <div class="position-relative" v-if="spinner.showMainSpinner" style="height:300px">
      <div class="position-absolute top-50 start-50 translate-middle">
        <div class="spinner-border text-warning" role="status" style="width: 5rem; height: 5rem;"/>
      </div>
    </div>
    <div class="row" v-if="!spinner.showMainSpinner">
      <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-4 pointer" v-for="item in filterProducts" :key="item.id">
        <div class="card h-100 card--hover outline border-0 rounded-0" @click="showDetail(item.id)">
          <div :style="{'background-image': `url(${item.imageUrl})`}" class="card__img"></div>
          <div class="card-body pb-0">
            <span class="badge bg-secondary float-end ml-2">{{item.category | categoryTransform}}</span>
            <h5 class="card-title text-light single-ellipsis">{{item.title}}</h5>
            <p class="card-text multiline-ellipsis">{{item.content}}</p>
            <div class="h5" v-if="item.price == item.origin_price">{{ item.origin_price | currencyFilter }} </div>
            <div class="row align-items-baseline" v-else>
              <div class="col-auto"><del class="h6"> {{ item.origin_price | currencyFilter }} </del></div>
              <div class="h5 col-auto ms-auto"> {{ item.price | currencyFilter }} </div>
            </div>
          </div>
          <div class="card-footer d-flex rounded-0">
            <button type="button" class="btn btn-outline-warning btn-sm ms-auto" @click.stop="addToCart(item.id,1)">
              加到購物車
              <span class="spinner-border spinner-border-sm" v-if="spinner.showProductSpinner === item.id" role="status" aria-hidden="true"/>
            </button>
          </div>
        </div>
      </div>
    </div>
    <Pagination v-bind="paginationObj" @updateDataList="getProducts" v-if="!spinner.showMainSpinner"/>
  </main>
</template>

<script>
// import { mapState } from 'vuex';
import Pagination from '@/components/Pagination.vue';
import cartAPI from '../apis/cart_api';
import productsAPI from '../apis/products_api';

export default {
  name: 'CustomerProducts',
  props: {
    category: {
      type: String,
      required: true,
      default: 'cloth',
    },
  },
  data() {
    return {
      products: [],
      paginationObj: {
        total_pages: 1,
        current_page: 1,
        has_pre: false,
        has_next: false,
      },
      spinner: {
        showMainSpinner: false,
        showProductSpinner: '',
      },
    };
  },
  created() {
    this.getProducts();
    this.$store.commit('changeCategory', this.category);
  },
  components: {
    Pagination,
  },
  computed: {
    filterProducts() {
      if (this.category === 'cloth') {
        return this.products.filter((currentValue) => currentValue.is_enabled === '1' && currentValue.category === 'cloth');
      } if (this.category === 'food') {
        return this.products.filter((currentValue) => currentValue.is_enabled === '1' && currentValue.category === 'food');
      }
      return this.products.filter((currentValue) => currentValue.is_enabled === '1' && currentValue.category === 'furniture');
    },
  },
  methods: {
    getProducts(page = 1) {
      this.spinner.showMainSpinner = true;
      productsAPI.getList(page).then((response) => {
        const products = response.data?.products;
        const pagination = response.data?.pagination;
        if (products && pagination) {
          this.products = products;
          this.paginationObj = pagination;
        } else {
          console.log('未找到商品列表');
        }
        this.spinner.showMainSpinner = false;
      }).catch((error) => { console.log(error); });
    },
    addToCart(id, qty = 1) {
      this.spinner.showProductSpinner = id;
      cartAPI.post(id, qty).then((response) => {
        this.$store.commit('addToCart', response.data.data);
        this.spinner.showProductSpinner = '';
      });
    },
    showDetail(productId) {
      this.$router.push({ name: 'ProductDetail', query: { id: `${productId}` } });
    },
  },
};
</script>
