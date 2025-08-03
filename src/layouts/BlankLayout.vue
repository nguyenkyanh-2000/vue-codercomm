<template>
  <main class="min-h-screen flex flex-col justify-center">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { computed, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const currentUser = computed(() => authStore.currentUser);

watchEffect(() => {
  if (currentUser.value) {
    const from = route.query.from as string;
    router.replace(from || "/");
  }
});
</script>
