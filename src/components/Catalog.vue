<template>

  <ul class="catalog__list">

    <li class="catalog__item" v-for="product in products" :key="product.id">
      <a class="catalog__pic" href="#">
        <img :src="product.colors[0].gallery ? product.colors[0].gallery[0].file.url : 'images/no-img.png'" :alt="product.colors[0].gallery ? product.title : 'Изображение товара отсутствует'">
      </a>

      <h3 class="catalog__title">
        <a href="#">
          {{ product.title }}
        </a>
      </h3>

      <span class="catalog__price">
            {{ product.price }} ₽
          </span>

      <ul class="colors colors--black">

        <li class="colors__item" v-for="color in product.colors" :key="color.id">
          <label class="colors__label">
            <input class="colors__radio sr-only" type="radio" :name="'color'  + product.id" :value="color.color.code">
            <span class="colors__value" :style="{ backgroundColor: color.color.code }"></span>
          </label>
        </li>

      </ul>
    </li>

  </ul>

</template>

<script>
export default {
  props: ['products'],
}
</script>
