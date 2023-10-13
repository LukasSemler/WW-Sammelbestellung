<template>
  <div class="bg-white">
    <!-- Background color split screen for large screens -->
    <div class="fixed left-0 top-0 hidden h-full w-1/2 bg-white lg:block" aria-hidden="true" />
    <div
      class="fixed right-0 top-0 hidden h-full w-1/2 bg-wwDarkGreen lg:block"
      aria-hidden="true"
    />

    <div
      class="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 lg:pt-16"
    >
      <h1 class="sr-only">Checkout</h1>

      <section
        aria-labelledby="summary-heading"
        class="bg-wwGreen py-12 text-gray-200 md:px-10 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:bg-transparent lg:px-0 lg:pb-24 lg:pt-0"
      >
        <div class="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
          <h2 id="summary-heading" class="sr-only">Zu Bezahlen</h2>
          <dl>
            <dt class="text-sm font-medium">zu Bezahlen</dt>
            <dd class="mt-1 text-3xl font-bold tracking-tight text-white">{{ getTotalSum }}€</dd>
          </dl>

          <ul role="list" class="divide-y divide-white divide-opacity-10 text-sm font-medium">
            <li
              v-for="product in products"
              :key="product.id"
              class="flex items-start space-x-4 py-6"
            >
              <img
                :src="product.image"
                :alt="product.name"
                class="h-20 w-20 flex-none rounded-md object-cover object-center"
              />
              <div class="flex-auto space-y-1">
                <h3 class="text-white">{{ product.anzahl }} x {{ product.name }}</h3>
                <p>{{ product.color }}</p>
                <p>{{ product.actualSize }}</p>
              </div>
              <p class="flex-none text-base font-medium text-white">{{ product.price }}€</p>
            </li>
          </ul>

          <dl class="border-white border-opacity-10 pt-6 text-sm font-medium">
            <div
              class="flex items-center justify-between border-t border-white border-opacity-10 pt-6 text-white"
            >
              <dt class="text-base">Total</dt>
              <dd class="text-base">{{ getTotalSum }}€</dd>
            </div>
          </dl>
        </div>
      </section>

      <section
        aria-labelledby="payment-and-shipping-heading"
        class="py-16 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:pb-24 lg:pt-0"
      >
        <h2 id="payment-and-shipping-heading" class="sr-only">Kontaktinformationen</h2>

        <form>
          <div class="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
            <div>
              <h3 id="contact-info-heading" class="text-lg font-medium text-gray-900">
                Kontaktinformationen - Eltern
              </h3>

              <div class="mt-6">
                <label for="email-address" class="block text-sm font-medium text-gray-700"
                  >Email-Adresse</label
                >
                <div class="mt-1">
                  <input
                    type="email"
                    id="email-address"
                    name="email-address"
                    autocomplete="email"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-wwGreen focus:ring-wwGreen sm:text-sm"
                    v-model="state.email"
                  />
                </div>

                <label for="email-address" class="block text-sm font-medium text-gray-700 mt-6"
                  >Telefonnummer</label
                >
                <div class="mt-1">
                  <input
                    type="tel"
                    id="telefonnummer"
                    name="telefonnummer"
                    autocomplete="tel"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-wwGreen focus:ring-wwGreen sm:text-sm"
                    v-model="state.telfonnummer"
                  />
                </div>

                <div class="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                  <div class="col-span-4 sm:col-span-2">
                    <label for="expiration-date" class="block text-sm font-medium text-gray-700"
                      >Vorname</label
                    >
                    <div class="mt-1">
                      <input
                        type="text"
                        name="vornameEltern"
                        id="vornameEltern"
                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-wwGreen focus:ring-wwGreen sm:text-sm"
                        v-model="state.vornameEltern"
                      />
                    </div>
                  </div>

                  <div class="col-span-4 sm:col-span-2">
                    <label for="cvc" class="block text-sm font-medium text-gray-700"
                      >Nachname</label
                    >
                    <div class="mt-1">
                      <input
                        type="text"
                        name="nachnameEltern"
                        id="nachnameEltern"
                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-wwGreen focus:ring-wwGreen sm:text-sm"
                        v-model="state.nachnameEltern"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-10">
              <h3 id="contact-info-heading" class="text-lg font-medium text-gray-900">
                Kontaktinformationen - Spieler
              </h3>

              <div class="mt-6">
                <div class="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                  <div class="col-span-4 sm:col-span-2">
                    <label for="expiration-date" class="block text-sm font-medium text-gray-700"
                      >Vorname</label
                    >
                    <div class="mt-1">
                      <input
                        type="text"
                        name="vornameSpieler"
                        id="vornameSpieler"
                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-wwGreen focus:ring-wwGreen sm:text-sm"
                        v-model="state.vornameSpieler"
                      />
                    </div>
                  </div>

                  <div class="col-span-4 sm:col-span-2">
                    <label for="cvc" class="block text-sm font-medium text-gray-700"
                      >Nachname</label
                    >
                    <div class="mt-1">
                      <input
                        type="text"
                        name="nachnameSpieler"
                        id="nachnameSpieler"
                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-wwGreen focus:ring-wwGreen sm:text-sm"
                        v-model="state.nachnameSpieler"
                      />
                    </div>
                  </div>

                  <div class="col-span-2 sm:col-span-2">
                    <Listbox as="div" v-model="selected">
                      <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900"
                        >Mannschaft</ListboxLabel
                      >
                      <div class="relative mt-2">
                        <ListboxButton
                          class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-wwDarkGreen sm:text-sm sm:leading-6"
                        >
                          <span class="block truncate">{{ selected.name }}</span>
                          <span
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                          >
                            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </span>
                        </ListboxButton>

                        <transition
                          leave-active-class="transition ease-in duration-100"
                          leave-from-class="opacity-100"
                          leave-to-class="opacity-0"
                        >
                          <ListboxOptions
                            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                          >
                            <ListboxOption
                              as="template"
                              v-for="person in jahrgang"
                              :key="person.id"
                              :value="person"
                              v-slot="{ active, selected }"
                            >
                              <li
                                :class="[
                                  active ? 'bg-wwDarkGreen text-white' : 'text-gray-900',
                                  'relative cursor-default select-none py-2 pl-3 pr-9',
                                ]"
                              >
                                <span
                                  :class="[
                                    selected ? 'font-semibold' : 'font-normal',
                                    'block truncate',
                                  ]"
                                  >{{ person.name }}</span
                                >

                                <span
                                  v-if="selected"
                                  :class="[
                                    active ? 'text-white' : 'text-wwDarkGreen',
                                    'absolute inset-y-0 right-0 flex items-center pr-4',
                                  ]"
                                >
                                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                </span>
                              </li>
                            </ListboxOption>
                          </ListboxOptions>
                        </transition>
                      </div>
                    </Listbox>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-10 flex justify-end border-t border-gray-200 pt-6">
              <button
                @click="order"
                class="rounded-md border border-transparent bg-wwGreen px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-wwDarkGreen focus:outline-none focus:ring-2 focus:ring-wwGreen focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Zahlungspflichtig bestellen
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup>
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';
import { ref, onMounted, computed, reactive } from 'vue';
import axios from 'axios';

// const router = useRouter();
const products = ref([]);

const jahrgang = [
  { id: 1, name: 'Wild minis' },
  { id: 2, name: 'U9' },
  { id: 3, name: 'U11' },
  { id: 4, name: 'U12' },
  { id: 5, name: 'U13' },
  { id: 6, name: 'U14' },
  { id: 7, name: 'U15' },
  { id: 8, name: 'U16' },
  { id: 9, name: 'U18' },
  { id: 10, name: 'Future Team' },
  { id: 11, name: 'Trainer' },
];

const selected = ref(jahrgang[3]);
const state = reactive({
  email: '',
  telfonnummer: '',
  vornameEltern: '',
  nachnameEltern: '',
  vornameSpieler: '',
  nachnameSpieler: '',
  summe: null,
  prods: [],
  jahrgang: '',
});

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

async function order(e) {
  e.preventDefault();

  try {
    state.summe = getTotalSum.value;
    state.prods = products.value;
    state.jahrgang = selected.value.name;

    await axios.post('/orders', state);

    localStorage.removeItem('cart');
  } catch (error) {
    console.log(error);
  }
}
</script>