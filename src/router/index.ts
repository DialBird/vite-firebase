import Home from "@/pages/Home.vue";
import { createRouter, createWebHistory } from "vue-router";
import About from "@/pages/About.vue";
import Login from "@/pages/Login.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login", component: Login },
  { path: "/about", name: "About", component: About },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
