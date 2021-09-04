<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar d-none" >
    <div class="position-sticky pt-3">
      <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted fs-6">
        <span>管理員</span>
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item link-hover">
          <router-link class="nav-link fs-5 d-flex" :to="{name:'Products'}">
            <p class="sidebar-icon-width text-center mb-0"><font-awesome-icon icon="box-open" class="me-1"/></p>
            產品列表
          </router-link>
        </li>
        <li class="nav-item link-hover">
          <router-link class="nav-link fs-5 d-flex" :to="{name:'Orders'}">
            <p class="sidebar-icon-width text-center mb-0"><font-awesome-icon icon="list-alt" class="me-1"/></p>
            訂單列表
          </router-link>
        </li>
        <li class="nav-item link-hover">
          <router-link class="nav-link fs-5 d-flex" :to="{name:'Coupons'}">
            <p class="sidebar-icon-width text-center mb-0"><font-awesome-icon icon="receipt" class="me-1"/></p>
            優惠卷列表
          </router-link>
        </li>
      </ul>
      <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
        <span>模擬功能</span>
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'CustomerOrders'}">
            模擬訂單
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'SideBarMenu',
};
</script>

<style lang="scss" scoped>
  .sidebar-icon-width {
    width: 35px;
  }
  .link-hover:hover {
    background-color:rgb(226, 226, 226);
  }
  .router-link-exact-active {
    background-color:rgb(226, 226, 226);
  }

</style>
