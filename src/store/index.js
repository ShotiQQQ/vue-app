import Vue from 'vue'
import Vuex from 'vuex'
import {API_DEFAULT_URL} from "@/config";
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userAccessKey: null,
    productsData: [],
    isLoadingProductsData: false,
    basketProductsData: [],
    isLoadingBasketProductsData: false,
  },
  getters: {
  },
  mutations: {
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateProductsData(state, products) {
      state.productsData = products;
    },
    updateBasketProductsData(state, products) {
      if (!products) {
        return [];
      } else {
        state.basketProductsData = products;
      }
    },
    updateLoadingProductsDataStatus(state) {
      state.isLoadingProductsData = !state.isLoadingProductsData;
    },
    updateLoadingBasketDataStatus(state) {
      state.isLoadingBasketProductsData = !state.isLoadingBasketProductsData;
    },
  },
  actions: {
    getProductsData(context) {
      context.commit('updateLoadingProductsDataStatus');

      axios.
        get(`${API_DEFAULT_URL}api/products`, {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
        .then(res => {
          context.commit('updateProductsData', res.data.items);
          context.commit('updateLoadingProductsDataStatus');
        })
    },
    getBasketProductsData(context) {
      context.commit('updateLoadingBasketDataStatus');

      axios.
      get(`${API_DEFAULT_URL}api/baskets`, {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
        .then(res => {
          context.commit('updateBasketProductsData', res.data.items);
          context.commit('updateLoadingBasketDataStatus');
        })
    }
  },
  modules: {
  }
})
