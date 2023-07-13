<template>

  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{name: 'home'}" class="breadcrumbs__link">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">
          Корзина
        </h1>
        <span class="content__info" v-if="this.$store.getters.getBasketInfo">
          {{ this.$store.getters.getBasketInfo.length }} товара
        </span>
      </div>
    </div>



    <section class="cart">
      <Loader v-if="$store.state.isLoadingBasketProductsData" />

      <form class="cart__form form" action="#" method="POST" @submit.prevent v-else>
        <div class="cart__field">
          <ul class="cart__list">

            <BasketProduct v-for="product in this.$store.getters.getBasketInfo" :img="product.color.gallery ? product.color.gallery[0].file.url : 'images/no-img.png'" :title="product.product.title" :id="product.id" :color="product.color.color.code" :color-name="product.color.color.title" :price="product.price" :quantity="product.quantity" :size="product.size.title" :key="product.id" />

          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ $store.getters.getFullPrice | numberFormat }} ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>

</template>

<script>
import Loader from "@/components/Loader.vue";
import BasketProduct from "@/components/BasketProduct.vue";
import numberFormat from "../helpers/numberFormat";

export default {
  filters: {numberFormat},
  components: {BasketProduct, Loader},
  data() {
    return {
      
    }
  },
}
</script>
<style scoped>
  .cart {
    position: relative;
  }
</style>
