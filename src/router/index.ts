import About from "@/pages/About.vue";
import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue";
import Signup from "@/pages/Signup.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login", component: Login },
  { path: "/signup", name: "Signup", component: Signup },
  { path: "/about", name: "About", component: About },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
