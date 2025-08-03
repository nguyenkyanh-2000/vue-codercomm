<template>
  <div></div>
</template>

<script setup lang="ts">
import { computed, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();
const currentUser = computed(() => authStore.currentUser);

watchEffect(() => {
  if (currentUser.value?._id) {
    router.replace(`/users/${currentUser.value._id}`);
  }
});
</script>
