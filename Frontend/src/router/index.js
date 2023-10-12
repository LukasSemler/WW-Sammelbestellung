import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProdukteView from '../views/Produkte.vue';
import WarenkorbView from '../views/WarenkorbView.vue';
import FAQView from '../views/FAQView.vue';
import LoginView from '../views/LoginUserView.vue';
import RegisterView from '../views/RegisterView.vue';
import AdminView from '../views/AdminView.vue';
import CheckoutView from '../views/CheckoutView.vue';
import ProductDetailView from '../views/ProductDetailView.vue';
import OrderConfirmationView from '../views/OrderConfirmationView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/produkte',
      name: 'produkte',
      component: ProdukteView,
    },
    {
      path: '/warenkorb',
      name: 'warenkorb',
      component: WarenkorbView,
    },
    {
      path: '/faq',
      name: 'faq',
      component: FAQView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/admin',
      name: 'adminview',
      component: AdminView,
    },
    {
      path: '/productdetailview/:id',
      name: 'productdetail',
      component: ProductDetailView,
      params: true,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView,
    },
    {
      path: '/orderconfirmation',
      name: 'orderconfirmation',
      component: OrderConfirmationView,
    },
    //{ path: '/:pathmatch(.*)*', name: 'not-found', component: Error404 },
  ],
});

export default router;
