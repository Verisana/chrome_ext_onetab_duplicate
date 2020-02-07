import Vue from 'vue';
import App from './App';

import PortalVue from 'portal-vue';
Vue.use(PortalVue);

import router from './router/main';
import vuetify from '../plugins/vuetify'; // path to vuetify export
import store from '../store';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuetify,
  store,
  render: h => h(App),
});
