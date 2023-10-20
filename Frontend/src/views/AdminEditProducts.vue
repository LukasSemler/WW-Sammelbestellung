<template>
  <div
    aria-live="assertive"
    class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-50"
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
          v-if="showSuccess"
          class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <CheckCircleIcon class="h-6 w-6 text-green-400" aria-hidden="true" />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">Erfolgreich!</p>
                <p class="mt-1 text-sm text-gray-500">Das Produkt wurde erfolgreich geloescht</p>
              </div>
              <div class="ml-4 flex flex-shrink-0">
                <button
                  type="button"
                  @click="showSuccess = false"
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

  <div class="px-4 sm:px-6 lg:px-8 mt-12">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Produkte</h1>
        <p class="mt-2 text-sm text-gray-700">
          Hier können alle Produkte angepasst oder gelöscht werden. Klicke einfach auf das
          dementsprechene Icon bei dem Produkt.
        </p>
      </div>
    </div>

    <!-- --------------------------------------------------------------------------------- -->

    <div class="bg-white mt-8">
      <div class="px-4 text-center sm:px-6 lg:px-8 mt-12">
        <section aria-labelledby="filter-heading" class="border-t border-gray-200 py-6">
          <div class="flex items-center justify-between">
            <button
              type="button"
              class="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
              @click="open = true"
            >
              Filters
            </button>

            <div class="flex flex-row justify-start">
              <PopoverGroup class="hidden sm:flex sm:items-baseline sm:space-x-8 ml-8">
                <Popover as="div" id="`desktop-menu-0`" class="relative inline-block text-left">
                  <div>
                    <PopoverButton
                      class="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                      <span>Farbe</span>

                      <ChevronDownIcon
                        class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </PopoverButton>
                  </div>

                  <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                  >
                    <PopoverPanel
                      class="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <form class="space-y-4">
                        <div
                          v-for="(option, optionIdx) in filters[0].options"
                          :key="option.value"
                          class="flex items-center"
                        >
                          <input
                            v-model="selectedColor"
                            :id="`filter-0-${optionIdx}`"
                            :name="`0[]`"
                            :value="option.value"
                            type="checkbox"
                            class="h-4 w-4 rounded border-gray-300 text-wwGreen focus:ring-wwGreen"
                          />
                          <label
                            :for="`filter-0-${optionIdx}`"
                            class="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                            >{{ option.label }}</label
                          >
                        </div>
                      </form>
                    </PopoverPanel>
                  </transition>
                </Popover>
              </PopoverGroup>

              <PopoverGroup class="hidden sm:flex sm:items-baseline sm:space-x-8 ml-8">
                <Popover as="div" id="`desktop-menu-1`" class="relative inline-block text-left">
                  <div>
                    <PopoverButton
                      class="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                      <span>Kategorie</span>

                      <ChevronDownIcon
                        class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </PopoverButton>
                  </div>

                  <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                  >
                    <PopoverPanel
                      class="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <form class="space-y-4">
                        <div
                          v-for="(option, optionIdx) in filters[1].options"
                          :key="option.value"
                          class="flex items-center"
                        >
                          <input
                            v-model="selectedCategory"
                            :id="`filter-1-${optionIdx}`"
                            :name="`1[]`"
                            :value="option.value"
                            type="checkbox"
                            class="h-4 w-4 rounded border-gray-300 text-wwGreen focus:ring-wwGreen"
                          />
                          <label
                            :for="`filter-1-${optionIdx}`"
                            class="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                            >{{ option.label }}</label
                          >
                        </div>
                      </form>
                    </PopoverPanel>
                  </transition>
                </Popover>
              </PopoverGroup>

              <PopoverGroup class="hidden sm:flex sm:items-baseline sm:space-x-8 ml-8">
                <Popover as="div" id="`desktop-menu-1`" class="relative inline-block text-left">
                  <div>
                    <PopoverButton
                      class="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                      <span>Größen</span>

                      <ChevronDownIcon
                        class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </PopoverButton>
                  </div>

                  <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                  >
                    <PopoverPanel
                      class="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <form class="space-y-4">
                        <div
                          v-for="(option, optionIdx) in filters[2].options"
                          :key="option.value"
                          class="flex items-center"
                        >
                          <input
                            v-model="selectedSize"
                            :id="`filter-2-${optionIdx}`"
                            :name="`2[]`"
                            :value="option.value"
                            type="checkbox"
                            class="h-4 w-4 rounded border-gray-300 text-wwGreen focus:ring-wwGreen"
                          />
                          <label
                            :for="`filter-2-${optionIdx}`"
                            class="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                            >{{ option.label }}</label
                          >
                        </div>
                      </form>
                    </PopoverPanel>
                  </transition>
                </Popover>
              </PopoverGroup>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- --------------------------------------------------------------------------------- -->

    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr class="divide-x divide-gray-200">
                <th
                  scope="col"
                  class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                >
                  Image
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Name
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Preis
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Farbe
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  ID
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Kategorie
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Größen
                </th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-3">
                  <span class="sr-only">Bearbeiten</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr
                v-for="(product, i) in filteredProducts"
                :key="i"
                class="divide-x divide-gray-200 even:bg-gray-50"
              >
                <td
                  class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3"
                >
                  <img :src="product.image" :alt="product.name" class="w-32" />
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 truncate">
                  {{ product.name }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ product.price }}€
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ product.color }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ product.number }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ product.category }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <span
                    v-for="size of product.sizes"
                    class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-800 ring-1 ring-inset ring-green-600/20 mx-1"
                    >{{ size }}</span
                  >
                </td>
                <td
                  class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3"
                >
                  <button
                    @click="router.push(`/adminChangeProduct/${product.p_id}`)"
                    type="button"
                    class="inline-flex items-center gap-x-1.5 rounded-md bg-wwGray px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-wwDarkGray focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wwGray"
                  >
                    <PencilIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
                    Bearbeiten
                  </button>
                  <button
                    @click="deleteProduct(product)"
                    type="button"
                    class="inline-flex items-center gap-x-1.5 rounded-md bg-wwRed px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-wwDarkRed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wwRed mx-2"
                  >
                    <TrashIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
                    Löschen
                  </button>
                </td>
                <td
                  class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3"
                ></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { HomeIcon, TrashIcon, PencilIcon } from '@heroicons/vue/24/outline';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';

