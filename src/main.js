import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';

//Highcharts required modules
import Highcharts from 'highcharts';
import HighchartsVue from 'highcharts-vue';
import mapInit from 'highcharts/modules/map';

mapInit(Highcharts);
Vue.use(HighchartsVue);

Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
