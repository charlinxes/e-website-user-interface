<template>
  <div>
    <Header></Header>
    <div class="container">
      <div class="h1 text-light text-center mt-5 mb-4">HOLO商城 結帳</div>
      <div class="row justify-content-center">
        <div class="col-10 col-md-4 mt-3">
          <div class="bg-transparent rounded-pill text-center fs-5 mx-auto py-2"
            :class="{'checkout__item--active':step === 1,'checkout__item--inactive':!(step === 1)}">
            1.輸入訂單資料
          </div>
        </div>
        <div class="col-10 col-md-4 mt-3">
          <div class="bg-transparent rounded-pill text-center fs-5 mx-auto py-2"
            :class="{'checkout__item--active':step === 2,'checkout__item--inactive':!(step === 2)}">
            2.確認結帳
          </div>
        </div>
        <div class="col-10 col-md-4 mt-3">
          <div class="bg-transparent rounded-pill text-center fs-5 mx-auto py-2"
            :class="{'checkout__item--active':step === 3,'checkout__item--inactive':!(step === 3)}">
            3.結帳完成
          </div>
        </div>
      </div>

      <!-- step 1 -->
      <InformationForm v-show="step === 1" @update-form="updateForm"/>

      <!-- step 2 -->
      <div class="row justify-content-center mb-5 mt-5" v-show="step === 2">
        <div class="col-lg-7 col-md-9 col-10 h2 text-light text-center mb-4 checkout__title--bgcolor py-2">購物車資訊</div>
        <div class="table-responsive col-lg-7 col-md-9">
          <table class="table text-light">
            <thead>
              <tr>
                <th scope="col" class="border-top border-light"></th>
                <th scope="col" class="border-top border-light"></th>
                <th scope="col" class="border-top border-light text-center">品名</th>
                <th scope="col" class="border-top border-light text-center">數量</th>
                <th scope="col" class="border-top border-light text-center checkout__price">單價</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cartArray" :key="item.id">
                <td class="text-center align-middle">
                  <button type="button" class="btn btn-outline-danger btn-sm" @click.prevent="delFromCart(item.id)">
                    <font-awesome-icon icon="trash-alt"/>
                  </button>
                </td>
                <td :style="{'background-image': `url(${item.product.imageUrl})`}" class="checkout-cart-bgimg me-3"></td>
                <td class="py-4 align-middle">
                  <p class="mb-1 text-center">{{item.product.title}}</p>
                  <p class="mb-0 text-success text-center" v-if="!!(cartDiscountPrice)">已套用折價卷</p>
                </td>
                <td class="py-4 text-center align-middle">{{item.qty}} {{item.product.unit}}</td>
                <td class="py-4 text-end align-middle">{{item.product.price | currencyFilter}}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td class="text-end align-middle">總計</td>
                <td class="text-end fs-5 align-middle text-danger">{{cartTotalPrice | currencyFilter}}</td>
              </tr>
              <tr class="text-success" v-if="!!(cartDiscountPrice) && cartDiscountPrice !== cartTotalPrice">
                <td class="border-bottom-0"></td>
                <td class="border-bottom-0"></td>
                <td class="border-bottom-0"></td>
                <td class="text-end border-bottom-0 align-middle">折扣價</td>
                <td class="text-end border-bottom-0 fs-5 align-middle">{{cartDiscountPrice | currencyFilter}}</td>
              </tr>
            </tbody>
          </table>
          <div class="input-group w-75 mt-2 mx-auto">
            <input type="text" class="form-control bg-transparent text-light border-warning border-end-0" placeholder="請輸入優惠碼" aria-label="Coupon Code"
              aria-describedby="coupon-code" v-model="couponCode">
            <button class="btn btn-outline-warning" @click="applyCoupon()">套用優惠碼</button>
          </div>
          <div class="text-end fs-6 mt-3">
            <button class="btn btn-outline-warning me-3" @click="step -= 1">上一步</button>
            <button class="btn btn-outline-danger" :class="{disabled:!(cartArray.length)}" @click="placeOrder">確認並付款</button>
          </div>
        </div>
      </div>

      <!-- step 3 -->
      <div class="my-5 row justify-content-center" v-if="step === 3">
        <div class="col-lg-7 col-md-9 col-10">
          <table class="table text-light">
            <thead>
              <tr>
                <th scope="col">品名</th>
                <th scope="col">數量</th>
                <th scope="col" class="price-width">單價</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in order.products" :key="item.id">
                <td class="align-middle">{{ item.product.title }}</td>
                <td class="align-middle">{{ item.qty }} / {{ item.product.unit }}</td>
                <td class="align-middle text-end">{{ item.final_total }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" class="text-end">總計</td>
                <td class="text-end text-danger">{{ order.total }}</td>
              </tr>
            </tfoot>
          </table>

          <table class="table text-light mt-5">
            <tbody>
              <tr>
                <th>Email</th>
                <td>{{ order.user.email }}</td>
              </tr>
              <tr>
                <th>姓名</th>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <th>收件人電話</th>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th>收件人地址</th>
                <td>{{ order.user.address }}</td>
              </tr>
              <tr>
                <th>付款狀態</th>
                <td>
                  <span v-if="!order.is_paid" class="text-danger">尚未付款</span>
                  <span v-else class="text-success">付款完成</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="text-end fs-6 mb-2">
            <button class="btn btn-outline-warning me-3" @click="$router.push({ name: 'Products', query: { category: 'cloth' } })">
              繼續選購
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import InformationForm from '@/components/InformationForm.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import cartAPI from '../apis/cart_api';
import couponAPI from '../apis/coupon_api';
import orderAPI from '../apis/order_api';

export default {
  data() {
    return {
      form: {},
      couponCode: '',
      cartDiscountPrice: 0,
      step: 1,
      order: {
        user: {},
      },
      orderId: '',
    };
  },
  components: {
    InformationForm,
    Header,
    Footer,
  },
  computed: {
    ...mapState([
      'cartArray',
      'cartTotalPrice',
    ]),
  },
  methods: {
    updateForm(form) {
      this.form = form;
      this.step += 1;
    },
    delFromCart(id) {
      this.$store.commit('openLoading');
      cartAPI.delete(id).then(() => {
        this.$store.dispatch('getCartArray');
      });
    },
    applyCoupon() {
      this.$store.commit('openLoading');
      couponAPI.post(this.couponCode).then((response) => {
        if (response.data.success) {
          this.cartDiscountPrice = response.data.data.final_total;
          this.$store.dispatch('getCartArray');
          this.$store.commit('closeLoading');
        } else {
          console.log(response.data.message);
          this.$store.commit('closeLoading');
        }
      });
    },
    getOrder() {
      orderAPI.get(this.orderId).then((response) => {
        this.order = response.data.order;
      });
    },
    placeOrder() {
      this.$store.commit('openLoading');
      orderAPI.postOrder(this.form).then((response) => {
        if (response.data.success) {
          this.$store.dispatch('getCartArray');
          this.form = {};
          this.orderId = response.data.orderId;
          this.getOrder();
          orderAPI.postPayment(this.orderId).then(() => {
            this.order.is_paid = true;
            this.step += 1;
            this.$store.commit('closeLoading');
          });
        } else {
          this.$store.commit('closeLoading');
        }
      });
    },
  },
};
</script>
