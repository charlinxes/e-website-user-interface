<template>
  <main class="col-md-10">
    <Loading :active.sync="isLoading" loader="bars"></Loading>
    <div class="row">
      <div class="col-6 mb-4 col-lg-4 col-xl-3" v-for="item in filterProducts" :key="item.id">
        <div class="card h-100 raise outline border-0 rounded-0" @click="showDetail(item.id)">
          <div :style="{'background-image': `url(${item.imageUrl})`}" class="card-img"></div>
          <div class="card-body pb-0 card-body-color">
            <span class="badge float-end ml-2">{{item.category}}</span>
            <h5 class="card-title text-light single-ellipsis">{{item.title}}</h5>
            <p class="card-text multiline-ellipsis card-height">{{item.content}}</p>
            <div class="h5" v-if="item.price == item.origin_price">{{ item.origin_price | currencyFilter }} </div>
            <div class="row align-items-baseline" v-else>
              <div class="col-auto"><del class="h6"> {{ item.origin_price | currencyFilter }} </del></div>
              <div class="h5 col-auto ms-auto"> {{ item.price | currencyFilter }} </div>
            </div>
          </div>
          <div class="card-footer d-flex card-footer-color rounded-0">
            <button type="button" class="btn btn-outline-warning btn-sm ms-auto" @click.stop="addToCart(item.id,1)">
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <Pagination v-bind="paginationObj" @updateDataList="getProducts"/>
  </main>
</template>

<script>
import { mapState } from 'vuex';
import Pagination from '../components/Pagination.vue';

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
    ...mapState([
      'isLoading',
    ]),
  },
  methods: {
    getProducts(page = 1) {
      this.$store.commit('openLoading');
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        this.$store.commit('closeLoading');
        this.products = response.data.products;
        this.paginationObj = response.data.pagination;
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
    showDetail(productId) {
      this.$router.push({ name: 'ProductDetail', params: { id: `${productId}` } });
    },
  },
};
</script>

<style lang="scss" scoped>
  .raise:hover {
    transform: translateY(-0.2em);
  }
  .outline:hover {
    outline:1px solid #ffc107;
  }
  .card-img {
    height: 180px;
    background-size: cover;
    background-position: center;
  }
  .card-body-color {
    background-color: rgb(78, 78, 78);
    color:honeydew
  }
  .card-footer-color {
    background-color: rgb(41, 37, 37);
  }
  .card-height {
    height:45px;
  }
  .single-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
  }
  .multiline-ellipsis {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
</style>
