<template>

  <li class="catalog__item">
    <router-link :to="{name: 'product', params: {productId: id}}" class="catalog__pic">
      <img :src="currentImg.src" :alt="currentImg.alt">
    </router-link>

    <h3 class="catalog__title">
      <router-link  :to="{name: 'product', params: {productId: id}}">
        {{ title }}
      </router-link>
    </h3>

    <span class="catalog__price">
      {{ price | numberFormat }} ₽
    </span>

    <ul class="colors colors--black">

      <ColorInput v-for="color in colors" :key="color.id" :color="color" @changeCurrentImage="changeCurrentImage" />

    </ul>
  </li>

</template>

<script>
import numberFormat from "../helpers/numberFormat";
import ColorInput from "@/components/ColorInput.vue";

export default {
  components: {ColorInput},
  filters: {numberFormat},
  props: ['id', 'title', 'price', 'colors'],
  data() {
    return {
      currentImg: this.setStartedImage(),
    }
  },
  methods: {
    setStartedImage() {
      return {
        src: this.colors[0].gallery ? this.colors[0].gallery[0].file.url : 'images/no-img.png',
        alt: this.colors[0].gallery ? this.title : 'Изображение товара отсутствует'
      };
    },
    changeCurrentImage(id) {
      this.colors.forEach((item) => {
        if (item.id === id) {
          return this.currentImg = {
            src: item.gallery ? item.gallery[0].file.url : 'images/no-img.png',
            alt: item.gallery ? item.gallery[0].file.name : 'Изображение товара отсутствует'
          }
        }
      })
    }
  },
}
</script>
<!-- colors[0].gallery ? colors[0].gallery[0].file.url : 'images/no-img.png'" :alt="colors[0].gallery ? title : 'Изображение товара отсутствует' -->
