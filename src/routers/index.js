import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/01-Home.vue";
import Galeria from "@/views/Galeria.vue";

const NAV_OFFSET = 80;

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/Galeria", name: "Galeria", component: Galeria },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return new Promise((resolve) => {
        requestAnimationFrame(() => {
          const el = document.querySelector(to.hash);
          if (!el) return resolve({ top: 0, behavior: "smooth" });

          const y = el.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET;
          resolve({ top: y, behavior: "smooth" });
        });
      });
    }
    return { top: 0, behavior: "smooth" };
  },
});

export default router;
