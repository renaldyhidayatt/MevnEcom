import Vue from 'vue';
import Router, { createWebHistory } from 'vue-router';

import Main from './components/Home/Main.vue';
import Specificitem from './components/Specificitem/Specificitem.vue';
import Cart from './components/Cart/Cart.vue';
import LoginRegister from './components/LoginRegister/LoginRegister.vue';
import UserProfile from './components/UserProfile/UserProfile.vue';
import SearchP from './components/Search/SearchP.vue';
import Admin from './components/Admin/Admin.vue';

import AuthGuard from './Guards/AuthGuard';
import LoginRegGuard from './Guards/LoginGuard';
import AdminGuard from './Guards/AdminGuard';

Vue.use(Router);

export default new Router({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
    },
    {
      path: '/Specificitem',
      name: 'Specificitem',
      component: Specificitem,
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: Cart,
    },
    {
      path: '/LoginRegister',
      name: 'LoginRegister',
      component: LoginRegister,
      beforeEnter: (to, from, next) => {
        LoginRegGuard(to, from, next);
      },
    },
    {
      path: '/UserProfile',
      name: 'UserProfile',
      component: UserProfile,
      beforeEnter: (to, from, next) => {
        AuthGuard(to, from, next);
      },
    },
    {
      path: '/SearchP',
      name: 'SearchP',
      component: SearchP,
    },
    {
      path: '/Admin',
      name: 'Admin',
      component: Admin,
      beforeEnter: (to, from, next) => {
        AdminGuard(to, from, next);
      },
    },
  ],
});
