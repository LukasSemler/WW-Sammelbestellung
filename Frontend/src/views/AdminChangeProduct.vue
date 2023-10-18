<template>
  <!-- Global notification live region, render this permanently at the end of the document -->
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
                <p class="mt-1 text-sm text-gray-500">Das Produkt wurde erfolgreich geändert</p>
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
                <XMarkIcon class="h-6 w-6 text-wwRed" aria-hidden="true" />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">Fehler!</p>
                <p class="mt-1 text-sm text-gray-500">
                  Leider ist ein Fehler aufgetreten. Bitte probiere es nochmal
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

  <form class="mb-8">
    <div class="flex flex-row justify-end mt-8 mr-8">
      <button
        @click="changeProduct"
        type="button"
        class="rounded-md bg-wwGreen px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-wwDarkGreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wwGreen"
      >
        Ändern
      </button>
    </div>
    <div class="flex flex-row">
      <div class="w-1/3 ml-12">
        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="col-span-full">
            <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900"
              >Produkt Bild</label
            >
            <div
              class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
            >
              <div v-if="!image" class="space-y-1 text-center">
                <svg
                  class="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div class="flex text-sm text-gray-600">
                  <label
                    for="thumbnail"
                    class="relative cursor-pointer bg-white rounded-md font-medium text-wwGreen hover:text-wwDarkGreen focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-wwGreen"
                  >
                    <span class="text-center text-wwGreen">Bild hochladen</span>
                    <input
                      id="thumbnail"
                      name="thumbnail"
                      type="file"
                      class="sr-only"
                      @change="onFileChanged"
                      accept="image/*"
                    />
                  </label>
                </div>
                <p class="text-xs text-gray-500">PNG, JPG, JPEG</p>
              </div>
              <div v-else>
                <div class="flex justify-center">
                  <img
                    crossorigin="anonymous"
                    class="object-scale-down h-48 w-96 mt-3"
                    :src="image"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div v-if="image" class="flex justify-center">
              <button
                @click="image = null"
                type="button"
                class="mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-wwRed hover:bg-wwDarkRed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wwRed"
              >
                <TrashIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Bild entfernen
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="w-2/3 mr-8 ml-48">
        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="col-span-full">
            <label for="name" class="block text-sm font-medium leading-6 text-gray-900"
              >Name des Produkts</label
            >
            <div class="mt-2">
              <input
                v-model="state.name"
                type="text"
                name="name"
                id="name"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-wwGreen sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="col-span-full">
            <label for="nummer" class="block text-sm font-medium leading-6 text-gray-900"
              >Artikelnummer</label
            >
            <div class="mt-2">
              <input
                v-model="state.artikelNummer"
                type="text"
                name="nummer"
                id="nummer"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-wwGreen sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:col-span-2">
            <Listbox as="div" v-model="selectedColor">
              <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900"
                >Farbe des Produkts</ListboxLabel
              >
              <div class="relative mt-2">
                <ListboxButton
                  class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-wwGreen sm:text-sm sm:leading-6"
                >
                  <span class="flex items-center">
                    <div
                      v-if="selectedColor.color != 'none'"
                      :class="[
                        selectedColor.color,
                        'h-5 w-5 flex-shrink-0 rounded-full border-2 border-gray-900',
                      ]"
                    />
                    <span class="ml-3 block truncate">{{ selectedColor.name }}</span>
                  </span>
                  <span
                    class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2"
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
                    class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    <ListboxOption
                      as="template"
                      v-for="color in colors"
                      :key="color.id"
                      :value="color"
                      v-slot="{ active, selectedColor }"
                    >
                      <li
                        :class="[
                          active ? 'bg-wwGreen text-white' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-3 pr-9',
                        ]"
                      >
                        <div class="flex items-center">
                          <div
                            v-if="color.color != 'none'"
                            :class="[
                              color.color,
                              'h-5 w-5 flex-shrink-0 rounded-full border-2 border-gray-900',
                            ]"
                          />
                          <span
                            :class="[
                              selectedColor ? 'font-semibold' : 'font-normal',
                              'ml-3 block truncate',
                            ]"
                            >{{ color.name }}</span
                          >
                        </div>

                        <span
                          v-if="selectedColor"
                          :class="[
                            active ? 'text-white' : 'text-wwGreen',
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

          <div class="sm:col-span-2">
            <Listbox as="div" v-model="selectedCategory">
              <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900"
                >Kategorie</ListboxLabel
              >
              <div class="relative mt-2">
                <ListboxButton
                  class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-wwGreen sm:text-sm sm:leading-6"
                >
                  <span class="flex items-center">
                    <span class="ml-3 block truncate">{{ selectedCategory.name }}</span>
                  </span>
                  <span
                    class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2"
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
                    class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    <ListboxOption
                      as="template"
                      v-for="category in categories"
                      :key="category.id"
                      :value="category"
                      v-slot="{ active, selectedCategory }"
                    >
                      <li
                        :class="[
                          active ? 'bg-wwGreen text-white' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-3 pr-9',
                        ]"
                      >
                        <div class="flex items-center">
                          <span
                            :class="[
                              selectedCategory ? 'font-semibold' : 'font-normal',
                              'ml-3 block truncate',
                            ]"
                            >{{ category.name }}</span
                          >
                        </div>

                        <span
                          v-if="selectedCategory"
                          :class="[
                            active ? 'text-white' : 'text-wwGreen',
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

          <div class="col-span-2">
            <label for="street-address" class="block text-sm font-medium leading-6 text-gray-900"
              >Preis</label
            >
            <div class="relative mt-2 rounded-md shadow-sm">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span class="text-gray-500 sm:text-sm">€</span>
              </div>
              <input
                v-model="state.preis"
                type="text"
                name="price"
                id="price"
                class="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-wwGreen sm:text-sm sm:leading-6"
                placeholder="0.00"
                aria-describedby="price-currency"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span class="text-gray-500 sm:text-sm" id="price-currency">EUR</span>
              </div>
            </div>
          </div>

          <div class="sm:col-span-4">
            <fieldset>
              <legend class="text-base font-semibold leading-6 text-gray-900">Groessen</legend>
              <div class="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
                <div
                  v-for="(size, sizeIdx) in sizes"
                  :key="sizeIdx"
                  class="relative flex items-start py-4"
                >
                  <div class="min-w-0 flex-1 text-sm leading-6">
                    <label :for="`size-${size.id}`" class="select-none font-medium text-gray-900">{{
                      size.name
                    }}</label>
                  </div>
                  <div class="ml-3 flex h-6 items-center">
                    <input
                      v-model="state.groessen"
                      :id="`size-${size.id}`"
                      :name="`size-${size.id}`"
                      :value="size.name"
                      type="checkbox"
                      class="h-4 w-4 rounded border-gray-300 text-wwGreen focus:ring-wwGreen"
                    />
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { TrashIcon, HomeIcon, CheckCircleIcon } from '@heroicons/vue/24/outline';
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon, XMarkIcon } from '@heroicons/vue/20/solid';
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const showSuccess = ref(false);
const showError = ref(false);

