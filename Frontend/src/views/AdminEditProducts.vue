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

  <div class="px-4 sm:px-6 lg:px-8 mt-12">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Produkte</h1>
        <p class="mt-2 text-sm text-gray-700">
          Hier können alle Produkte angepasst oder gelöscht werden. Klicke einfach auf das
          dementsprechene Icon bei dem Produkt.
        </p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button
          type="button"
          class="inline-flex items-center gap-x-2 rounded-md bg-wwGreen px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-wwDarkGreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wwGreen"
        >
          <ArrowDownTrayIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Herunterladen
        </button>
      </div>
    </div>

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
                  Grössen
                </th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr
                v-for="(product, i) in products"
                :key="i"
                class="divide-x divide-gray-200 even:bg-gray-50"
              >
                <td
                  class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3"
                >
                  <img :src="product.image" :alt="product.name" class="w-32" />
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ product.name }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ product.price }}
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
import { ref, onMounted } from 'vue';
import { ArrowDownTrayIcon, HomeIcon, TrashIcon, PencilIcon } from '@heroicons/vue/24/outline';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const products = ref([]);

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
  } catch (error) {
    console.log(error);
  }
}
</script>
