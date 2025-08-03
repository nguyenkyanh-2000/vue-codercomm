<template>
  <div>
    <RouterView />
    <Toaster />
  </div>
</template>

<script setup lang="ts">
import { Toaster } from "@/components/ui/toast";
// Router guard now handles auth initialization
</script>
