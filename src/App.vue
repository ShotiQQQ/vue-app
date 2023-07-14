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
  import axios from "axios";
  import {API_DEFAULT_URL} from "@/config";

  export default {

    components: {Header, Footer},
    created() {
      const userAccessKey = localStorage.getItem('userAccessKey');
      if (userAccessKey) {
        this.$store.commit('updateUserAccessKey', userAccessKey);
        this.$store.dispatch('getBasketProductsData');
      } else {
        axios.
        get(`${API_DEFAULT_URL}api/users/accessKey`)
            .then(res => {
              this.$store.commit('updateUserAccessKey', res.data.accessKey);
              localStorage.setItem('userAccessKey', res.data.accessKey);
            })
      }

      this.$store.dispatch('getDeliveryInfo');
    }
  }
</script>