const router = useRouter();

const state = reactive({
  name: '',
  artikelNummer: '',
  farbe: '',
  preis: null,
  groessen: [],
  imageSchicken: null,
});

const pages = [
  { name: 'Admin-Panel', href: '/admin', current: false },
  { name: 'Produkte bearbeiten/löschen', href: '/adminEditProducts', current: false },
  { name: 'Bearbeiten', href: router.currentRoute, current: true },
];

onMounted(async () => {
  await getData();
});

async function getData() {
  try {
    const { data } = await axios.get(`/products/${router.currentRoute.value.params.id}`);
    console.log(data);

    state.name = data.name;
    state.artikelNummer = data.number;
    state.preis = data.price;
    selectedCategory.value = categories.find((category) => category.name === data.category);
    selectedColor.value = colors.find((color) => color.name === data.color);
    image.value = data.image;
    state.groessen = data.sizes;
  } catch (error) {
    console.log(error);
    showError.value = true;

    setTimeout(() => (showError.value = false), 3000);
  }
}

const colors = [
  { id: 1, name: 'Schwarz', color: 'bg-black' },
  { id: 2, name: 'Grün', color: 'bg-wwGreen' },
  { id: 3, name: 'Grau', color: 'bg-wwLightGray' },
  { id: 4, name: 'Weiss', color: 'bg-white' },
  { id: 5, name: 'Keine Farbe', color: 'none' },
];

