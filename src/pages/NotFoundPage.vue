<template>
  <div class="flex flex-col items-center justify-center text-center h-screen">
    <h1 class="text-6xl font-bold text-primary mb-4">404</h1>
    <h2 class="text-3xl font-semibold mb-3">Page Not Found</h2>
    <p class="text-muted-foreground mb-8 max-w-md">
      Oops! The page you are looking for doesn't seem to exist. It might have
      been moved, deleted, or maybe you just mistyped the URL.
    </p>
    <Button as-child size="lg">
      <RouterLink to="/">
        <Home class="mr-2 h-5 w-5" />
        Go Back Home
      </RouterLink>
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Home } from "lucide-vue-next";
</script>
