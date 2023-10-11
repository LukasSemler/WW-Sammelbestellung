<template>
  <h2 class="text-center font-bold text-2xl mt-12">Admin Panel</h2>
  <div class="m-12">
    <ul role="list" class="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
      <li v-for="action in actions" :key="action.name" class="col-span-1 flex rounded-md shadow-sm">
        <div
          :class="[
            action.bgColor,
            'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white',
          ]"
        >
          <span :class="[' text-white inline-flex rounded-lg p-3']">
            <component :is="action.icon" class="h-6 w-6" aria-hidden="true" />
          </span>
        </div>
        <div
          class="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white"
        >
          <div class="flex-1 truncate px-4 py-2 text-sm">
            <a :href="action.href" class="font-medium text-gray-900 hover:text-gray-600">{{
              action.name
            }}</a>
            <p class="text-gray-500">{{ action.members }} Members</p>
          </div>
          <div class="flex-shrink-0 pr-2">
            <button
              type="button"
              class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span class="sr-only">Open options</span>
              <EllipsisVerticalIcon class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {
  EllipsisVerticalIcon,
  TrashIcon,
  PlusIcon,
  WrenchIcon,
  EyeIcon,
} from '@heroicons/vue/20/solid';

const actions = [
  {
    name: 'Neues Produkt erstellen',
    icon: PlusIcon,
    members: 16,
    bgColor: 'bg-pink-600',
  },
  {
    name: 'Vorhandenes Produkt anpassen',
    icon: WrenchIcon,
    members: 12,
    bgColor: 'bg-purple-600',
  },
  {
    name: 'Produkt loeschen',
    icon: TrashIcon,
    members: 16,
    bgColor: 'bg-yellow-500',
  },
  {
    name: 'Bestellungen ansehen',
    icon: EyeIcon,
    members: 8,
    bgColor: 'bg-green-500',
  },
  {
    name: 'Bestellfrist aendern',
    icon: WrenchIcon,
    members: 8,
    bgColor: 'bg-green-500',
  },
];
</script>
