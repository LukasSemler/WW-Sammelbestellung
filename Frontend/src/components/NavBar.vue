<template>
  <Disclosure as="nav" class="bg-wwGreen" v-slot="{ open }">
    <div
      class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      v-if="
        router.currentRoute.value.path != '/login' &&
        router.currentRoute.value.path != '/register' &&
        router.currentRoute.value.path != '/'
      "
    >
      <div class="flex h-20 items-center justify-between">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img class="block h-16 w-auto lg:hidden" src="/logo3.png" alt="Westwien Logo" />
            <img class="hidden h-16 w-auto lg:block" src="/logo3.png" alt="Westwien Logo" />
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <a
                v-for="item in navigation"
                :key="item.name"
                @click="router.push(item.path)"
                :class="[
                  item.current
                    ? 'bg-wwDarkGreen text-white'
                    : 'text-white hover:bg-wwLightGreen hover:bg-opacity-75',
                  'rounded-md px-3 py-2 text-sm font-medium',
                ]"
                :aria-current="item.current ? 'page' : undefined"
                >{{ item.name }}</a
              >
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6">
            <!-- Profile dropdown -->
            <Menu as="div" class="relative ml-3" v-if="store.getAktivenUser">
              <div>
                <MenuButton
                  class="relative flex items-center rounded-full bg-wwGreen text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-wwDarkGreen"
                >
                  <span class="absolute -inset-1.5" />
                  <span class="sr-only">Open user menu</span>
                  <img class="h-8 w-8 rounded-full" alt="Profilbild" src="logo4.png" />
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <MenuItem
                    v-for="item in userNavigation"
                    @click="store.deleteAktivenUser"
                    :key="item.name"
                    v-slot="{ active }"
                  >
                    <a
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                      >{{ item.name }}</a
                    >
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
            <button
              type="button"
              class="rounded-md bg-wwGray px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-wwDarkGray"
              v-else
              @click="router.push('/login')"
            >
              Login
            </button>
          </div>
        </div>
        <div class="-mr-2 flex md:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md bg-wwGreen p-2 text-indigo-200 hover:bg-wwLightGreen hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-wwDarkGreen"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6 text-wwGray" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6 text-wwGray" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <!--Mobile-Menu-->
    <DisclosurePanel class="md:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          as="a"
          @click="router.push(item.path)"
          :class="[
            item.current
              ? 'bg-wwDarkGreen text-white'
              : 'text-white hover:bg-wwLightGreen hover:bg-opacity-75',
            'block rounded-md px-3 py-2 text-base font-medium',
          ]"
          :aria-current="item.current ? 'page' : undefined"
          >{{ item.name }}</DisclosureButton
        >
      </div>
      <div class="border-t border-wwDarkGreen pb-3 pt-4" v-if="store.getAktiverUser">
        <div class="flex items-center px-5">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" :src="store.getAktiverUser.profilbild_url" alt="" />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-white">
              {{ store.getAktiverUser.vorname }} {{ store.getAktiverUser.nachname }}
            </div>
          </div>
        </div>
        <div class="mt-3 space-y-1 px-2">
          <DisclosureButton
            v-for="item in userNavigation"
            :key="item.name"
            as="a"
            @click="store.deleteAktivenUser"
            class="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-wwLightGreen hover:bg-opacity-75"
            >{{ item.name }}</DisclosureButton
          >
        </div>
      </div>
      <button
        type="button"
        class="rounded-md bg-wwGray px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-wwDarkGray m-5"
        v-else
        @click="router.push('/login')"
      >
        Login
      </button>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import { useRouter } from 'vue-router';
import { westwien } from '../Store/westwienStore.js';

const router = useRouter();
const store = westwien();

const navigation = [
  { name: 'Home', path: '/', current: true },
  { name: 'Produkte', path: '/produkte', current: false },
  { name: 'Warenkorb', path: '/warenkorb', current: false },
  { name: 'FAQ', path: '/faq', current: false },
];

const userNavigation = [{ name: 'Abmelden', href: '/' }];
</script>
