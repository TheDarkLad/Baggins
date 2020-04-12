import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Notifications from 'vue-notification'

Vue.use(VueRouter)
Vue.use(Notifications)
Vue.prototype.$http = axios

import App from './App.vue'
import Home from './components/BookOverview.vue';
import Edit from './components/BookEditor.vue';

Vue.config.productionTip = false

const id = 0;
const router = new VueRouter({
  routes: [
    { name: 'home', path: '/', component: Home },
    { name: 'add', path: '/add', component: Edit },
    { name: 'edit', path: '/edit/:id', component: Edit, params: { id } },
  ]
})

new Vue({
  el:'#app',
  router,  
  render: h => h(App)
});
