<template>
  <div>
    <!-- Cover Image Skeleton -->
    <div class="h-48 md:h-80 w-full overflow-hidden">
      <div
        class="w-full h-full bg-gradient-to-r from-primary/50 to-secondary/50 animate-pulse"
      />
    </div>

    <!-- Avatar and Info Skeleton -->
    <div
      class="flex flex-col gap-4 sm:flex-row items-center sm:items-end px-4 sm:px-6 z-10 translate-y-[-50%]"
    >
      <Avatar
        class="h-32 w-32 sm:h-48 sm:w-48 border-4 border-background bg-background"
      >
        <AvatarFallback class="text-4xl">
          <Skeleton class="h-full w-full rounded-full" />
        </AvatarFallback>
      </Avatar>

      <div
        class="flex flex-col items-center sm:items-start h-full sm:translate-y-[-40%]"
      >
        <Skeleton class="h-8 w-48" />
        <div
          class="flex items-center justify-center sm:justify-start space-x-4 text-sm text-muted-foreground mt-1"
        >
          <Skeleton class="h-4 w-24" />
          <Skeleton class="h-4 w-24" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
</script>
