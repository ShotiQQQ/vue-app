<template>
  <MainContainer>

    <Filters />

    <section class="catalog">

      <Loader v-if="$store.state.isLoadingProductsData" />

      <Catalog v-else :products="products" />

      <Pagination v-model="page" :count="countProducts" :per-page="productsPerPage" />

    </section>


  </MainContainer>
</template>

<script>
import Filters from "@/components/Filters.vue";
import Catalog from "@/components/Catalog.vue";
import MainContainer from "@/components/MainContainer.vue";
import Loader from "@/components/Loader.vue";
import Pagination from "@/components/Pagination.vue";

export default {
  components: {Pagination, Loader, MainContainer, Catalog, Filters},
  props: [],
  data() {
    return {
      page: 1,
      productsPerPage: 3,
    }
  },
  computed: {
    products() {
      const offset = (this.page - 1) * this.productsPerPage;

      return this.$store.state.productsData.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return this.$store.state.productsData.length;
    }
  },
  created() {
    this.$store.dispatch('getProductsData');
  },
}
</script>
