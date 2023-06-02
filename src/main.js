import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

import ZingChartVue from 'zingchart-vue';
app.component('ZingChart', ZingChartVue);

import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
app.component('VDatePicker', DatePicker);

import ZingGrid from 'zinggrid';

app.mount('#app');