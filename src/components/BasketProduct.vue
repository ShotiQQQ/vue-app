<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="img" width="120" height="120" alt="Название товара">
    </div>
    <h3 class="product__title">
      {{ title }}
    </h3>
    <p class="product__info product__info--color">
      Цвет:
      <span>
      <i :style="{backgroundColor: color}"></i>
      {{ colorName }}
    </span>
    </p>

    <span>
                Размер: {{ size }}
              </span>
    <span class="product__code">
                Артикул: {{ id }}
              </span>

    <div class="product__counter form__counter">
      <button type="button" aria-label="Убрать один товар" @click="removeCount">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="text" :value="this.productQuantity" name="count">

      <button type="button" aria-label="Добавить один товар" @click="addCount">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price">
      {{ price | numberFormat }} ₽
    </b>

    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины" @click="deleteProduct">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from "../helpers/numberFormat";

export default {
  props: ['img', 'title', 'id', 'color', 'colorName', 'price', 'quantity', 'size'],
  data() {
    return {
      productQuantity: this.quantity,
    }
  },
  filters: {
    numberFormat
  },
  methods: {
    deleteProduct() {
      this.$store.dispatch('deleteProductFromBasket', this.id);
    },
    addCount() {
      this.productQuantity += 1;
      this.$store.dispatch('changeQuantityProductBasket', {id: this.id, quantity: this.productQuantity});
    },
    removeCount() {
      if (this.productQuantity > 1) {
        this.productQuantity -= 1;
        this.$store.dispatch('changeQuantityProductBasket', {id: this.id, quantity: this.productQuantity});
      }
    }
  }
}
</script>
