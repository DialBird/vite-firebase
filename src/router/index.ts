import About from "@/pages/About.vue";
import Dashboard from "@/pages/Dashboard.vue";
import Home from "@/pages/Home.vue";
import LayoutDashboard from "@/pages/LayoutDashboard.vue";
import Login from "@/pages/Login.vue";
import Chat from "@/pages/PageChat.vue";
import PageChatRoot from "@/pages/PageChatRoot.vue";
import ChatSearch from "@/pages/PageChatSearch.vue";
import PageNotFound from "@/pages/PageNotFound.vue";
import Settings from "@/pages/PageSettings.vue";
import Signup from "@/pages/Signup.vue";
import { useAuthStore } from "@/stores/auth.store";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", name: "Home", component: Home, meta: { opened: true } },
  { path: "/login", name: "Login", component: Login, meta: { opened: true } },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: { opened: true },
  },
  {
    path: "/dashboard",
    component: LayoutDashboard,
    children: [
      {
        path: "",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "about",
        name: "About",
        component: About,
      },
      {
        path: "chat",
        component: PageChatRoot,
        children: [
          {
            path: "",
            name: "Chat",
            component: Chat,
          },
          {
            path: "search",
            name: "ChatSearch",
            component: ChatSearch,
          },
        ],
      },
      {
        path: "settings",
        name: "Settings",
        component: Settings,
      },
    ],
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: PageNotFound },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (to.matched.some((record) => !record.meta.opened)) {
    if (authStore.currentUser || (await authStore.getCurrentUser())) {
      next();
    } else {
      next({ name: "Login" });
    }
  } else {
    next();
  }
});
