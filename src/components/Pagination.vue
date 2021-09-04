<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li class="page-item" :class="{'disabled': !has_pre}">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="changePage(current_page-1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" :class="{'active': page === current_page}"
        v-for="page in total_pages" :key="page">
        <a class="page-link" href="#" @click.prevent="changePage(page)">{{page}}</a>
      </li>
      <li class="page-item" :class="{'disabled': !has_next}">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="changePage(current_page+1)">
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
  methods: {
    changePage(targetPage) {
      this.$emit('updateDataList', targetPage);
    },
  },
};
</script>
