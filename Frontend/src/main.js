import { createApp } from 'vue';
import App from './App.vue';
import './tailwind.css';
import Countdown from 'vue3-flip-countdown';
import { createPinia } from 'pinia';
import router from './router';
import axios from 'axios';

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const app = createApp(App);

//Router
app.use(router);

//Pinia Store
const pinia = createPinia();
app.use(pinia);

//CountdownComponente
app.use(Countdown);

//Axios base-url setzen
if (location.origin === 'http://localhost:8080') {
  axios.defaults.baseURL = 'http://localhost:2410';
}

app.component('Datepicker', Datepicker);

app.mount('#app');
