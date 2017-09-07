import Vue from 'vue';
import App from './components/App.vue';
import Navbar from './components/Navbar.vue';
import Home from './components/Home.vue';
import Polls from './components/Polls.vue';
import ManageQuestions from './components/ManageQuestions.vue';
import Register from './components/Register.vue';
import Login from './components/Login.vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import store from './store/store.js';

Vue.use(VueRouter)

const routes = [
  { path: '/home', component: Home },
  { path: '/polls', component: Polls },
  { path: '/manage_questions', component: ManageQuestions },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '*', redirect: '/home' }
]

export const router = new VueRouter({
  routes
});


const app = new Vue({
  el: '#app',
  store,
  router: router,
  render: h => h(App)
});