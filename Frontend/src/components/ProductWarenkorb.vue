<template>
  <div class="flex-shrink-0">
    <img
      :src="props.product.image"
      :alt="props.product.imageAlt"
      class="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
    />
  </div>

  <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
    <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
      <div>
        <div class="flex justify-between">
          <h3 class="text-sm">
            <a :href="props.product.href" class="font-medium text-gray-700 hover:text-gray-800">{{
              props.product.name
            }}</a>
          </h3>
        </div>
        <div class="mt-1 flex text-sm">
          <p class="text-gray-500">{{ props.product.color }}</p>
          <p
            v-if="props.product.actualSize"
            class="ml-4 border-l border-gray-200 pl-4 text-gray-500"
          >
            Größe: {{ props.product.actualSize }}
          </p>
        </div>
        <p class="mt-1 text-sm font-medium text-gray-900">{{ props.product.price }}€</p>
      </div>

      <div class="mt-4 sm:mt-0 sm:pr-9">
        <label :for="`quantity-${productIdx}`" class="sr-only"
          >Anzahl, {{ props.product.name }}</label
        >
        <select
          :id="`quantity-${props.productIdx}`"
          :name="`quantity-${props.productIdx}`"
          v-model="selectedValue"
          class="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-wwGreen focus:outline-none focus:ring-1 focus:ring-wwDarkGreen sm:text-sm"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>

        <div class="absolute right-0 top-0">
          <button
            type="button"
            @click="removeFromCart(product)"
            class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
          >
            <span class="sr-only">Entfernen</span>
            <XMarkIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { XMarkIcon } from '@heroicons/vue/20/solid';

const props = defineProps({
  product: Object,
  productIdx: Number,
});

const emits = defineEmits(['removeFromCart', 'changeAnzahl']);

const selectedValue = ref(props.product.anzahl);

watch(
  () => selectedValue.value,
  (newValue) => {
    props.product.anzahl = newValue;
    emits('changeAnzahl', props.product);
  },
);

function removeFromCart(product) {
  emits('removeFromCart', product);
}
</script>
