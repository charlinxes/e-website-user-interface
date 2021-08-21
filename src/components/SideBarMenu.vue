<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
    <div class="position-sticky pt-3">
      <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
        <span>管理員</span>
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'Products'}">
            <font-awesome-icon icon="box-open" class="me-1"/>產品列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'Coupons'}">
            <font-awesome-icon icon="list-alt" class="me-1" />訂單列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'Coupons'}">
            <font-awesome-icon icon="receipt" class="me-1" />優惠卷列表
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
  components: {

  },
};
</script>
