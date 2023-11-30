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
                <p class="mt-1 text-sm text-gray-500">Die Frist wurde erfolgreich geändert</p>
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
          v-if="showError"
          class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <XCircleIcon class="h-6 w-6 text-wwRed" aria-hidden="true" />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">Fehler!</p>
                <p class="mt-1 text-sm text-gray-500">
                  Leider gab es ein Problem, bitte probiere es nochmal.
                </p>
              </div>
              <div class="ml-4 flex flex-shrink-0">
                <button
                  type="button"
                  @click="showError = false"
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
          v-if="createErrorModal"
          class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <XCircleIcon class="h-6 w-6 text-wwRed" aria-hidden="true" />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">Fehler!</p>
                <p class="mt-1 text-sm text-gray-500">
                  Es ist schon eine Sammelbestellung aktiv ist auf pending, du kannst momentan keine
                  neue erstellen.
                </p>
              </div>
              <div class="ml-4 flex flex-shrink-0">
                <button
                  type="button"
                  @click="createErrorModal = false"
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

  <h1 class="mt-8 text-3xl text-wwDarkGray text-center font-semibold">
    Neue Sammelbestellung erstellen
  </h1>

  <div class="px-4 sm:px-6 lg:px-8" v-if="!openNeueSammelbestellungVisible">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Sammelbestellung</h1>
        <p class="mt-2 text-sm text-gray-700">
          Hier kannst du eine neue Sammelbestellung erstellen. Gib dazu das Datum ein, bis wann die
          Bestellung abgeschlossen sein soll, und wann sie beginnen soll.
        </p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button
          @click="openNeueSammelbestellung"
          type="button"
          class="block rounded-md bg-wwGreen px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-wwDarkGreen"
        >
          Neue Sammelbestellung
        </button>
      </div>
    </div>
    <div class="mt-8 flow-root" v-if="sammelbestellungen.length >= 1">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Nr.
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Von
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Bis
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="s in sammelbestellungen" :key="s.name">
                <td
                  class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
                >
                  {{ s.s_id }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ formartDate(s.von) }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ formartDate(s.bis) }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <span
                    v-if="s.status === 'active'"
                    class="inline-flex items-center rounded-md bg-wwGreen px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-green-600/20"
                    >{{ s.status }}</span
                  >
                  <span
                    v-if="s.status === 'pending'"
                    class="inline-flex items-center rounded-md bg-teal-500 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-green-600/20"
                    >{{ s.status }}</span
                  >
                  <span
                    v-if="s.status === 'over'"
                    class="inline-flex items-center rounded-md bg-wwRed px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-green-600/20"
                    >{{ s.status }}</span
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <h1 class="text-center text-xl mt-12" v-else>Es wurde noch keine erstellt.</h1>
  </div>

  <div v-else>
    <div class="flex flex-row justify-center mt-6">
      <div class="w-96">
        <p class="font-semibold">Beginn der nächsten Bestellung</p>
        <Datepicker v-model="von"></Datepicker>
      </div>
      <div class="ml-5 w-96">
        <p class="font-semibold">Ende der nächsten Bestellung</p>
        <Datepicker v-model="bis"></Datepicker>
      </div>
    </div>
    <div class="flex flex-row justify-center mt-5">
      <button
        @click="setFrist"
        type="button"
        class="rounded-md bg-wwGreen px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-wwDarkGreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wwGreen"
      >
        Erstellen
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { HomeIcon, CheckCircleIcon, XMarkIcon, XCircleIcon } from '@heroicons/vue/24/outline';
import { useRouter } from 'vue-router';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { westwien } from '../Store/westwienStore.js';

const store = westwien();

let von = ref(Date.now());
let bis = ref(null);

const router = useRouter();

let showSuccess = ref(false);
let showError = ref(false);
let openNeueSammelbestellungVisible = ref(false);
let createErrorModal = ref(false);

const pages = [
  { name: 'Admin-Panel', href: '/admin', current: false },
  { name: 'Neue Sammelbestellung erstellen', href: '#', current: true },
];

let sammelbestellungen = ref([]);

onMounted(async () => {
  try {
    //Von prefill
    von.value = new Date();

    await getData();
  } catch (error) {
    console.log(error);
  }
});

async function getData() {
  const { data } = await axios.get('/getSammelbestellungen');
  sammelbestellungen.value = data;
}

function openNeueSammelbestellung() {
  if (sammelbestellungen.length >= 1) {
    //Noch keine Vorhanden, neue Erstellen
    openNeueSammelbestellungVisible.value = true;
  } else {
    //bereits welche vorhanden, schauen ob eine aktiv ist
    const activeSammelbestellung = sammelbestellungen.value.find(
      (s) => s.status === 'active' || s.status === 'pending',
    );
    if (activeSammelbestellung) {
      //Modal einzeigen dass eine aktiv ist und keine neue erstellt werden kann
      createErrorModal.value = true;

      setTimeout(() => {
        createErrorModal.value = false;
      }, 3000);
    } else {
      //Neue Sammelbestellung erstellen
      openNeueSammelbestellungVisible.value = true;
    }
  }
}

async function setFrist() {
  try {
    let vonSenden, bisSenden, statusSenden;
    if (von.value && bis.value) {
      //Check if von is before bis and if von is after today
      if (von.value < bis.value) {
        //Erstelllen da von vor bis kommt
        if (von.value > Date.now()) {
          //Erstellen da "von" nach heute kommt
          vonSenden = von.value;
          bisSenden = bis.value;
          statusSenden = 'pending';
        } else {
          vonSenden = von.value;
          bisSenden = bis.value;
          statusSenden = 'active';
        }

        await axios.post('/setFrist', {
          von: vonSenden,
          bis: bisSenden,
          status: statusSenden,
        });

        openNeueSammelbestellungVisible.value = false;
        showSuccess.value = true;
        von.value = null;
        bis.value = null;

        await getData();

        store.setSammelbestellung(true);

        setTimeout(() => {
          showSuccess.value = false;
        }, 3000);
      } else {
        //ERROR von kommt nach bis
        setTimeout(() => {
          showError.value = false;
        }, 3000);
      }
    } else {
      //ERROR bis Fehlt
      setTimeout(() => {
        showError.value = false;
      }, 3000);
    }
  } catch (error) {
    console.log(error);
    showError.value = true;
    zeitpunkt.value = null;

    setTimeout(() => {
      showError.value = false;
    }, 3000);
  }
}

function formartDate(date) {
  const originalDate = new Date(date);
  const day = String(originalDate.getDate()).padStart(2, '0');
  const month = String(originalDate.getMonth() + 1).padStart(2, '0');
  const year = originalDate.getFullYear();

  const formattedDate = `${day}.${month}.${year}`;

  return formattedDate;
}
</script>
