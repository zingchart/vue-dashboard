 /* eslint-disable */
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

// import the es6 version
import 'zingchart/es6';
// import the component AFTER ZingChart since it is a DIRECT dependency
import zingchartVue from 'zingchart-vue';
Vue.component('zingchart', zingchartVue);

import VCalendar from 'v-calendar';
Vue.use(VCalendar);

import ZingGrid from "zinggrid";

new Vue({
  render: h => h(App),
}).$mount('#app')
