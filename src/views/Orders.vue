<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <div class="table-responsive">
      <table class="table mt-4 text-nowrap">
        <thead>
          <tr>
            <th>購買時間</th>
            <th>Email</th>
            <th>購買款項</th>
            <th>應付金額</th>
            <th>是否付款</th>
          </tr>
        </thead>
        <tbody v-if="orders.length">
          <tr v-for="(item, key) in sortOrder" :key="key" :class="{'text-secondary': !item.is_paid}">
            <td>{{ item.create_at | dateFilter }}</td>
            <td><span v-text="item.user.email" v-if="item.user"></span></td>
            <td>
              <ul class="list-unstyled">
                <li v-for="(product, id) in item.products" :key="id">
                  {{ product.product.title }} 數量：{{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-end">{{ item.total | currencyFilter }}</td>
            <td class="text-end">
              <strong v-if="item.is_paid" class="text-success">已付款</strong>
              <span v-else class="text-muted">尚未起用</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination v-bind="paginationObj" @updateDataList="getOrders"/>
  </div>
</template>

<script>
import Pagination from '../components/Pagination.vue';

export default {
  name: 'CustomerOrders',
  data() {
    return {
      isLoading: false,
      orders: [],
      paginationObj: {
        total_pages: 1,
        current_page: 1,
        has_pre: false,
        has_next: false,
      },
    };
  },
  created() {
    this.getOrders();
  },
  components: {
    Pagination,
  },
  methods: {
    getOrders(currentPage = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${currentPage}`;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          this.orders = response.data.orders;
          this.pagination = response.data.pagination;
          this.isLoading = false;
        }
      });
    },
  },
  computed: {
    sortOrder() {
      const sortOrder = this.orders;
      if (this.orders.length) {
        sortOrder.sort((a, b) => {
          // 以購買時間未基準，已付款的排前面，未付款的排後面
          const aIsPaid = a.is_paid ? 1 : 0;
          const bIsPaid = b.is_paid ? 1 : 0;
          return bIsPaid - aIsPaid;
        });
      }
      return sortOrder;
    },
  },
};
</script>
