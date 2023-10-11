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
              <div class="flex-shrink-0">
                <img
                  :src="product.image"
                  :alt="product.imageAlt"
                  class="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                />
              </div>

              <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                  <div>
                    <div class="flex justify-between">
                      <h3 class="text-sm">
                        <a
                          :href="product.href"
                          class="font-medium text-gray-700 hover:text-gray-800"
                          >{{ product.name }}</a
                        >
                      </h3>
                    </div>
                    <div class="mt-1 flex text-sm">
                      <p class="text-gray-500">{{ product.color }}</p>
                      <p
                        v-if="product.actualSize"
                        class="ml-4 border-l border-gray-200 pl-4 text-gray-500"
                      >
                        Groesse: {{ product.actualSize }}
                      </p>
                    </div>
                    <p class="mt-1 text-sm font-medium text-gray-900">{{ product.price }}€</p>
                  </div>

                  <div class="mt-4 sm:mt-0 sm:pr-9">
                    <label :for="`quantity-${productIdx}`" class="sr-only"
                      >Quantity, {{ product.name }}</label
                    >
                    <select
                      :id="`quantity-${productIdx}`"
                      :name="`quantity-${productIdx}`"
                      v-model="product.anzahl"
                      class="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-wwGreen focus:outline-none focus:ring-1 focus:ring-wwDarkGreen sm:text-sm"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                    </select>

                    <div class="absolute right-0 top-0">
                      <button
                        type="button"
                        @click="removeFromCart(product)"
                        class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span class="sr-only">Entfernen</span>
                        <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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
import { XMarkIcon } from '@heroicons/vue/20/solid';
import { useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';

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
// const products = [
//   {
//     id: 1,
//     name: 'Kempa Team T-Shirt Schwarz',
//     href: '#',
//     price: '15.09€',
//     availability: 'Casual',
//     imageSrc: 'Tshirt1.jpeg',
//     imageAlt: 'White fabric pouch with white zipper, black zipper pull, and black elastic loop.',
//     color: 'Schwarz',
//   },
//   {
//     id: 2,
//     name: 'Kempa Core 26 Shirt',
//     href: '#',
//     price: '23.49€',
//     availability: 'Player',
//     imageSrc: 'T-Shirt2.jpeg',
//     color: 'Grün',
//     imageAlt:
//       'Front of tote bag with Player canvas body, black straps, and tan leather handles and accents.',
//   },
// ];
</script>
