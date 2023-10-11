<template>
  <!-- Global notification live region, render this permanently at the end of the document -->
  <div
    aria-live="assertive"
    class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
  >
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="show"
          class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <CheckCircleIcon class="h-6 w-6 text-green-400" aria-hidden="true" />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">Erfolgreich hinzugefuegt</p>
                <p class="mt-1 text-sm text-gray-500">
                  Sie haben das Product
                  <span class="text-wwRed">{{ product.name }} </span> erfolgreich zu Ihrem
                  Einkaufswagen hinzugefuegt
                </p>
              </div>
              <div class="ml-4 flex flex-shrink-0">
                <button
                  type="button"
                  @click="show = false"
                  class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>

  <div class="bg-white">
    <div class="pb-16 pt-6 sm:pb-24">
      <div class="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div class="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
          <div class="lg:col-span-5 lg:col-start-8">
            <div class="flex justify-between">
              <h1 class="text-xl font-medium text-gray-900">{{ product.name }}</h1>
              <p class="text-xl font-medium text-gray-900">{{ product.price }}€</p>
            </div>
          </div>

          <!-- Image gallery -->
          <div class="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
            <h2 class="sr-only">Images</h2>

            <div class="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
              <img
                :src="`../../public/${product.image}`"
                :alt="product.name"
                class="lg:col-span-2 lg:row-span-2"
              />
            </div>
          </div>

          <div class="mt-8 lg:col-span-5">
            <!-- Color picker -->
            <div>
              <h2 class="text-md font-medium text-wwRed">TODO Color:</h2>
              <p class="text-sm text-gray-900">{{ product.color }}</p>

              <!-- <RadioGroup v-model="selectedColor" class="mt-2">
                  <RadioGroupLabel class="sr-only">Choose a color</RadioGroupLabel>
                  <div class="flex items-center space-x-3">
                    <RadioGroupOption
                      as="template"
                      v-for="color in product.colors"
                      :key="color.name"
                      :value="color"
                      v-slot="{ active, checked }"
                    >
                      <div
                        :class="[
                          color.selectedColor,
                          active && checked ? 'ring ring-offset-1' : '',
                          !active && checked ? 'ring-2' : '',
                          'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none',
                        ]"
                      >
                        <RadioGroupLabel as="span" class="sr-only">{{
                          color.name
                        }}</RadioGroupLabel>
                        <span
                          aria-hidden="true"
                          :class="[
                            color.bgColor,
                            'h-8 w-8 rounded-full border border-black border-opacity-10',
                          ]"
                        />
                      </div>
                    </RadioGroupOption>
                  </div>
                </RadioGroup> -->
            </div>

            <div class="mt-8">
              <label :for="`quantity-1`" class="text-gray-900">Anzahl: </label>
              <select
                :id="`quantity-1`"
                :name="`quantity-1`"
                v-model="anzahl"
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

            <!-- Size picker -->
            <div class="mt-8">
              <RadioGroup v-model="selectedSize" class="mt-2">
                <RadioGroupLabel class="text-gray-900">Groessen:</RadioGroupLabel>
                <div class="grid grid-cols-3 gap-3 sm:grid-cols-6 mt-3">
                  <RadioGroupOption
                    as="template"
                    v-for="size in product.sizes"
                    :key="size"
                    :value="size"
                    v-slot="{ active, checked }"
                  >
                    <div
                      :class="[
                        'cursor-pointer focus:outline-none',

                        active ? 'ring-2 ring-wwGreen ring-offset-2' : '',
                        checked
                          ? 'border-transparent bg-wwGreen text-white hover:bg-wwDarkGreen'
                          : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50',
                        'flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1',
                      ]"
                    >
                      <RadioGroupLabel as="span">{{ size }}</RadioGroupLabel>
                    </div>
                  </RadioGroupOption>
                </div>
              </RadioGroup>
            </div>

            <button
              @click="addToCart(product)"
              class="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-wwGreen px-8 py-3 text-base font-medium text-white hover:bg-wwDarkGreen focus:outline-none focus:ring-2 focus:ring-wwGreen focus:ring-offset-2"
            >
              Add to cart
            </button>

            <!-- Product details -->
            <div class="mt-10">
              <h2 class="text-sm font-medium text-gray-900">Description</h2>

              <div class="prose prose-sm mt-4 text-gray-500" v-html="product.explaination" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue';
import { CheckCircleIcon } from '@heroicons/vue/24/outline';
import { XMarkIcon } from '@heroicons/vue/20/solid';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { wwStore } from '../store/Store.js';

const router = useRouter();
const store = wwStore();

let anzahl = ref('1');
const product = ref({
  name: 'Basic Tee',
  price: '$35',
  rating: 3.9,
  reviewCount: 512,
  href: '#',
  image: '',
  colors: [{ name: 'Black', bgColor: 'bg-gray-900', selectedColor: 'ring-gray-900' }],
  sizes: ['152', '164', 'S', 'M', 'L', 'XL'],
  description: `
    <p>The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee it's own look.</p>
    <p>Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a bundle discount.</p>
  `,
});

const show = ref(false);

onMounted(async () => {
  const { data } = await axios.get(`/products/${router.currentRoute.value.params.id}`);
  console.log(data);
  product.value = data;
});

// const selectedColor = ref(product.colors[0]);
const selectedSize = ref(product.value.sizes[0]);

function addToCart(product) {
  product.actualSize = selectedSize.value;
  product.anzahl = anzahl.value;
  try {
    //Not the First Item
    let basket = JSON.parse(localStorage.getItem('cart'));
    basket.push(product);
    localStorage.setItem('cart', JSON.stringify(basket));
    store.basket = basket;

    show.value = true;

    setTimeout(() => {
      show.value = false;
    }, 5000);
  } catch (error) {
    //First Time
    let basket = [];

    basket.push(product);
    localStorage.setItem('cart', JSON.stringify(basket));
    store.basket = basket;

    show.value = true;

    setTimeout(() => {
      show.value = false;
    }, 3000);
  }
}
</script>
