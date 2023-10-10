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
</script>
