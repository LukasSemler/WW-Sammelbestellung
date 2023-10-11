<template>
  <div class="bg-white">
    <div>
      <!-- Mobile filter dialog -->
      <TransitionRoot as="template" :show="mobileFiltersOpen">
        <Dialog as="div" class="relative z-40 lg:hidden" @close="mobileFiltersOpen = false">
          <TransitionChild
            as="template"
            enter="transition-opacity ease-linear duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div class="fixed inset-0 z-40 flex">
            <TransitionChild
              as="template"
              enter="transition ease-in-out duration-300 transform"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel
                class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl"
              >
                <div class="flex items-center justify-between px-4">
                  <h2 class="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    class="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                    @click="mobileFiltersOpen = false"
                  >
                    <span class="sr-only">Close menu</span>
                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <!-- Filters -->
                <form class="mt-4">
                  <Disclosure
                    as="div"
                    v-for="section in filters"
                    :key="section.name"
                    class="border-t border-gray-200 pb-4 pt-4"
                    v-slot="{ open }"
                  >
                    <fieldset>
                      <legend class="w-full px-2">
                        <DisclosureButton
                          class="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span class="text-sm font-medium text-gray-900">{{ section.name }}</span>
                          <span class="ml-6 flex h-7 items-center">
                            <ChevronDownIcon
                              :class="[open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform']"
                              aria-hidden="true"
                            />
                          </span>
                        </DisclosureButton>
                      </legend>
                      <DisclosurePanel class="px-4 pb-2 pt-4">
                        <div class="space-y-6">
                          <div
                            v-for="(option, optionIdx) in section.options"
                            :key="option.value"
                            class="flex items-center"
                          >
                            <input
                              :id="`${section.id}-${optionIdx}-mobile`"
                              :name="`${section.id}[]`"
                              :value="option.value"
                              type="checkbox"
                              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              :for="`${section.id}-${optionIdx}-mobile`"
                              class="ml-3 text-sm text-gray-500"
                              >{{ option.label }}</label
                            >
                          </div>
                        </div>
                      </DisclosurePanel>
                    </fieldset>
                  </Disclosure>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>

      <main class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div class="border-b border-gray-200 pb-10">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900">Alle Produkte</h1>
          <p class="mt-4 text-base text-gray-500">
            Hier koennt ihr alle unsere Produkte sehen. Egal ob Casual oder Player, hier findet ihr
            alles. Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit tempora ullam,
            labore iste fugit obcaecati dolores. At repellat accusamus modi, quae ab similique
            quidem cumque mollitia, libero voluptatum, sunt explicabo!
          </p>
        </div>

        <div class="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
          <aside>
            <h2 class="sr-only">Filters</h2>

            <button
              type="button"
              class="inline-flex items-center lg:hidden"
              @click="mobileFiltersOpen = true"
            >
              <span class="text-sm font-medium text-gray-700">Filters</span>
              <PlusIcon class="ml-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            </button>

            <div class="hidden lg:block">
              <form class="space-y-10 divide-y divide-gray-200">
                <div
                  v-for="(section, sectionIdx) in filters"
                  :key="section.name"
                  :class="sectionIdx === 0 ? null : 'pt-10'"
                >
                  <fieldset>
                    <legend class="block text-sm font-medium text-gray-900">
                      {{ section.name }}
                    </legend>
                    <div class="space-y-3 pt-6">
                      <div
                        v-for="(option, optionIdx) in section.options"
                        :key="option.value"
                        class="flex items-center"
                      >
                        <input
                          :id="`${section.id}-${optionIdx}`"
                          :name="`${section.id}[]`"
                          :value="option.value"
                          type="checkbox"
                          class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          :for="`${section.id}-${optionIdx}`"
                          class="ml-3 text-sm text-gray-600"
                          >{{ option.label }}</label
                        >
                      </div>
                    </div>
                  </fieldset>
                </div>
              </form>
            </div>
          </aside>

          <!-- Product grid -->
          <div class="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
            <!-- Your content -->
            <div class="bg-white">
              <div class="mx-auto max-w-7xl overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <div
                  class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8"
                >
                  <a
                    v-for="product in products"
                    :key="product.p_id"
                    class="group text-sm"
                    @click="router.push(`/productdetailview/${product.p_id}`)"
                  >
                    <div
                      class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75"
                    >
                      <img
                        :src="product.image"
                        :alt="product.name"
                        class="h-full w-full object-cover object-center"
                      />
                    </div>
                    <h3 class="mt-4 font-medium text-gray-900">{{ product.name }}</h3>
                    <p class="italic text-gray-500">{{ product.category }}</p>
                    <p class="mt-2 font-medium text-gray-900">{{ product.price }}</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { ChevronDownIcon, PlusIcon } from '@heroicons/vue/20/solid';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const products = ref([]);

