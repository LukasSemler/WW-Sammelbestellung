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

  <h1 class="mt-8 text-3xl text-wwDarkGray text-center font-semibold">
    Zeitpunkt der naechsten Sammelbestellung setzen
  </h1>

  <div class="flex flex-row justify-center mt-6">
    <div class="w-96">
      <p class="font-semibold">Datum der naechsten Bestellung:</p>
      <Datepicker v-model="zeitpunkt"></Datepicker>
    </div>
  </div>
  <div class="flex flex-row justify-center mt-5">
    <button
      @click="setFrist"
      type="button"
      class="rounded-md bg-wwGreen px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-wwDarkGreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wwGreen"
    >
      Speichern
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { HomeIcon } from '@heroicons/vue/24/outline';
import { useRouter } from 'vue-router';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

let zeitpunkt = ref(null);
const router = useRouter();

const pages = [
  { name: 'Admin-Panel', href: '/admin', current: false },
  { name: 'Bestellzeitpunkt setzen', href: '#', current: true },
];

async function setFrist() {
  try {
    await axios.post('/setFrist', { zeitpunkt: zeitpunkt.value });
  } catch (error) {
    console.log(error);
  }
}
</script>
