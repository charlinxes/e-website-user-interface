<template>
  <div>
    <Loading :active.sync="isOuterLoading" loader="bars"></Loading>
    <!-- 背景圖條 -->
    <div class="container-fluid px-0 mb-4">
      <div class="banner banner-bg d-flex justify-content-center align-items-end py-5">
        <div class="w-50 banner-textbg p-3 text-center">
          <p class="display-3 fw-bold">買到剁手手！跳樓大拍賣</p>
          <p class="fs-5">這是一個充滿歡樂的購物平台</p>
        </div>
      </div>
    </div>

    <!-- 主要內容 -->
    <section class="container-md px-5">
      <div class="row">
        <div class="col-md-2">
          <div class="sticky-top sticky-top-mt row">
            <div class="col-md-12 col-4 mb-4">
              <button type="button" class="btn btn-outline-warning d-flex justify-content-center align-items-center mx-auto"
                style="height:80px;width:80px;" :class="{'active-button':catgory === 'cloth'}" @click.prevent="changeCatgory('cloth')">
                  <div>
                    <font-awesome-icon icon="tshirt" class="fs-4"/>
                    <p class="mb-0">服飾區</p>
                  </div>
              </button>
            </div>
            <div class="col-md-12 col-4 mb-4">
              <button type="button" class="btn btn-outline-warning d-flex justify-content-center align-items-center mx-auto"
                style="height:80px;width:80px;" :class="{'active-button':catgory === 'food'}" @click.prevent="changeCatgory('food')">
                  <div>
                    <font-awesome-icon icon="utensils" class="fs-4"/>
                    <p class="mb-0">食品區</p>
                  </div>
              </button>
            </div>
            <div class="col-md-12 col-4 mb-4">
              <button type="button" class="btn btn-outline-warning d-flex justify-content-center align-items-center mx-auto"
                style="height:80px;width:80px;" :class="{'active-button':catgory === 'furniture'}" @click.prevent="changeCatgory('furniture')">
                  <div>
                    <font-awesome-icon icon="home" class="fs-4"/>
                    <p class="mb-0">家居區</p>
                  </div>
              </button>
            </div>
          </div>
        </div>
        <main class="col-md-10">
          <div class="row">
            <div class="col-6 mb-4 col-lg-4 col-xl-3" v-for="item in filterProducts" :key="item.id">
              <div class="card h-100 raise outline border-0 rounded-0">
                <div :style="{'background-image': `url(${item.imageUrl})`}" class="card-img"></div>
                <div class="card-body pb-0 card-body-color">
                  <span class="badge float-end ml-2">{{item.category}}</span>
                  <h5 class="card-title text-light single-ellipsis">{{item.title}}</h5>
                  <p class="card-text multiline-ellipsis" style="height:40px">{{item.content}}</p>
                  <div class="h5" v-if="item.price == item.origin_price">{{ item.origin_price | currencyFilter }} </div>
                  <div class="d-flex justify-content-between align-items-baseline" v-else>
                    <div><del class="h6"> {{ item.origin_price | currencyFilter }} </del></div>
                    <div class="h5"> {{ item.price | currencyFilter }} </div>
                  </div>
                </div>
                <div class="card-footer d-flex card-footer-color rounded-0">
                  <button type="button" class="btn btn-outline-warning btn-sm ms-auto" @click.prevent="addToCart(item.id,1)">
                    加到購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Pagination v-bind="paginationObj" @updateDataList="getProducts"/>
        </main>
      </div>
    </section>
  </div>
</template>

<script>
import Pagination from '../components/Pagination.vue';

export default {
  name: 'CustomerProductList',
  data() {
    return {
      isOuterLoading: false,
      products: [],
      product: {},
      paginationObj: {
        total_pages: 1,
        current_page: 1,
        has_pre: false,
        has_next: false,
      },
      catgory: 'cloth',
    };
  },
  created() {
    this.getProducts();
  },
  components: {
    Pagination,
  },
  computed: {
    filterProducts() {
      if (this.catgory === 'cloth') {
        return this.products.filter((currentValue) => currentValue.is_enabled === '1' && currentValue.category === 'cloth');
      } if (this.catgory === 'food') {
        return this.products.filter((currentValue) => currentValue.is_enabled === '1' && currentValue.category === 'food');
      }
      return this.products.filter((currentValue) => currentValue.is_enabled === '1' && currentValue.category === 'furniture');
    },
  },
  methods: {
    getProducts(page = 1) {
      this.isOuterLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        this.isOuterLoading = false;
        this.products = response.data.products;
        this.paginationObj = response.data.pagination;
      });
    },
    getProduct(id) {
      this.isOuterLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        this.isOuterLoading = false;
        this.product = response.data.product;
        // 讓數量預設為1，但因為原本API傳進來的物件中沒有該屬性，所以要用set方法或ES6{...}使其能追蹤其狀態
        if (!this.product.num) { this.$set(this.product, 'num', 1); }
        console.log(this.product);
        this.myModal.show();
      });
    },
    changeCatgory(type) {
      this.catgory = type;
    },
    addToCart(id, qty = 1) {
      this.isOuterLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      this.$http.post(api, { data: { product_id: id, qty } }).then((response) => {
        console.log(response.data.data.product);
        this.getCart();
        this.isOuterLoading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .banner {
    min-height: 400px;
    &-textbg {
      background-color: rgba(255, 255, 255, 0.6);
    }
    &-bg {
      background-image: url('../assets/helpers/img/clothing-shop.jpg');
      background-size: cover;
      background-position: center;
    }
  }

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
  .active-button {
    color: black;
    background-color: #ffc107;
  }
</style>
