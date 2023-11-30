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
import axios from 'axios';

const store = westwien();

onMounted(async () => {
  if (localStorage.getItem(store.$id)) {
    store.$state = JSON.parse(localStorage.getItem(store.$id));
  }

  //Check if there is an active Sammelbestellung and if the time is over
  const { data } = await axios.get('/getSammelbestellungen');

  let latest = data[data.length - 1];

  //Check if there is an active Sammelbestellung and if the time is over
  if (latest && latest.status === 'active') {
    let bis = new Date(latest.bis);
    //Check if Time is over and set the status to over
    if (bis < Date.now()) {
      store.setSammelbestellung(false);
      console.log('Sammelbestellung ist vorbei');
      await axios.patch('/frist', { status: 'over', oldStatus: 'active' });
      return;
    }
    store.setSammelbestellung(true);
  } else if (latest && latest.status === 'over') {
    store.setSammelbestellung(false);
  } else if (latest && latest.status === 'pending') {
    //Check if current Time > von
    let von = new Date(latest.von);
    if (von < Date.now()) {
      store.setSammelbestellung(true);
      console.log('Sammelbestellung ist aktiv');
      await axios.patch('/frist', { status: 'active', oldStatus: 'pending' });
    }
  }
});
</script>
