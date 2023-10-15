<template>
  <div>
    <!-- Navbar -->
    <NavBar />

    <!--MainView-->
    <RouterView />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import { westwien } from './Store/westwienStore.js';
import { onMounted } from 'vue';

const store = westwien();

onMounted(() => {
  if (localStorage.getItem(store.$id)) {
    store.$state = JSON.parse(localStorage.getItem(store.$id));
  }
});
</script>
