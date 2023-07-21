<template>

  <main class="content container" v-if="isLoading">
    <Loader />
  </main>

  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{name: 'home'}" class="breadcrumbs__link" href="index.html">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link :to="{name: 'basket'}" class="breadcrumbs__link" href="cart.html">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ order.id }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ order.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ order.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ order.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ order.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                {{ order.paymentType }}
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">

            <li class="cart__order" v-for="item in order.basket.items" :key="item.id">
              <h3>{{ item.product.title }}</h3>
              <b>{{ item.product.price | numberFormat }} ₽</b>
              <span>Артикул: {{ item.id }}</span>
            </li>

          </ul>

          <div class="cart__total">
            <p>Доставка: <b>{{ +order.deliveryType.price === 0 ? 'бесплатно' : order.deliveryType.price }}</b></p>
            <p>Итого: <b>{{ order.basket.items.length }}</b> товара на сумму <b>{{ order.totalPrice | numberFormat }} ₽</b></p>
          </div>
        </div>
      </form>
    </section>
  </main>

</template>

<script>
import numberFormat from "../helpers/numberFormat";
import axios from "axios";
import {API_DEFAULT_URL} from "@/config";
import Loader from "@/components/Loader.vue";

export default {
  components: {Loader},
  data() {
    return {
      order: [],
      isLoading: false,
    }
  },
  methods: {
    getOrderInfo() {
      this.isLoading = true;
      console.log(this.$route.params.orderId)
      axios.
        get(`${API_DEFAULT_URL}api/orders/${this.$route.params.orderId}`, {
          params: {
            userAccessKey: this.$store.state.userAccessKey
          }
        })
        .then(res => {
          this.order = res.data;
          this.isLoading = false;
        })
    }
  },
  created() {
    this.getOrderInfo()
  },
  filters: {numberFormat},
}
</script>
<style scoped>
  .content {
    position: relative;
  }

  .loader {
    position: relative;
    top: 50%;
  }
</style>
