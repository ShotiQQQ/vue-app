<template>

  <header class="header container">
    <div class="header__wrapper">
      <span class="header__info">Каталог</span>

      <a class="header__logo" href="#">
        <img src="img/svg/logo-moire.svg" alt="Логотип интернет магазина Moire" width="116" height="34">
      </a>

      <a class="header__tel" href="tel:8 800 600 90 09">
        8 800 600 90 09
      </a>

      <router-link :to="{name: 'basket'}" class="header__cart" aria-label="Корзина с товарами">
        <svg width="19" height="24">
          <use xlink:href="#icon-cart"></use>
        </svg>
        <span class="header__count" aria-label="Количество товаров">{{$store.state.isLoadingBasketProductsData ? '?' : $store.state.basketProductsData.length}}</span>
      </router-link>
    </div>
  </header>

</template>

<script>
export default {

}
</script>
