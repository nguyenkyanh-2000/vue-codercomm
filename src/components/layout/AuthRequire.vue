<template>
  <div v-if="!isInitialized">
    <!-- Not initialized yet -->
  </div>

  <div
    v-else-if="isLoading"
    class="flex justify-center items-center min-h-screen"
  >
    <Loader2 class="w-4 h-4 animate-spin" />
  </div>

  <slot v-else-if="currentUser" />
</template>

<script setup lang="ts">
import { computed, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { Loader2 } from "lucide-vue-next";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const isInitialized = computed(() => authStore.isInitialized);
const isLoading = computed(() => authStore.isLoading);
const currentUser = computed(() => authStore.currentUser);

watchEffect(() => {
  if (isInitialized.value && !currentUser.value) {
    router.push({
      path: "/login",
      query: { from: route.fullPath },
    });
  }
});
</script>
