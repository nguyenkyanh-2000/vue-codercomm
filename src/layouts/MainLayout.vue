<template>
  <div class="min-h-screen flex flex-col">
    <MainHeader />

    <main class="flex-grow">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import MainHeader from "@/components/layout/MainHeader.vue";
</script>
