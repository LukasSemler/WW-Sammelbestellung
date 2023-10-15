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
        <h1 class="text-base font-semibold leading-6 text-gray-900">Bestellungen</h1>
        <p class="mt-2 text-sm text-gray-700">
          Hier kannst du alle Bestellungen sehen und expotieren.
        </p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button
          @click="exportOrders"
          type="button"
          class="inline-flex items-center gap-x-2 rounded-md bg-wwGreen px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-wwDarkGreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wwGreen"
        >
          <ArrowUpOnSquareIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Exportieren
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
                  class="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  OrderNr.
                </th>
                <th scope="col" class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Summe
                </th>
                <th scope="col" class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Name Eltern
                </th>
                <th scope="col" class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Name Spieler
                </th>
                <th scope="col" class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                  E-Mail
                </th>
                <th scope="col" class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Produkt Number
                </th>
                <th scope="col" class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Anzahl
                </th>
                <th scope="col" class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Groesse
                </th>
                <th scope="col" class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Product Name
                </th>
                <th scope="col" class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Bild
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="(order, idx) in orders" :key="idx" class="divide-x divide-gray-200">
                <td class="whitespace-nowrap p-4 text-sm font-bold text-gray-900">
                  {{ order.o_id }}
                </td>
                <td class="whitespace-nowrap p-4 text-sm text-gray-500">{{ order.sum }}</td>
                <td class="whitespace-nowrap p-4 text-sm text-gray-500">{{ order.eltern }}</td>
                <td class="whitespace-nowrap p-4 text-sm text-gray-500">{{ order.spieler }}</td>
                <td class="whitespace-nowrap p-4 text-sm text-gray-500">{{ order.email }}</td>
                <td class="whitespace-nowrap p-4 text-sm text-gray-500">
                  {{ order.productnumber }}
                </td>
                <td class="whitespace-nowrap p-4 text-sm text-gray-500">
                  {{ order.anzahl }}
                </td>
                <td class="whitespace-nowrap p-4 text-sm text-gray-500">
                  {{ order.size }}
                </td>
                <td class="whitespace-nowrap p-4 text-sm text-gray-500">
                  {{ order.name }}
                </td>
                <td class="whitespace-nowrap p-4 text-sm text-gray-500">
                  <img :src="order.previewimage" :alt="order.name" class="h-20" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { HomeIcon, ArrowUpOnSquareIcon } from '@heroicons/vue/24/outline';

const orders = ref([]);
const router = useRouter();

const pages = [
  { name: 'Admin-Panel', href: '/admin', current: false },
  { name: 'Bestellungen ansehen', href: '/adminShowOrders', current: true },
];

onMounted(async () => {
  try {
    const { data } = await axios.get('/orders');

    orders.value = data;
  } catch (error) {
    console.log(error);
  }
});

async function exportOrders() {
  const { data: csv } = await axios.get('/exportOrders');

  downloadCSV(csv, 'orders.csv');
}

function downloadCSV(data, filename) {
  // Create a Blob containing the CSV data
  const blob = new Blob([data], { type: 'text/csv' });

  // Create a temporary URL for the Blob
  const url = window.URL.createObjectURL(blob);

  // Create a link element to trigger the download
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;

  // Trigger a click event on the link to start the download
  link.click();

  // Clean up by revoking the Blob URL
  window.URL.revokeObjectURL(url);
}
</script>
