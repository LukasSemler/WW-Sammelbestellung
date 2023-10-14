<template>
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
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

let zeitpunkt = ref(null);

async function setFrist() {
  try {
    await axios.post('/setFrist', { zeitpunkt: zeitpunkt.value });
  } catch (error) {
    console.log(error);
  }
}
</script>