const router = useRouter();
const products = ref([]);

const filters = [
  {
    id: 'Farbe',
    name: 'Farbe',
    options: [
      { value: 'Weiß', label: 'Weiß' },
      { value: 'Schwarz', label: 'Schwarz' },
      { value: 'Grün', label: 'Grün' },
      { value: 'Grau', label: 'Grau' },
    ],
  },
  {
    id: 'Kategorie',
    name: 'Kategorie',
    options: [
      { value: 'Casual', label: 'Casual' },
      { value: 'Player', label: 'Player' },
      { value: 'Fans', label: 'Fans' },
    ],
  },
  {
    id: 'Größen',
    name: 'Größen',
    options: [
      { value: '116', label: '116' },
      { value: '128', label: '128' },
      { value: '140', label: '140' },
      { value: '152', label: '152' },
      { value: '164', label: '164' },
      { value: 'S', label: 'S' },
      { value: 'M', label: 'M' },
      { value: 'L', label: 'L' },
      { value: 'XL', label: 'XL' },
      { value: 'XXL', label: 'XXL' },
      { value: '31-35', label: '31-35' },
      { value: '36-40', label: '36-40' },
      { value: '41-45', label: '41-45' },
      { value: '46-50', label: '46-50' },
      { value: 'Keine Größe', label: 'Keine Größe' },
    ],
  },
];

const open = ref([false]);
const showSuccess = ref(false);

let selectedColor = ref([]);
let selectedCategory = ref([]);
let selectedSize = ref([]);

const pages = [
  { name: 'Admin-Panel', href: '/admin', current: false },
  { name: 'Produkte bearbeiten', href: '#', current: true },
];

onMounted(async () => {
  const { data } = await axios.get('/products');
  console.log(data);
  products.value = data;
});

async function deleteProduct(product) {
  try {
    await axios.delete(`/products/${product.p_id}`);

    products.value = products.value.filter((p) => p.p_id != product.p_id);

    showSuccess.value = true;

    setTimeout(() => {
      showSuccess.value = false;
    }, 3000);
  } catch (error) {
    console.log(error);
  }
}

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    // Check if the product matches the selected filters
    const matchesColor =
      selectedColor.value.includes(product.color) || selectedColor.value.length === 0;
    const matchesCategory =
      selectedCategory.value.includes(product.category) || selectedCategory.value.length === 0;

    // Check if at least one selected size is included in the product's array of sizes
    const matchesSize =
      selectedSize.value.length === 0 ||
      selectedSize.value.some((selected) => product.sizes.includes(selected));

    // Return true for products that match all selected filters
    return matchesColor && matchesSize && matchesCategory;
  });
});
</script>
