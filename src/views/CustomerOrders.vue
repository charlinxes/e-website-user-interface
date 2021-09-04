<template>
  <div>
    <Loading :active.sync="isOuterLoading" loader="bars"></Loading>
    <div class="row mt-3">
      <div class="col-md-4 mb-4" v-for="item in filterProducts" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div :style="{'background-image': `url(${item.imageUrl})`}"
            style="background-size: cover; background-position: center" class="bg-img-height"></div>
          <div class="card-body">
            <span class="badge badge-secondary float-end ml-2">{{item.category}}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{item.tittle}}</a>
            </h5>
            <p class="card-text">{{item.content}}</p>
            <div class="h4" v-if="item.price == item.origin_price">{{ item.origin_price | currencyFilter }} 元</div>
            <div class="d-flex justify-content-between align-items-baseline" v-else>
              <div><del class="h6">原價 {{ item.origin_price | currencyFilter }} 元</del></div>
              <div class="h4">現在只要 {{ item.price | currencyFilter }} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="getProduct(item.id)">
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ms-auto" @click.prevent="addToCart(item.id,1)">
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="ModalLabel">{{ product.title }}</h5>
            <button type="button" class="btn-close" aria-label="Close" @click.prevent="myModal.hide()"></button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt="">
            <blockquote class="blockquote mt-3">
              <p>{{ product.content }}</p>
              <footer class="blockquote-footer text-end">{{ product.description }}</footer>
            </blockquote>
            <div class="h4" v-if="product.price == product.origin_price">{{ product.origin_price | currencyFilter }} 元</div>
            <div class="d-flex justify-content-between align-items-baseline" v-else>
              <div><del class="h6">原價 {{ product.origin_price | currencyFilter }} 元</del></div>
              <div class="h4">現在只要 {{ product.price | currencyFilter }} 元</div>
            </div>
            <select name="" class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{num}} {{product.unit}}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap me-3">
              小計 <strong>{{ product.num * product.price | currencyFilter }}</strong> 元
            </div>
            <button type="button" class="btn btn-primary" @click.prevent="addToCart(product.id, product.num)">
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <Pagination v-bind="paginationObj" @updateDataList="getProducts"/>
    <div class="row justify-content-center mb-5">
      <div class="table-responsive col-md-6">
        <table class="table">
          <thead>
            <tr>
              <th scope="col" class="border-top border-dark" style="width:10%"></th>
              <th scope="col" class="border-top border-dark">品名</th>
              <th scope="col" class="border-top border-dark" style="width:15%">數量</th>
              <th scope="col" class="border-top border-dark" style="width:15%">單價</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartArray" :key="item.id">
              <td class="text-center align-middle">
                <button type="button" class="btn btn-outline-danger btn-sm" @click.prevent="delFromCart(item.id)">
                  <font-awesome-icon icon="trash-alt"/>
                </button>
              </td>
              <td class="py-4 align-middle">
                <p class="mb-1">{{item.product.title}}</p>
                <p class="mb-0 text-success" v-if="!!(cartDiscountPrice)">已套用折價卷</p>
              </td>
              <td class="py-4 align-middle">{{item.qty}}{{item.product.unit}}</td>
              <td class="py-4 text-end align-middle">{{item.product.price | currencyFilter}}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td class="text-end">總計</td>
              <td class="text-end">{{cartTotalPrice | currencyFilter}}</td>
            </tr>
            <tr class="text-success" v-if="!!(cartDiscountPrice) && cartDiscountPrice !== cartTotalPrice">
              <td class="border-bottom-0"></td>
              <td class="border-bottom-0"></td>
              <td class="text-end border-bottom-0">折扣價</td>
              <td class="text-end border-bottom-0">{{cartDiscountPrice | currencyFilter}}</td>
            </tr>
          </tbody>
        </table>
        <div class="input-group w-75 mt-2 mx-auto">
          <input type="text" class="form-control" placeholder="請輸入優惠碼" aria-label="Coupon's Code" aria-describedby="coupon-code" v-model="couponCode">
          <button class="btn btn-outline-secondary" type="button" id="coupon-code" @click.prevent="applyCoupon">套用優惠碼</button>
        </div>
      </div>
    </div>

    <!-- 提交表單 -->
    <ValidationObserver v-slot="{ handleSubmit }" ref="form">
      <div class="row justify-content-center">
        <form class="col-md-6" @submit.prevent="handleSubmit(placeOrder)" novalidate>
          <div class="row">
            <div class="col-12">
              <ValidationProvider name="email" rules="required|email" v-slot="{ errors, classes }">
                <label for="userEmail">電子信箱</label>
                <input type="email" class="form-control" :class="classes" name="email" id="userEmail"
                  v-model="form.user.email" placeholder="請輸入 Email" required>
                <span class="text-danger fw-bold">{{errors[0]}}</span>
              </ValidationProvider>
            </div>
          </div>

          <div class="row mt-2">
            <div class="col-12">
              <ValidationProvider name="userName" rules="required" v-slot="{ errors, classes }">
                <label for="userName">收件人姓名</label>
                <input type="text" class="form-control" :class="classes" name="userName" id="userName"
                  v-model="form.user.name" placeholder="輸入姓名">
                <span class="text-danger fw-bold">{{errors[0]}}</span>
              </ValidationProvider>
            </div>
          </div>

          <div class="row mt-2">
            <div class="col-12">
              <ValidationProvider name="userTel" rules="required|digits:10" v-slot="{ errors, classes }">
                <label for="userTel">收件人電話</label>
                <input type="text" class="form-control" :class="classes" id="userTel" v-model="form.user.tel" placeholder="請輸入電話">
                <span class="text-danger fw-bold">{{errors[0]}}</span>
              </ValidationProvider>
            </div>
          </div>

          <div class="row mt-2">
            <div class="col-12">
              <ValidationProvider name="userAddress" rules="required" v-slot="{ errors, classes }">
                <label for="userAddress">收件人地址</label>
                <input type="text" class="form-control" :class="classes" name="address" id="userAddress" v-model="form.user.address"
                  placeholder="請輸入地址">
               <span class="text-danger fw-bold">{{errors[0]}}</span>
              </ValidationProvider>
            </div>
          </div>

          <div class="row mt-2">
            <div class="col-12">
              <label for="comment">留言</label>
              <textarea name="comment" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
            </div>
          </div>

          <div class="text-end mt-2">
            <button type="submit" class="btn btn-danger">送出訂單</button>
          </div>
        </form>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import Pagination from '../components/Pagination.vue';

