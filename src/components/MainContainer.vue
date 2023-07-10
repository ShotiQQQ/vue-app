<template>

  <main class="content container">

    <div class="content__top">

      <div class="content__row">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info" v-if="$store.state.productsData.length">
          {{ $store.state.productsData.length }} товара
        </span>
      </div>
    </div>

    <div class="content__catalog">

      <slot></slot>

    </div>

  </main>

</template>

<script>
export default {

}
</script>
