import Vue from 'vue'
import VueRouter from 'vue-router'
import CatalogPage from "@/pages/CatalogPage.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: CatalogPage
  },
]

const router = new VueRouter({
  routes
})

export default router
