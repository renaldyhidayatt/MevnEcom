import Vuex from 'vuex';
import Vue from 'vue';
import Products from './modules/Product';
import Categories from './modules/Category';
import Cart from './modules/Cart';
import Authentication from './modules/Authentication';
import UserMovement from './modules/UserMovement';
import Users from './modules/User';

Vue.use(Vue);

export default new Vuex.Store({
  modules: {
    Products,
    Categories,
    Cart,
    UserMovement,
    Authentication,
    Users,
  },
});
