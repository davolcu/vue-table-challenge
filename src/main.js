// Out of the box imports
import Vue from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Custom imports
import Header from './components/Header/Header.vue';
import Main from './components/Main/Main.vue';
import Footer from './components/Footer/Footer.vue';

// Styles for view
import './styles/global.scss';

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

// Add filter to capitalize strings
Vue.filter('capitalize', (value) => {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
});

// Vue instance to create the header component
new Vue({
  render: h => h(Header),
}).$mount('#header');

// Vue instance to create the app component
new Vue({
  render: h => h(Main),
}).$mount('#main');

// Vue instance to create the footer component
new Vue({
  render: h => h(Footer),
}).$mount('#footer');
