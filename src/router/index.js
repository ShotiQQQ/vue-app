import Vue from 'vue'
import VueRouter from 'vue-router'
import CatalogPage from "@/pages/CatalogPage.vue";
import ProductInfoPage from "@/pages/ProductInfoPage.vue";
import BasketPage from "@/pages/BasketPage.vue";
import OrderingPage from "@/pages/OrderingPage.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: CatalogPage
  },
  {
    path: '/product/:productId',
    name: 'product',
    props: true,
    component: ProductInfoPage
  },
  {
    path: '/basket',
    name: 'basket',
    component: BasketPage
  },
  {
    path: '/basket/ordering',
    name: 'ordering',
    component: OrderingPage
  }
]

const router = new VueRouter({
  routes
})

export default router
