import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Authenticated Routes - Use MainLayout
    {
      path: "/",
      component: () => import("@/layouts/MainLayout.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "HomePage",
          component: () => import("@/pages/HomePage.vue"),
        },
        {
          path: "settings",
          name: "Settings",
          component: () => import("@/pages/SettingsPage.vue"),
        },
        {
          path: "users/me",
          name: "MePage",
          component: () => import("@/pages/MePage.vue"),
        },
        {
          path: "users/:userId",
          name: "UserPage",
          component: () => import("@/pages/UserPage.vue"),
        },
      ],
    },
    // Guest Routes - Use BlankLayout
    {
      path: "/",
      component: () => import("@/layouts/BlankLayout.vue"),
      meta: { requiresGuest: true },
      children: [
        {
          path: "login",
          name: "Login",
          component: () => import("@/pages/LoginPage.vue"),
        },
        {
          path: "register",
          name: "Register",
          component: () => import("@/pages/RegisterPage.vue"),
        },
      ],
    },
    // Not Found Routes
    {
      path: "/not-found",
      name: "NotFound",
      component: () => import("@/pages/NotFoundPage.vue"),
    },
    // Catch-all 404 route
    {
      path: "/:pathMatch(.*)*",
      redirect: "/not-found",
    },
  ],
});

router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore();

  // Wait for auth initialization on first load
  if (!authStore.isInitialized) {
    await authStore.init();
  }

  if (to.meta.requiresAuth && !authStore.currentUser) {
    next("/login");
  } else if (to.meta.requiresGuest && authStore.currentUser) {
    next("/");
  } else {
    next();
  }
});

export default router;
