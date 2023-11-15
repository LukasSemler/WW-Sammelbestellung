<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol role="list" class="flex items-center space-x-4 px-4 sm:px-6 lg:px-8 mt-5">
      <li>
        <div>
          <a href="/" class="text-gray-400 hover:text-gray-500">
            <HomeIcon class="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <span class="sr-only">Home</span>
          </a>
        </div>
      </li>
      <li v-for="page in pages" :key="page.name">
        <div class="flex items-center">
          <svg
            class="h-5 w-5 flex-shrink-0 text-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
          </svg>
          <a
            @click="router.push(page.href)"
            class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
            :aria-current="page.current ? 'page' : undefined"
            >{{ page.name }}</a
          >
        </div>
      </li>
    </ol>
  </nav>

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
          class="pointer-events-auto flex w-full max-w-md divide-x divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div class="flex w-0 flex-1 items-center p-4">
            <div class="w-full">
              <p class="text-sm font-medium text-gray-900">Erfolgreich hinzugefügt</p>
              <p class="mt-1 text-sm text-gray-500">
                Sie haben das Produkt <span class="font-bold">{{ product.name }} </span> erfolgreich
                zu Ihrem Einkaufswagen hinzugefügt.
              </p>
            </div>
          </div>
          <div class="flex">
            <div class="flex flex-col divide-y divide-gray-200">
              <div class="flex h-0 flex-1">
                <button
                  type="button"
                  @click="router.push('/produkte')"
                  class="flex w-full items-center justify-center rounded-none rounded-tr-lg border border-transparent px-4 py-3 text-sm font-medium text-wwGreen hover:text-wwDarkGreen focus:z-10 focus:outline-none focus:ring-2 focus:ring-wwGreen"
                >
                  Weiter Einkaufen
                </button>
              </div>
              <div class="flex h-0 flex-1">
                <button
                  type="button"
                  @click="router.push('/warenkorb')"
                  class="flex w-full items-center justify-center rounded-none rounded-br-lg border border-transparent px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-wwGreen"
                >
                  Zum Warenkorb
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
            <!-- <div class="flex justify-between">
            
            </div> -->
            <h1 class="text-xl font-medium text-gray-900">{{ product.name }}</h1>
            <p class="text-xl font-medium text-gray-900">{{ product.price }}€</p>
          </div>

          <div class="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
            <h2 class="sr-only">Bilder</h2>

            <div class="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
              <img :src="product.image" :alt="product.name" class="lg:col-span-2 lg:row-span-2" />
            </div>
          </div>

          <div class="mt-8 lg:col-span-5">
            <!-- Color picker -->
            <div v-if="colors.length > 0">
              <RadioGroup v-model="selectedColor">
                <RadioGroupLabel class="block text-sm font-medium leading-6 text-gray-900"
                  >Farbe</RadioGroupLabel
                >
                <div class="mt-4 flex items-center space-x-3">
                  <RadioGroupOption
                    as="template"
                    v-for="color in colors"
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
                      <RadioGroupLabel as="span" class="sr-only">{{ color.name }}</RadioGroupLabel>
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
              </RadioGroup>
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
            </div>

            <!-- Size picker -->
            <div class="mt-8" v-if="!product.sizes.includes('Keine Größe')">
              <RadioGroup v-model="selectedSize" class="mt-2">
                <RadioGroupLabel class="text-gray-900">Größen:</RadioGroupLabel>
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
              Zum Warenkorb hinzufügen
            </button>

            <!-- Product details -->
            <div class="mt-10" v-if="product.explaination">
              <h2 class="text-sm font-medium text-gray-900">Beschreibung</h2>

              <div class="prose prose-sm mt-4 text-gray-500" v-html="product.explaination" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue';
import { CheckCircleIcon, HomeIcon } from '@heroicons/vue/24/outline';
import { XMarkIcon } from '@heroicons/vue/20/solid';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { westwien } from '../Store/westwienStore.js';

const router = useRouter();
const store = westwien();

let anzahl = ref('1');
const product = ref({
  name: 'Basic Tee',
  price: '$35',
  rating: 3.9,
  reviewCount: 512,
  href: '#',
  image: '',
  colors: [{ name: 'Black', bgColor: 'bg-gray-900', selectedColor: 'ring-gray-900' }],
  sizes: [''],
  description: `
    <p>The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee it's own look.</p>
    <p>Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a bundle discount.</p>
  `,
  color: 'Schwarz',
});

const colors = ref([
  { name: 'Schwarz', bgColor: 'bg-gray-900', selectedColor: 'ring-wwGray' },
  { name: 'Weiß', bgColor: 'bg-white-100', selectedColor: 'ring-wwGray' },
  { name: 'Grün', bgColor: 'bg-wwGreen', selectedColor: 'ring-wwGray' },
  { name: 'Grau', bgColor: 'bg-wwLightGray', selectedColor: 'ring-wwGray' },
]);

const selectedColor = ref(colors.value[0]);

const currentProduct = computed(() => {
  const name = product.value.name;
  name.replace('"', ' ');
  return product.value.name;
});

const pages = [
  { name: 'Produkte', href: '/produkte', current: false },
  { name: currentProduct, href: router.currentRoute, current: true },
];

const show = ref(false);

onMounted(async () => {
  const { data } = await axios.get(`/products/${router.currentRoute.value.params.id}`);
  console.log(data);
  product.value = data;
  selectedSize.value = product.value.sizes[0];

  colors.value = colors.value.filter((color) => color.name === product.value.color);
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

    store.addProductToWarenkorb(product);

    show.value = true;

    setTimeout(() => {
      show.value = false;
    }, 5000);
  } catch (error) {
    //First Time
    let basket = [];

    basket.push(product);
    localStorage.setItem('cart', JSON.stringify(basket));

    show.value = true;

    setTimeout(() => {
      show.value = false;
    }, 3000);
  }
}
</script>
