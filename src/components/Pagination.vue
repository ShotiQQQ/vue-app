<template>

  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow pagination__link--disabled" aria-label="Предыдущая страница" @click.prevent="lessPaginate(page)">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>

    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
      <a class="pagination__link" :class="{'pagination__link--current': pageNumber === page}" @click.prevent="paginate(pageNumber)">
        {{pageNumber}}
      </a>
    </li>

    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" href="#" aria-label="Следующая страница" @click.prevent="morePaginate(page)">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>

</template>

<script>
export default {
  model: {
    prop: 'page',
    event: 'paginate'
  },
  props: ['page', 'count', 'perPage'],
  methods: {
    paginate(page) {
      this.$emit('paginate', page);
    },
    lessPaginate(page) {
      if (page > 1) {
        this.$emit('paginate', page - 1);
      }
    },
    morePaginate(page) {
      if (page !== this.perPage) {
        this.$emit('paginate', page + 1);
      }
    }
  },
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    }
  }
}
</script>
<style lang="scss">
  .pagination__link {
    cursor: pointer;
    transition: color .3s ease-in-out;

    &:hover {
      color: #e02d71;
    }
  }
</style>
