<template>

  <aside class="filter">
    <form class="filter__form form" action="#" method="get" @submit.prevent>
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="min-price" v-model:value="priceFrom">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price" v-model:value="priceTo">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select class="form__select" type="text" name="category">
            <option value="value1">Все категории</option>
            <option :value="category.id" v-for="category in categories" :key="category.id">{{category.title}}</option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <ul class="check-list">

          <span v-if="isMaterialsLoading">Пожалуйста, подождите...</span>

          <li class="check-list__item" v-for="material in materials" v-else :key="material.id">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="material" value="лен">
              <span class="check-list__desc">
                    {{ material.title }}
                    <span>({{ material.productsCount }})</span>
                  </span>
            </label>
          </li>

        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <ul class="check-list">

          <span v-if="isSeasonsLoading">Пожалуйста, подождите...</span>

          <li class="check-list__item" v-for="season in seasons" :key="season.id">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="collection" :value="season.title">
              <span class="check-list__desc">
                    {{ season.title }}
                    <span>({{ season.productsCount }})</span>
                  </span>
            </label>
          </li>

        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit" @click="filterProducts">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button" @click="clearFilters">
        Сбросить
      </button>
    </form>
  </aside>

</template>

<script>
import {API_DEFAULT_URL} from "@/config";
import axios from "axios";

export default {
  data() {
    return {
      priceFrom: null,
      priceTo: null,
      categories: [],
      categoryId: null,
      seasons: [],
      isSeasonsLoading: false,
      materials: [],
      isMaterialsLoading: false,
    }
  },
  methods: {
    getCategories() {
      axios.
        get(`${API_DEFAULT_URL}api/productCategories`)
        .then(res => {
          this.categories = res.data.items;
        })
    },
    getSeasons() {
      this.isSeasonsLoading = true;
      axios.
      get(`${API_DEFAULT_URL}api/seasons`)
          .then(res => {
            this.seasons = res.data.items;
            this.isSeasonsLoading = false;
          })
    },
    getMaterials() {
      this.isMaterialsLoading = true;
      axios.
      get(`${API_DEFAULT_URL}api/materials`)
          .then(res => {
            this.materials = res.data.items;
            this.isMaterialsLoading = false;
          })
    },
    filterProducts() {
      console.log(this.$store.state.productsData)
      if (this.priceFrom > 0) {
        this.$store.commit('updateProductsData', this.$store.state.productsData.filter(product => product.price > this.priceFrom));
      }

      if (this.priceTo > 0) {
        this.$store.commit('updateProductsData', this.$store.state.productsData.filter(product => product.price < this.priceTo));
      }

      if (this.categoryId) {
        this.$store.commit('updateProductsData', this.$store.state.productsData.filter(product => product.categoryId === this.categoryId));
      }
    },
    clearFilters() {
      this.priceFrom = null;
      this.priceTo = null;
    }
  },
  created() {
    this.getCategories();
    this.getSeasons();
    this.getMaterials();
  }
}
</script>