onMounted(async () => {
  const { data } = await axios.get('/products');
  console.log(data);
  products.value = data;
});

const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'weiss', label: 'Weiss' },
      { value: 'schwarz', label: 'Schwarz' },
      { value: 'gruen', label: 'Gruen' },
      { value: 'grau', label: 'Grau' },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'casual', label: 'Casual' },
      { value: 'player', label: 'Player' },
      { value: 'fan', label: 'Fans' },
    ],
  },
  {
    id: 'sizes',
    name: 'Sizes',
    options: [
      { value: '152', label: '152' },
      { value: '164', label: '164' },
      { value: 's', label: 'S' },
      { value: 'm', label: 'M' },
      { value: 'l', label: 'L' },
      { value: 'xl', label: 'XL' },
    ],
  },
];

const mobileFiltersOpen = ref(false);

// const products = [
//   {
//     id: 1,
//     name: 'Kempa Team T-Shirt Schwarz',
//     price: '15.09',
//     availability: 'Casual',
//     imageSrc: '/ProductImages/Tshirt1.jpeg',
//     imageAlt: 'White fabric pouch with white zipper, black zipper pull, and black elastic loop.',
//   },
//   {
//     id: 2,
//     name: 'Kempa Core 26 Shirt',
//     price: '23,49',
//     availability: 'Player',
//     imageSrc: '/ProductImages/Tshirt1.jpeg',
//     imageAlt:
//       'Front of tote bag with Player canvas body, black straps, and tan leather handles and accents.',
//   },
//   {
//     id: 3,
//     name: 'Kempa Core 26 Shirt',
//     price: '23,49',
//     availability: 'Player',
//     imageSrc: 'ProductImages/Tshirt1.jpeg',
//     imageAlt:
//       'Front of tote bag with Player canvas body, black straps, and tan leather handles and accents.',
//   },
//   {
//     id: 4,
//     name: 'Kempa Team T-Shirt Schwarz',
//     price: '15.09',
//     availability: 'Casual',
//     imageSrc: 'Tshirt1.jpeg',
//     imageAlt: 'White fabric pouch with white zipper, black zipper pull, and black elastic loop.',
//   },
//   {
//     id: 5,
//     name: 'Kempa Core 26 Shirt',
//     price: '23,49',
//     availability: 'Player',
//     imageSrc: 'T-Shirt2.jpeg',
//     imageAlt:
//       'Front of tote bag with Player canvas body, black straps, and tan leather handles and accents.',
//   },
//   {
//     id: 6,
//     name: 'Kempa Team T-Shirt Schwarz',
//     price: '15.09',
//     availability: 'Casual',
//     imageSrc: 'Tshirt1.jpeg',
//     imageAlt: 'White fabric pouch with white zipper, black zipper pull, and black elastic loop.',
//   },
//   {
//     id: 7,
//     name: 'Kempa Core 26 Shirt',
//     price: '23,49',
//     availability: 'Player',
//     imageSrc: 'T-Shirt2.jpeg',
//     imageAlt:
//       'Front of tote bag with Player canvas body, black straps, and tan leather handles and accents.',
//   },
//   {
//     id: 8,
//     name: 'Kempa Team T-Shirt Schwarz',
//     price: '15.09',
//     availability: 'Casual',
//     imageSrc: 'Tshirt1.jpeg',
//     imageAlt: 'White fabric pouch with white zipper, black zipper pull, and black elastic loop.',
//   },
// ];
</script>
