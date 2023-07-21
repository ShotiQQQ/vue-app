<template>

  <div>

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
            <img class="main-img" width="570" height="570" :src="colors[0].gallery ? colors[0].gallery[0].file.url : 'images/no-img.png'" :alt="colors[0].gallery ? colors[0].gallery[0].file.originalName : 'Изображение отсутствует'">
          </div>
          <ul class="pics__list">

          <li class="pics__item" v-for="img in getAnotherImgs" :key="img.id">
            <a href="" class="pics__link">
              <img width="98" height="98" :src="img.gallery ? img.gallery[0].file.url : 'images/no-img.png'" :alt="img.gallery ? img.gallery[0].originalName : 'Изображение товара отсутствует'">
            </a>
          </li>

          </ul>
        </div>

        <div class="item__info">
          <span class="item__code">Артикул: {{ productInfo.id }} </span>
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

                    <ColorInputProductInfo v-for="color in productInfo.colors" :key="color.color.id" :id="color.color.id" :backgroundColor="color.color.code" @changeCurrentColor="changeCurrentColor" />

                  </ul>
                </fieldset>


                <fieldset class="form__block">
                  <legend class="form__legend">Размер</legend>
                  <label class="form__label form__label--small form__label--select">
                    <select class="form__select" name="category" v-model="productSize.selected">
                      <option disabled value="">Выберите размер</option>
                      <option :value="size.id" v-for="(size, index) in productSize.options" :key="size.id" :selected="index == 0">{{ size.title }}</option>
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
              <a class="tabs__link" :class="{'tabs__link--current': !isDeliveryContentVisible}" @click="isDeliveryContentVisible = false">
                Информация о товаре
              </a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link" :class="{'tabs__link--current': isDeliveryContentVisible}" @click="isDeliveryContentVisible = true">
                Доставка и возврат
              </a>
            </li>
          </ul>

          <div class="item__content" v-if="!isDeliveryContentVisible">
            <h3>Состав:</h3>

            <p>
              <span v-for="material in productInfo.materials" :key="material.id">{{ material.title }} <br></span>
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

          <div class="item__content" v-else>
            <h3>Доставка:</h3>

            <p>
              1. {{ $store.state.deliveryInfo[1].title }} – {{ $store.state.deliveryInfo[1].price | numberFormat }} ₽<br>
              2. {{ $store.state.deliveryInfo[0].title }}<br>
            </p>

            <h3>Возврат:</h3>

            <p>
              Любой возврат должен быть осуществлен в течение Возвраты в магазине БЕСПЛАТНО.<br>
              Вы можете вернуть товары в любой магазин. Магазин должен быть расположен в стране, в которой Вы осуществили покупку.
              БЕСПЛАТНЫЙ возврат в Пункт выдачи заказов.<br>
              Для того чтобы вернуть товар в одном из наших Пунктов выдачи заказов, позвоните по телефону 8 800 600 90 09<br>
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
import ColorInputProductInfo from "@/components/ColorInputProductInfo.vue";

export default {
  components: {ColorInputProductInfo, Loader, Header, Footer},
  data() {
    return {
      productId: this.$route.params.productId,
      productCount: 1,
      productColor: null,
      productSize: {
        selected: '',
        options: []
      },
      productInfo: {},
      productInfoLoading: false,
      isAddLoading: false,
      isDeliveryContentVisible: false,
      colors: []
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
      if (this.productColor) {
        this.isAddLoading = true;

        axios.
        post(`${API_DEFAULT_URL}api/baskets/products`, {
          productId: +this.productId,
          colorId: this.productColor,
          sizeId: this.productSize.selected,
          quantity: this.productCount,
        }, {
          params: {
            userAccessKey: this.$store.state.userAccessKey
          }
        })
            .then(res => {
              this.$store.dispatch('getBasketProductsData');
              alert('Поздравляем, товар добавлен');
            })
            .catch(error => {
              alert(Object.values(error.response.data.error.request)[0]);
            })
            .finally(() => this.isAddLoading = false);
      } else {
        alert('Пожалуйста, выберите цвет товара');
      }
    },
    changeCurrentColor(id) {
      this.productColor = id;

      this.colors.sort((a, b) => {
        if (a.color.id === id) return -1;
        if (b.color.id === id) return 1;
      })
    },
  },
  filters: {
    numberFormat
  },
  computed: {
    getAnotherImgs() {
      return this.colors.filter((item, index) => {
        return index !== 0;
      })
    }
  },
  created() {
    this.productInfoLoading = true;

    axios.
      get(`${API_DEFAULT_URL}api/products/${this.productId}`)
      .then(res => {
        this.productInfo = res.data;
        this.colors = [...res.data.colors];
        this.productInfoLoading = false;
        this.productSize.options = this.productInfo.sizes;
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

  .tabs__link {
    cursor: pointer;
  }
</style>
