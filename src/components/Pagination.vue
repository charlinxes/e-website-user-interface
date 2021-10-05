<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li class="page-item" :class="{'disabled': !has_pre}">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="changePage(1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li v-if="pageList[2]-2>1" class="page-item disabled"><span class="page-link">...</span></li>
      <li class="page-item" :class="{'active': page === current_page}" v-for="page in pageList" :key="page">
        <a class="page-link" href="#" @click.prevent="changePage(page)">{{page}}</a>
      </li>
      <li v-if="total_pages-pageList[2]>2" class="page-item disabled"><span class="page-link">...</span></li>
      <li class="page-item" :class="{'disabled': !has_next}">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="changePage(total_pages)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total_pages: {
      type: Number,
      required: true,
    },
    current_page: {
      type: Number,
      required: true,
    },
    has_pre: {
      type: Boolean,
      required: true,
    },
    has_next: {
      type: Boolean,
      required: true,
    },
  },
  // 測試多頁數的情況
  // data() {
  //   return {
  //     total_pages: 14,
  //     current_page: 11,
  //   };
  // },
  computed: {
    pageList() {
      const list = [];
      if (this.total_pages <= 5) {
        let i = 1;
        do {
          list.push(i);
          i += 1;
        } while (i <= this.total_pages);
        return list;
      }
      if (this.current_page <= 3) {
        return [1, 2, 3, 4, 5];
      }
      if (this.current_page === this.total_pages) {
        return [this.current_page - 2, this.current_page - 1, this.current_page];
      }
      if (this.current_page === this.total_pages - 1) {
        return [this.current_page - 1, this.current_page, this.current_page + 1];
      }
      return [this.current_page - 2, this.current_page - 1, this.current_page, this.current_page + 1, this.current_page + 2];
    },
  },
  methods: {
    changePage(targetPage) {
      this.$emit('updateDataList', targetPage);
    },
  },
};
</script>
