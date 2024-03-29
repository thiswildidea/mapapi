// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

import VCharts from 'v-charts';
import ElementUI from 'element-ui';
import echarts from 'echarts';
import $ from "jquery";


import 'normalize.css/normalize.css';

import 'element-ui/lib/theme-chalk/index.css';
import './styles/app/dist/css/calcite-maps-bootstrap-v0.10.css';
import './styles/app/dist/css/calcite-maps-arcgis-412.min-v0.10.css';

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VCharts);
Vue.prototype.$echarts = echarts

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
