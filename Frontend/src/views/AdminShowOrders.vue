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

    <div class="w-1/3 mt-12">
      <SwitchGroup as="div" class="flex items-center justify-between">
        <span class="flex flex-grow flex-col">
          <SwitchLabel as="span" class="text-sm font-medium leading-6 text-gray-900" passive
            >Alle Bestellungen anzeigen</SwitchLabel
          >
          <SwitchDescription as="span" class="text-sm text-gray-500"
            >Wenn dies Aktiviert ist, siehst du alle Bestellungen. Sonst siehst du nur die
            Bestellungen von der letzten Sammelbestellung</SwitchDescription
          >
        </span>
        <Switch
          v-model="enabled"
          :class="[
            enabled ? 'bg-wwGreen' : 'bg-gray-200',
            'ml-12 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-wwGreen focus:ring-offset-2',
          ]"
        >
          <span
            aria-hidden="true"
            :class="[
              enabled ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            ]"
          />
        </Switch>
      </SwitchGroup>
    </div>

    <div class="flex justify-start mt-5">
      <div class="flex flex-row justify-center mt-6 mr-5">
        <div class="w-96">
          <p class="font-semibold">Bestellungen ab:</p>
          <Datepicker v-model="ab"></Datepicker>
        </div>
      </div>
      <div class="flex flex-row justify-center mt-6">
        <div class="w-96">
          <p class="font-semibold">Bestellungen bis:</p>
          <Datepicker v-model="bis"></Datepicker>
        </div>
      </div>
    </div>

    <div class="w-56 mt-5">
      <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
      <div class="mt-2">
        <input
          v-model="nameFilter"
          type="text"
          name="name"
          id="name"
          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-wwGreen sm:text-sm sm:leading-6"
          placeholder="Max Mustermann"
        />
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
                  <a class="group inline-flex">
                    Name
                    <span
                      class="ml-2 flex-none rounded text-wwDarkGray bg-gray-200"
                      v-if="sort == 'ASC'"
                      @click="sort = 'DESC'"
                    >
                      <ChevronUpIcon class="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span
                      class="ml-2 flex-none rounded text-wwDarkGray bg-gray-200"
                      @click="sort = 'ASC'"
                      v-else
                    >
                      <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </a>
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
                <!-- <th scope="col" class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                  E-Mail
                </th> -->
                <th scope="col" class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Artikelnummer
                </th>
                <!-- <th scope="col" class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Anzahl
                </th> -->
                <th scope="col" class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Datum d. Bestellung
                </th>
                <th scope="col" class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Größe
                </th>
                <th scope="col" class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Product Name
                </th>
                <th scope="col" class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Bild
                </th>
                <th scope="col" class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Bezahlt
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr
                v-for="(order, idx) in filteredOrders"
                :key="idx"
                :class="[
                  order.o_id % 2 == 0 ? 'bg-gray-100' : 'bg-white',
                  'divide-x divide-gray-200',
                ]"
              >
                <td class="whitespace-nowrap p-4 text-sm font-bold text-gray-900">
                  {{ order.o_id }}
                </td>
                <td class="whitespace-nowrap p-4 text-sm text-gray-500">{{ order.sum }}€</td>
                <td class="whitespace-nowrap p-4 text-sm text-gray-500">{{ order.eltern }}</td>
                <td class="whitespace-nowrap p-4 text-sm text-gray-500">{{ order.spieler }}</td>
                <!-- <td class="whitespace-nowrap p-4 text-sm text-gray-500">{{ order.email }}</td> -->
                <td class="whitespace-nowrap p-4 text-sm text-gray-500">
                  {{ order.productnumber }}
                </td>
                <!-- <td class="whitespace-nowrap p-4 text-sm text-gray-500">
                  {{ order.anzahl }}
                </td> -->
                <td class="whitespace-nowrap p-4 text-sm text-gray-500">
                  {{ new Date(order.zeitpunkt).getDate() }}.{{
                    new Date(order.zeitpunkt).getMonth() + 1
                  }}.{{ new Date(order.zeitpunkt).getFullYear() }}
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
                <td class="whitespace-nowrap p-4 text-sm text-gray-500">
                  <button
                    @click="setOffen(order)"
                    v-if="order.bezahlt"
                    type="button"
                    class="inline-flex items-center gap-x-2 rounded-md bg-wwGreen px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-wwDarkGreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wwGreen"
                  >
                    <CheckCircleIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
                    Bezahlt
                  </button>

                  <button
                    v-else
                    @click="setBezahlt(order)"
                    type="button"
                    class="inline-flex items-center gap-x-2 rounded-md bg-wwRed px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-wwDarkRed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wwRed"
                  >
                    <XCircleIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
                    Offen
                  </button>
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
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import {
  HomeIcon,
  ArrowUpOnSquareIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/vue/24/outline';
import { Switch, SwitchDescription, SwitchGroup, SwitchLabel } from '@headlessui/vue';

const orders = ref([]);
const router = useRouter();
let sort = ref('ASC');
let nameFilter = ref('');
let aktiveSammelbestellung = ref(null);
let enabled = ref(false);

const pages = [
  { name: 'Admin-Panel', href: '/admin', current: false },
  { name: 'Bestellungen ansehen', href: '/adminShowOrders', current: true },
];

let ab = ref(null);
let bis = ref(null);

onMounted(async () => {
  try {
    await getData();
  } catch (error) {
    console.log(error);
  }
});

async function getData() {
  try {
    const { data } = await axios.get('/orders');
    const { data: sammelbestellung } = await axios.get('/getSammelbestellungen');

    console.log(sammelbestellung);

    //Find the latest Sammelbestellung
    for (const s of sammelbestellung) {
      //Find the highest id
      if (!aktiveSammelbestellung.value || s.s_id > aktiveSammelbestellung.value) {
        aktiveSammelbestellung.value = s.s_id;
      }
    }

    orders.value = data;
  } catch (error) {
    console.log(error);
  }
}

async function exportOrders() {
  const { data: csv } = await axios.get(`/exportOrders?von=${ab.value}&bis=${bis.value}`);

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

async function setBezahlt(order) {
  try {
    await axios.patch(`/setBezahlt/${order.o_id}`, { o_id: true });

    getData();
  } catch (error) {
    console.log(error);
  }
}

async function setOffen(order) {
  try {
    await axios.patch(`/setOffen/${order.o_id}`, { o_id: false });

    getData();
  } catch (error) {
    console.log(error);
  }
}

let filteredOrders = computed(() => {
  //Only show orders which lay in between the selected dates
  let result = orders.value;

  if (ab.value && bis.value) {
    result = orders.value.filter((order) => {
      return (
        new Date(order.zeitpunkt) >= new Date(ab.value) &&
        new Date(order.zeitpunkt) <= new Date(bis.value)
      );
    });
  } else if (ab.value && !bis.value) {
    result = orders.value.filter((order) => {
      return new Date(order.zeitpunkt) >= new Date(ab.value);
    });
  } else if (!ab.value && bis.value) {
    result = orders.value.filter((order) => {
      return new Date(order.zeitpunkt) <= new Date(bis.value);
    });
  }

  //Find only orders from the latest Sammelbestellung
  if (!enabled.value) {
    result = result.filter((order) => {
      return order.fk_s_id === aktiveSammelbestellung.value;
    });
  }

  if (sort.value === 'ASC') {
    result = result.sort((a, b) => a.o_id - b.o_id);
  } else {
    result = result.sort((a, b) => b.o_id - a.o_id);
  }

  //Filter by name
  result = result.filter((order) => {
    return !nameFilter.value || order.eltern.toLowerCase().includes(nameFilter.value.toLowerCase());
  });

  return result;
});
</script>
