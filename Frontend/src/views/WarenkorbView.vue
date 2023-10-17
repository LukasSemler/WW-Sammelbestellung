<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Warenkorb</h1>
      <form
        class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16"
        v-if="products.length > 0"
      >
        <section aria-labelledby="cart-heading" class="lg:col-span-7">
          <h2 id="cart-heading" class="sr-only">Ihre Artikel in Ihrem Warenkorb</h2>

          <ul role="list" class="divide-y divide-gray-200 border-b border-t border-gray-200">
            <li
              v-for="(product, productIdx) in products"
              :key="product.id"
              class="flex py-6 sm:py-10"
            >
              <ProductWarenkorb
                :product="product"
                :productIdx="productIdx"
                @changeAnzahl="changeAnzahl"
                @removeFromCart="removeFromCart"
              ></ProductWarenkorb>
            </li>
          </ul>
        </section>

        <!-- Order summary -->
        <section
          aria-labelledby="summary-heading"
          class="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
        >
          <h2 id="summary-heading" class="text-lg font-medium text-gray-900">Zusammenfassung</h2>

          <dl class="mt-6 space-y-4">
            <div class="flex items-center justify-between">
              <dt class="text-sm text-gray-600">Subtotal</dt>
              <dd class="text-sm font-medium text-gray-900">{{ getTotalSum }}€</dd>
            </div>
            <div class="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt class="text-base font-medium text-gray-900">Gesamt</dt>
              <dd class="text-base font-medium text-gray-900">{{ getTotalSum }}€</dd>
            </div>
          </dl>

          <div class="mt-6">
            <button
              @click="router.push('/checkout')"
              class="w-full rounded-md border border-transparent bg-wwGreen px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-wwDarkGreen focus:outline-none focus:ring-2 focus:ring-wwGreen focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Zum Checkout
            </button>
          </div>
        </section>
      </form>
      <h1 class="text-center text-gray-900 text-2xl font-medium mt-12" v-else>
        Ihr Warenkorb ist leider leer :(
      </h1>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted, computed, watch } from 'vue';
import ProductWarenkorb from '@/components/ProductWarenkorb.vue';

const router = useRouter();
const products = ref([]);

onMounted(() => {
  try {
    //Try to get Items from the basket
    const basket = JSON.parse(localStorage.getItem('cart'));
    if (basket) {
      //Basket is not Empty
      console.log(basket);
      products.value = basket;
    }
  } catch (error) {
    console.log(error);
  }
});

const getTotalSum = computed(() => {
  let sum = 0;
  products.value.forEach((product) => {
    sum += product.anzahl * Number(product.price);
  });
  return sum.toFixed(2);
});

function removeFromCart(product) {
  const index = products.value.indexOf(product);
  products.value.splice(index, 1);
  localStorage.removeItem('cart');
  localStorage.setItem('cart', JSON.stringify(products.value));
}

function changeAnzahl(product) {
  const index = products.value.indexOf(product);
  products.value[index].anzahl = product.anzahl;
  localStorage.removeItem('cart');
  localStorage.setItem('cart', JSON.stringify(products.value));
}
</script>
