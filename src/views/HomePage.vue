<template>
  <div>
    <Header></Header>

    <div class="container-fluid px-0 mb-4">
      <div class="banner d-flex justify-content-center align-items-end py-5">
        <div class="w-50 banner__title--bgcolor p-3 text-center">
          <p class="display-3 fw-bold">買到剁手手！跳樓大拍賣</p>
          <p class="fs-5">這是一個充滿歡樂的購物平台</p>
        </div>
      </div>
    </div>

    <section class="container-md px-5">
      <div class="row">
        <div class="col-md-2">
          <div class="sticky-top sticky-top-mt row">
            <div class="col-md-12 col-4 mb-4">
              <button type="button" class="btn btn-outline-warning d-flex justify-content-center align-items-center mx-auto"
                style="height:80px;width:80px;" :class="{'homepage__button--active':category === 'cloth'}" @click.prevent="changeCategory('cloth')">
                  <div>
                    <font-awesome-icon icon="tshirt" class="fs-4"/>
                    <p class="mb-0">服飾區</p>
                  </div>
              </button>
            </div>
            <div class="col-md-12 col-4 mb-4">
              <button type="button" class="btn btn-outline-warning d-flex justify-content-center align-items-center mx-auto"
                style="height:80px;width:80px;" :class="{'homepage__button--active':category === 'food'}" @click.prevent="changeCategory('food')">
                  <div>
                    <font-awesome-icon icon="utensils" class="fs-4"/>
                    <p class="mb-0">食品區</p>
                  </div>
              </button>
            </div>
            <div class="col-md-12 col-4 mb-4">
              <button type="button" class="btn btn-outline-warning d-flex justify-content-center align-items-center mx-auto"
                style="height:80px;width:80px;" :class="{'homepage__button--active':category === 'furniture'}" @click.prevent="changeCategory('furniture')">
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

    <Footer></Footer>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'CustomerHomePage',
  components: {
    Header,
    Footer,
  },
  beforeRouteUpdate(to, from, next) {
    this.$store.commit('changeCategory', to.query.category ? to.query.category : 'cloth');
    next();
  },
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
