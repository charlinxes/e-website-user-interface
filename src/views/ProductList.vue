<template>
  <div>
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
                style="height:80px;width:80px;" :class="{'active-button':category === 'cloth'}" @click.prevent="changeCategory('cloth')">
                  <div>
                    <font-awesome-icon icon="tshirt" class="fs-4"/>
                    <p class="mb-0">服飾區</p>
                  </div>
              </button>
            </div>
            <div class="col-md-12 col-4 mb-4">
              <button type="button" class="btn btn-outline-warning d-flex justify-content-center align-items-center mx-auto"
                style="height:80px;width:80px;" :class="{'active-button':category === 'food'}" @click.prevent="changeCategory('food')">
                  <div>
                    <font-awesome-icon icon="utensils" class="fs-4"/>
                    <p class="mb-0">食品區</p>
                  </div>
              </button>
            </div>
            <div class="col-md-12 col-4 mb-4">
              <button type="button" class="btn btn-outline-warning d-flex justify-content-center align-items-center mx-auto"
                style="height:80px;width:80px;" :class="{'active-button':category === 'furniture'}" @click.prevent="changeCategory('furniture')">
                  <div>
                    <font-awesome-icon icon="home" class="fs-4"/>
                    <p class="mb-0">家居區</p>
                  </div>
              </button>
            </div>
          </div>
        </div>
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'CustomerProductList',
  computed: {
    ...mapState([
      'category',
    ]),
  },
  methods: {
    changeCategory(type) {
      if (!(type === this.category)) {
        this.$store.commit('changeCategory', type);
        this.$router.push({ name: 'Products', query: { category: `${type}` } });
      }
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

  .active-button {
    color: black;
    background-color: #ffc107;
  }
</style>
