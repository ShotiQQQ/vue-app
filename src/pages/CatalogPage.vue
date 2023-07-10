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
import axios from "axios";
import {API_DEFAULT_URL} from "@/config";
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
    const userAccessKey = localStorage.getItem('userAccessKey');
    if (userAccessKey) {
      this.$store.commit('updateUserAccessKey', userAccessKey);
    } else {
      axios.
      get(`${API_DEFAULT_URL}api/users/accessKey`)
          .then(res => {
            this.$store.commit('updateUserAccessKey', res.data.accessKey);
            localStorage.setItem('userAccessKey', res.data.accessKey);
          })
    }

    this.$store.dispatch('getProductsData');
  },
}
</script>
