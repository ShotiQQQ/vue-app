<template>
  <div id="app">

    <Header />

      <router-view />

    <Footer />

  </div>
</template>

<script>
  import Header from "@/components/Header.vue";
  import Footer from "@/components/Footer.vue";

  export default {
    data() {
      return {
        productsData: this.$store.state.productsData,
      }
    },
    components: {Header, Footer},
  }
</script>