const categories = [
  { id: 1, name: 'Casual' },
  { id: 2, name: 'Player' },
  { id: 3, name: 'Fan' },
];

const sizes = [
  { id: 1, name: '116' },
  { id: 2, name: '140' },
  { id: 3, name: '128' },
  { id: 4, name: '152' },
  { id: 5, name: '164' },
  { id: 6, name: 'S' },
  { id: 7, name: 'M' },
  { id: 8, name: 'L' },
  { id: 9, name: 'XL' },
  { id: 10, name: 'XXL' },
  { id: 11, name: '31-35' },
  { id: 12, name: '36-40' },
  { id: 13, name: '41-45' },
  { id: 14, name: '46-50' },
  { id: 15, label: 'Keine Größe' },
];

const selectedColor = ref(colors[0]);
const selectedCategory = ref(categories[0]);

let image = ref(null);

//Bild hochladen
function onFileChanged(event) {
  {
    // Reference to the DOM input element
    let input = event.target;
    state.imageSchicken = event.target.files[0];

    const name = state.imageSchicken.name;

    if (name.includes('.jpg')) {
      state.imageSchicken.datentyp = 'jpg';
    } else if (name.includes('.png')) {
      state.imageSchicken.datentyp = 'png';
    } else if (name.includes('.jpeg')) {
      state.imageSchicken.datentyp = 'jpeg';
    } else {
      console.log('IMAGE-DATENTYP NICHT ZULÄSSIG');
    }

    // Ensure that you have a file before attempting to read it
    if (input.files && input.files[0]) {
      // create a new FileReader to read this image and convert to base64 format
      let reader = new FileReader();
      // Define a callback function to run, when FileReader finishes its job
      reader.onload = (e) => {
        // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
        // Read image as base64 and set to imageData
        image.value = e.target.result;
      };
      // Start the reader job - read file as a data url (base64 format)
      reader.readAsDataURL(input.files[0]);
    }
  }
}

async function changeProduct() {
  try {
    if (state.imageSchicken == null) {
      state.linkImage = image.value;
      await sendData();
    } else {
      await sendImage();
      state.linkImage = `/images/${state.name}.${state.imageSchicken.datentyp}`;
      await sendData();
    }

    showSuccess.value = true;
    await getData();

    setTimeout(() => (showSuccess.value = false), 3000);
  } catch (error) {
    console.log(error);
    showError.value = true;

    setTimeout(() => (showError.value = false), 3000);
  }
}

//Daten + Bild an Backend schicken
async function sendImage() {
  try {
    //FormData bauen
    let formData = new FormData();
    formData.append('image', state.imageSchicken);
    formData.append('titel', state.name);
    formData.append('datentyp', state.imageSchicken.datentyp);

    //an server schicken
    await axios.post(`/productImage`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return true;
  } catch (error) {
    console.log(error.message);
    showError.value = true;

    setTimeout(() => (showError.value = false), 3000);

    return false;
  }
}

//Sendet eingegebenen Daten an den Server, der diese dann in der DB speichert
async function sendData() {
  try {
    state.farbe = selectedColor.value.name;
    state.category = selectedCategory.value;
    let { status } = await axios.patch(`/products/${router.currentRoute.value.params.id}`, state);

    return true;
  } catch (error) {
    console.log(error);
    showError.value = true;

    setTimeout(() => (showError.value = false), 3000);
  }
}
</script>
