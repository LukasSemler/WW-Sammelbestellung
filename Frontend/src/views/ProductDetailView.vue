<template>
  <div class="bg-white">
    <div class="pb-16 pt-6 sm:pb-24">
      <div class="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div class="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
          <div class="lg:col-span-5 lg:col-start-8">
            <div class="flex justify-between">
              <h1 class="text-xl font-medium text-gray-900">{{ product.name }}</h1>
              <p class="text-xl font-medium text-gray-900">{{ product.price }}€</p>
            </div>
          </div>

          <!-- Image gallery -->
          <div class="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
            <h2 class="sr-only">Images</h2>

            <div class="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
              <img
                :src="`../../public/${product.image}`"
                :alt="product.name"
                class="lg:col-span-2 lg:row-span-2"
              />
            </div>
          </div>

          <div class="mt-8 lg:col-span-5">
            <form>
              <!-- Color picker -->
              <div>
                <h2 class="text-md font-medium text-wwRed">TODO Color:</h2>
                <p class="text-sm text-gray-900">{{ product.color }}</p>

                <!-- <RadioGroup v-model="selectedColor" class="mt-2">
                  <RadioGroupLabel class="sr-only">Choose a color</RadioGroupLabel>
                  <div class="flex items-center space-x-3">
                    <RadioGroupOption
                      as="template"
                      v-for="color in product.colors"
                      :key="color.name"
                      :value="color"
                      v-slot="{ active, checked }"
                    >
                      <div
                        :class="[
                          color.selectedColor,
                          active && checked ? 'ring ring-offset-1' : '',
                          !active && checked ? 'ring-2' : '',
                          'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none',
                        ]"
                      >
                        <RadioGroupLabel as="span" class="sr-only">{{
                          color.name
                        }}</RadioGroupLabel>
                        <span
                          aria-hidden="true"
                          :class="[
                            color.bgColor,
                            'h-8 w-8 rounded-full border border-black border-opacity-10',
                          ]"
                        />
                      </div>
                    </RadioGroupOption>
                  </div>
                </RadioGroup> -->
              </div>

              <!-- Size picker -->
              <div class="mt-8">
                <RadioGroup v-model="selectedSize" class="mt-2">
                  <RadioGroupLabel class="sr-only">Choose a size</RadioGroupLabel>
                  <div class="grid grid-cols-3 gap-3 sm:grid-cols-6">
                    <RadioGroupOption
                      as="template"
                      v-for="size in product.sizes"
                      :key="size"
                      :value="size"
                      v-slot="{ active, checked }"
                    >
                      <div
                        :class="[
                          'cursor-pointer focus:outline-none',

                          active ? 'ring-2 ring-wwGreen ring-offset-2' : '',
                          checked
                            ? 'border-transparent bg-wwGreen text-white hover:bg-wwDarkGreen'
                            : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50',
                          'flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1',
                        ]"
                      >
                        <RadioGroupLabel as="span">{{ size }}</RadioGroupLabel>
                      </div>
                    </RadioGroupOption>
                  </div>
                </RadioGroup>
              </div>

              <button
                type="submit"
                class="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-wwGreen px-8 py-3 text-base font-medium text-white hover:bg-wwDarkGreen focus:outline-none focus:ring-2 focus:ring-wwGreen focus:ring-offset-2"
              >
                Add to cart
              </button>
            </form>

            <!-- Product details -->
            <div class="mt-10">
              <h2 class="text-sm font-medium text-gray-900">Description</h2>

              <div class="prose prose-sm mt-4 text-gray-500" v-html="product.explaination" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {{ router.currentRoute.value.params.id }}
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const product = ref({
  name: 'Basic Tee',
  price: '$35',
  rating: 3.9,
  reviewCount: 512,
  href: '#',
  image: '',
  colors: [{ name: 'Black', bgColor: 'bg-gray-900', selectedColor: 'ring-gray-900' }],
  sizes: ['152', '164', 'S', 'M', 'L', 'XL'],
  description: `
    <p>The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee it's own look.</p>
    <p>Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a bundle discount.</p>
  `,
});

onMounted(async () => {
  const { data } = await axios.get(`/products/${router.currentRoute.value.params.id}`);
  console.log(data);
  product.value = data;
});

// const selectedColor = ref(product.colors[0]);
const selectedSize = ref(product.value.sizes[0]);
</script>
