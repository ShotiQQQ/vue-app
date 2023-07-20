<template>

  <ul class="catalog__list">

    <CatalogProduct v-for="product in products" :key="product.id" :colors="product.colors" :price="product.price" :id="product.id" :title="product.title"/>

  </ul>

</template>

<script>
import CatalogProduct from "@/components/CatalogProduct.vue";

export default {
  components: {CatalogProduct},
  props: ['products'],
}
</script>
