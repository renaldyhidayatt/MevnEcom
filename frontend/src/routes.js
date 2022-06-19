import Vue from "vue";
import Router, { createWebHistory } from "vue-router";

Vue.use(Router);

export default new Router({
  history: createWebHistory(),
  routes: [
    {
      path: "/loginRegister",
      name: "LoginRegister",
      component: () => import("./components/LoginRegister/LoginRegister.vue"),
      beforeEnter: (to, from, next) => {
        LoginRegGarud(to, from, next);
      },
    },
  ],
});
