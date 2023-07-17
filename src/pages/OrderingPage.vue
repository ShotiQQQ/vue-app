<template>

  <main class="content container">
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

      <div class="content__row">
        <h1 class="content__title">
          Оформление заказа
        </h1>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent>
        <div class="cart__field">
          <div class="cart__data">
            <label class="form__label">
              <input class="form__input" v-model="name.value" type="text" name="name" placeholder="Введите ваше полное имя">
              <span class="form__value">ФИО</span>
              <span class="form__error" v-if="name.errorText">{{ name.errorText }}</span>
            </label>

            <label class="form__label">
              <input class="form__input" v-model="address.value" type="text" name="address" placeholder="Введите ваш адрес">
              <span class="form__value">Адрес доставки</span>
              <span class="form__error" v-if="address.errorText">{{ address.errorText }}</span>
            </label>

            <label class="form__label">
              <input class="form__input" v-model="telephone.value" type="tel" name="phone" placeholder="Введите ваш телефон">
              <span class="form__value">Телефон</span>
              <span class="form__error" v-if="telephone.errorText">{{ telephone.errorText }}</span>
            </label>

            <label class="form__label">
              <input class="form__input" v-model="email.value" type="email" name="email" placeholder="Введи ваш Email">
              <span class="form__value">Email</span>
              <span class="form__error" v-if="email.errorText">{{ email.errorText }}</span>
            </label>

            <label class="form__label">
              <textarea class="form__input form__input--area" name="comments" placeholder="Ваши пожелания"></textarea>
              <span class="form__value">Комментарий к заказу</span>
            </label>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" v-model="delivery" name="delivery" value="1">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" v-model="delivery" name="delivery" value="2">
                  <span class="options__value">
                    Курьером <b v-if="$store.state.deliveryInfo.length">{{ $store.state.deliveryInfo[1].price | numberFormat }} ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" v-model="payment" type="radio" name="pay" value="1">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" v-model="payment" type="radio" name="pay" value="2">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">

            <li class="cart__order" v-for="product in $store.getters.getBasketInfo">
              <h3>{{ product.product.title }}</h3>
              <b>{{ product.product.price | numberFormat }} ₽</b>
              <span>Артикул: {{ product.product.id }}</span>
            </li>

          </ul>

          <div class="cart__total">
            <p>Доставка: <b v-if="$store.state.deliveryInfo.length">{{ $store.state.deliveryInfo[1].price | numberFormat }}</b></p>
            <p>Итого: <b>{{ $store.getters.getBasketInfo.length }}</b> товара на сумму <b>{{ $store.getters.getFullPrice | numberFormat }} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit" :disabled="isLoading" @click="makeOrder">
            <span v-if="isLoading">Подождите...</span>
            <span v-else>Оформить заказ</span>
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="isOrderError">
          <h4>Заявка не отправлена!</h4>
          <p>
            Похоже, произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.
          </p>
        </div>
      </form>
    </section>
  </main>

</template>

<script>
import numberFormat from "../helpers/numberFormat";
import axios from "axios";
import {API_DEFAULT_URL} from "@/config";

export default {
  data() {
    return {
      name: {
        value: '',
        errorText: ''
      },
      address: {
        value: '',
        errorText: ''
      },
      telephone: {
        value: '',
        errorText: ''
      },
      email: {
        value: '',
        errorText: ''
      },
      comment: '',
      delivery: [],
      payment: [],
      isOrderError: false,
      isLoading: false,
    }
  },
  filters: {
    numberFormat
  },
  methods: {
    makeOrder() {
      this.isLoading = true;
      this.isOrderError = false;

      axios.
        post(`${API_DEFAULT_URL}api/orders`, {
          name: this.name.value,
          address: this.address.value,
          phone: this.telephone.value,
          email: this.email.value,
          deliveryTypeId: this.delivery[0],
          paymentTypeId: this.payment[0],
          comment: this.comment
        }, {
          params: {
            userAccessKey: this.$store.state.userAccessKey
          }
        })
        .then(res => {
          this.$router.push({name: 'success-order'});
        })
        .catch(error => {
          const errorPath = error.response.data.error.request;

          this.name.errorText = errorPath.name;
          this.address.errorText = errorPath.address;
          this.telephone.errorText = errorPath.phone;
          this.email.errorText = errorPath.email;

          if (errorPath.deliveryTypeId) {
            alert(`Доставка - ${errorPath.deliveryTypeId}`);
          }

          if (errorPath.paymentTypeId) {
            alert(`Оплата - ${errorPath.paymentTypeId}`);
          }
          this.isOrderError = true;
        })
        .finally(() => this.isLoading = false);
    }
  }
}
</script>