export default {
  name: 'CustomerOrders',
  data() {
    return {
      products: [],
      product: {},
      myModal: {},
      isOuterLoading: false,
      isInnerLoading: false,
      cartArray: [],
      cartTotalPrice: 0,
      paginationObj: {
        total_pages: 1,
        current_page: 1,
        has_pre: false,
        has_next: false,
      },
      couponCode: '',
      cartDiscountPrice: 0,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      value: '',
    };
  },
  components: {
    Pagination,
    ValidationProvider,
    ValidationObserver,
  },
  created() {
    this.getProducts();
    this.getCart();
  },
  mounted() {
    this.myModal = new Modal(document.getElementById('productModal'));
  },
  computed: {
    filterProducts() {
      return this.products.filter((currentValue) => currentValue.is_enabled === '1');
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
    addToCart(id, qty = 1) {
      this.isOuterLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      this.$http.post(api, { data: { product_id: id, qty } }).then((response) => {
        console.log(response.data.data.product);
        this.getCart();
        this.isOuterLoading = false;
        this.myModal.hide();
      });
    },
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
        console.log(response.data.data.carts);
        this.cartArray = response.data.data.carts;
        this.cartTotalPrice = response.data.data.total;
      });
    },
    applyCoupon() {
      this.isOuterLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      this.$http.post(api, { data: { code: this.couponCode } }).then((response) => {
        if (response.data.success) {
          this.cartDiscountPrice = response.data.data.final_total;
          this.getCart();
          this.isOuterLoading = false;
        } else {
          console.log(response.data.message);
          this.isOuterLoading = false;
        }
      });
    },
    placeOrder() {
      this.isOuterLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      this.$http.post(api, { data: this.form }).then((response) => {
        if (response.data.success) {
          this.getCart();
          this.form = {
            user: {
              name: '',
              email: '',
              tel: '',
              address: '',
            },
            message: '',
          };
          this.$nextTick(() => {
            this.$refs.form.reset();
          });
          this.isOuterLoading = false;
          this.$router.push({ name: 'CustomerCheckout', params: { orderId: response.data.orderId } });
        } else {
          console.log(response.data);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .bg-img-height{
    height: 150px
  };
  .invalid{
    border-color: red;
  }
</style>
