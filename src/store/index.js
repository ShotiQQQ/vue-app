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
    deliveryInfo: [],
  },
  getters: {
    getBasketInfo(state) {
      return state.basketProductsData
    },
    getFullPrice(state) {
      return state.basketProductsData.reduce((acc, item) => {
        return acc + (item.price * item.quantity)
      }, 0)
    }
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
        state.basketProductsData = [];
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
    updateDeliveryInfo(state, deliveries) {
      state.deliveryInfo = deliveries;
    }
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
        .catch(() => alert('Произошла ошибка при загрузке товаров, попробуйте перезагрузить страницу'));
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
    },
    deleteProductFromBasket(context, payload) {
      axios.
        delete(`${API_DEFAULT_URL}api/baskets/products`, {
          data: {
            basketItemId: payload
          },
          params: {
            userAccessKey: context.state.userAccessKey
          }
        })
        .then(res => {
          context.commit('updateBasketProductsData', res.data.items);
        })
    },
    changeQuantityProductBasket(context, payload) {
      axios.
        put(`${API_DEFAULT_URL}api/baskets/products`, {
          basketItemId: payload.id,
          quantity: payload.quantity
        }, {
          params: {
            userAccessKey: context.state.userAccessKey
          }
        })
        .then(res => {
          context.commit('updateBasketProductsData', res.data.items);
        })
    },
    getDeliveryInfo(context) {
      axios.
      get(`${API_DEFAULT_URL}api/deliveries`)
        .then(res => {
          context.commit('updateDeliveryInfo', res.data);
        })
    }
  },
  modules: {
  }
})
