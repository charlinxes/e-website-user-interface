<template>
  <div>
    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">HOLO 購物網後台</a>
      <button class="navbar-toggler position-absolute d-md-none collapsed" type="button"
        data-bs-toggle="collapse" data-bs-target="#collapseMenu" aria-controls="sidebarMenu"
        aria-expanded="false" aria-label="Toggle navigation" id="collapseToggle">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-nav d-none d-md-block">
        <div class="nav-item text-nowrap">
          <a class="nav-link px-3" href="#" @click.prevent="logout">登出</a>
        </div>
      </div>
    </header>

    <div class="collapse d-md-none" id="collapseMenu">
      <ul class="nav flex-column mb-2 bg-dark">
        <li class="nav-item">
          <router-link class="nav-link text-light" :to="{name:'Products'}">
            <font-awesome-icon icon="box-open" class="me-1 text-light"/>產品列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-light" :to="{name:'Orders'}">
            <font-awesome-icon icon="list-alt" class="me-1" />訂單列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-light" :to="{name:'Coupons'}">
            <font-awesome-icon icon="receipt" class="me-1 text-light" />優惠卷列表
          </router-link>
        </li>
        <li class="nav-item text-nowrap">
          <a class="nav-link px-3 text-muted" href="#" @click.prevent="logout">登出</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Collapse from 'bootstrap/js/dist/collapse';

export default {
  name: 'NabBar',
  components: {
  },
  data() {
    return {
      myCollapse: {},
    };
  },
  mounted() {
    this.myCollapse = new Collapse(document.getElementById('collapseToggle'));
  },
  methods: {
    logout() {
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      this.$http.post(api).then((response) => {
        console.log(response.data);
        this.$router.push({ path: '/login' });
      });
    },
  },
};
</script>
