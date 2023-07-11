<template>

  <div id="app">

    <main class="content container">
      <Loader v-if="productInfoLoading"/>

      <div class="content__top" v-if="!productInfoLoading">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link :to="{name: 'home'}" class="breadcrumbs__link">
              Каталог
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <router-link :to="{name: 'home'}" class="breadcrumbs__link">
              {{ productInfo.category.title }}
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link">
              {{ productInfo.title }}
            </a>
          </li>
        </ul>
      </div>

      <section class="item" v-if="!productInfoLoading">
        <div class="item__pics pics">
          <div class="pics__wrapper">
            <img class="main-img" width="570" height="570" :src="productInfo.colors[0].gallery ? productInfo.colors[0].gallery[0].file.url : 'images/no-img.png'" :alt="productInfo.colors[0].gallery ? productInfo.colors[0].gallery[0].file.originalName : 'Изображение отсутствует'">
          </div>
          <ul class="pics__list">

          <li class="pics__item" v-for="img in productInfo.colors" v-if="productInfo.colors[0].gallery">
            <a href="" class="pics__link">
              <img width="98" height="98" :src="img.gallery[0].file.url" :alt="img.gallery[0].originalName">
            </a>
          </li>

          </ul>
        </div>

        <div class="item__info">
          <span class="item__code">Артикул: {{ productInfo.id}} </span>
          <h2 class="item__title">
            {{ productInfo.title }}
          </h2>
          <div class="item__form">
            <form class="form" action="#" method="POST" @submit.prevent>
              <div class="item__row item__row--center">
                <div class="form__counter">
                  <button type="button" aria-label="Убрать один товар" @click="removeCount">
                    <svg width="12" height="12" fill="currentColor">
                      <use xlink:href="#icon-minus"></use>
                    </svg>
                  </button>

                  <input type="text" :value="productCount" name="count">

                  <button type="button" aria-label="Добавить один товар" @click="addCount">
                    <svg width="12" height="12" fill="currentColor">
                      <use xlink:href="#icon-plus"></use>
                    </svg>
                  </button>
                </div>

                <b class="item__price">
                  {{ productInfo.price | numberFormat }} ₽
                </b>
              </div>

              <div class="item__row">
                <fieldset class="form__block">
                  <legend class="form__legend">Цвет</legend>
                  <ul class="colors colors--black">

                    <li class="colors__item" v-for="color in productInfo.colors">
                      <label class="colors__label">
                        <input class="colors__radio sr-only" type="radio" name="color-item" :value="color.color.id" v-model="productColor">
                        <span class="colors__value" :style="{backgroundColor: color.color.code}">
                      </span>
                      </label>
                    </li>

                  </ul>
                </fieldset>


                <fieldset class="form__block">
                  <legend class="form__legend">Размер</legend>
                  <label class="form__label form__label--small form__label--select">
                    <select class="form__select" type="text" name="category" v-model:value="productSize">
                      <option :value="size.id" v-for="size in productInfo.sizes">{{ size.title }}</option>
                    </select>
                  </label>
                </fieldset>
              </div>

              <button class="item__button button button--primery" type="submit" :disabled="isAddLoading" @click="addProductToBasket">
                <span v-if="!isAddLoading">В корзину</span>
                <span v-else>Подождите...</span>
              </button>
            </form>
          </div>
        </div>

        <div class="item__desc">
          <ul class="tabs">
            <li class="tabs__item">
              <a class="tabs__link tabs__link--current">
                Информация о товаре
              </a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link" href="#">
                Доставка и возврат
              </a>
            </li>
          </ul>

          <div class="item__content">
            <h3>Состав:</h3>

            <p>
              <span v-for="material in productInfo.materials">{{ material.title }} <br></span>
            </p>

            <h3>Уход:</h3>

            <p>
              Машинная стирка при макс. 30ºC короткий отжим<br>
              Гладить при макс. 110ºC<br>
              Не использовать машинную сушку<br>
              Отбеливать запрещено<br>
              Не подвергать химчистке<br>
            </p>

          </div>
        </div>
      </section>
    </main>

  </div>

</template>

<script>
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import axios from "axios";
import {API_DEFAULT_URL} from "@/config";
import Loader from "@/components/Loader.vue";
import numberFormat from "@/helpers/numberFormat";

export default {
  components: {Loader, Header, Footer},
  data() {
    return {
      productId: this.$route.params.productId,
      productCount: 1,
      productColor: null,
      productSize: null,
      productInfo: {},
      productInfoLoading: false,
      isAddLoading: false,
    }
  },
  methods: {
    addCount() {
      this.productCount += 1;
    },
    removeCount() {
      if (this.productCount > 1) {
        this.productCount -= 1;
      }
    },
    addProductToBasket() {
      this.isAddLoading = true;

      axios.
        post(`${API_DEFAULT_URL}api/baskets/products`, {
          productId: +this.productId,
          colorId: this.productColor,
          sizeId: this.productSize,
          quantity: this.productCount,
        }, {
          params: {
            userAccessKey: this.$store.state.userAccessKey
          }
        })
        .then(res => {
          this.$store.dispatch('getBasketProductsData');
        })
        .catch(error => {
          alert(Object.values(error.response.data.error.request)[0]);
        })
        .finally(() => this.isAddLoading = false);
    }
  },
  filters: {
    numberFormat
  },
  created() {
    this.productInfoLoading = true;

    axios.
      get(`${API_DEFAULT_URL}api/products/${this.productId}`)
      .then(res => {
        this.productInfo = res.data;
        this.productInfoLoading = false;
      })
  }
}
</script>
<style scoped>
  .container {
    position: relative;
  }

  .loader {
    transform: translateY(50%);
  }

  .main-img {
    max-height: 570px;
  }
</style>
