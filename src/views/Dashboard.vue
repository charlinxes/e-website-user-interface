<template>
  <div>
    <NavBar/>
    <div class="container-fluid">
      <div class="row">
        <SideBarMenu/>
        <main class="col-md-9 col-lg-10 ms-sm-auto px-md-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>

</template>

<script>
import NavBar from '@/components/NavBar.vue';
import SideBarMenu from '@/components/SideBarMenu.vue';

export default {
  name: 'Dashboard',
  components: {
    NavBar,
    SideBarMenu,
  },
  created() {
    // 抓取名為hexToken(login里自定義的名稱)的cookie
    // 並且加到傳給伺服器請求時的header，來告訴伺服器當前是否為登陸狀態
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = myCookie;
  },
};
</script>
