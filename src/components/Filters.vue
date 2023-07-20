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
          <select class="form__select" type="text" name="category" v-model="currentCategories.id">
            <option value="0">Все категории</option>
            <option :value="category.id" v-for="category in currentCategories.categories" :key="category.id">{{category.title}}</option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвета</legend>
        <label class="form__label">

          <ul class="colors colors--black" v-if="colors.length">

            <li class="colors__item" v-for="color in colors" :key="color.id">
              <label class="colors__label">
                <input class="colors__radio sr-only" type="checkbox" name="color-item" :value="color.id" v-model="checkedColors">
                <span class="colors__value" :style="{backgroundColor: color.code}"></span>
              </label>
            </li>

          </ul>

        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <ul class="check-list">

          <span v-if="isMaterialsLoading">Пожалуйста, подождите...</span>

          <li class="check-list__item" v-for="material in materials" v-else :key="material.id">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="material" :value="material.id" v-model="checkedMaterials">
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
              <input class="check-list__check sr-only" type="checkbox" name="collection" :value="season.id" v-model="checkedSeasons">
              <span class="check-list__desc">
                    {{ season.title }}
                    <span>({{ season.productsCount }})</span>
                  </span>
            </label>
          </li>

        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit" @click="getFilterProducts">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button" v-if="priceFrom || priceTo || checkedColors.length || currentCategories.id || checkedSeasons.length || checkedMaterials.length" @click="clearFilters">
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
      colors: [],
      checkedColors: [],
      currentCategories: {
        id: 0,
        categories: []
      },
      seasons: [],
      checkedSeasons: [],
      isSeasonsLoading: false,
      materials: [],
      checkedMaterials: [],
      isMaterialsLoading: false,
    }
  },
  methods: {
    getColors() {
      axios.
      get(`${API_DEFAULT_URL}api/colors`)
          .then(res => {
            this.colors = res.data.items;
          })
    },
    getCategories() {
      axios.
        get(`${API_DEFAULT_URL}api/productCategories`)
        .then(res => {
          this.currentCategories.categories = res.data.items;
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
    getFilterProducts() {
      if (this.priceFrom || this.priceTo || this.currentCategories.id || this.checkedColors.length || this.checkedSeasons.length || this.checkedMaterials.length) {
        this.$store.commit('updateLoadingProductsDataStatus');

        axios.
        get(`${API_DEFAULT_URL}api/products`, {
          params: {
            categoryId: this.currentCategories.id,
            'colorIds[]': this.checkedColors,
            'materialIds[]': this.checkedMaterials,
            'seasonIds[]': this.checkedSeasons,
            minPrice: this.priceFrom,
            maxPrice: this.priceTo
          }
        })
          .then(res => {
            this.$store.commit('updateProductsData', res.data.items);
            this.$store.commit('updateLoadingProductsDataStatus');
          })
      }
    },
    clearFilters() {
      if (this.priceFrom || this.priceTo || this.checkedColors.length || this.currentCategories.id || this.checkedSeasons.length || this.checkedMaterials.length) {
        this.priceFrom = null;
        this.priceTo = null;
        this.checkedColors = [];
        this.currentCategories.id = null;
        this.checkedSeasons = [];
        this.checkedMaterials = [];
        this.$store.dispatch('getProductsData');
      }
    }
  },
  created() {
    this.getColors();
    this.getCategories();
    this.getSeasons();
    this.getMaterials();
  }
}
</script>
