import Vue from 'vue'
import VueRouter from 'vue-router'
import CatalogPage from "@/pages/CatalogPage.vue";
import ProductInfoPage from "@/pages/ProductInfoPage.vue";

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
]

const router = new VueRouter({
  routes
})

export default router
