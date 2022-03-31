import Home from "@/pages/Home.vue";
import { createRouter, createWebHistory } from "vue-router";
import About from "@/pages/About.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/about", name: "About", component: About },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
