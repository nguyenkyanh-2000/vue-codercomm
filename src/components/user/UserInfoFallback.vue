<template>
  <div
    class="container max-w-sm rounded-md bg-slate-100 flex flex-col gap-4 p-6 h-fit"
  >
    <div class="flex flex-col gap-2">
      <Skeleton class="h-6 w-24" />
      <Skeleton class="h-4 w-full" />
      <Skeleton class="h-4 w-3/4" />
    </div>

    <div class="flex flex-col gap-2">
      <Skeleton class="h-6 w-20" />
      <Skeleton class="h-4 w-32" />
    </div>

    <div class="flex flex-col gap-2">
      <Skeleton class="h-6 w-16" />
      <Skeleton class="h-4 w-40" />
    </div>

    <div class="flex flex-col gap-2">
      <Skeleton class="h-6 w-16" />
      <div class="flex items-center gap-3">
        <Skeleton class="h-5 w-5 rounded" />
        <Skeleton class="h-5 w-5 rounded" />
        <Skeleton class="h-5 w-5 rounded" />
        <Skeleton class="h-5 w-5 rounded" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Skeleton } from "@/components/ui/skeleton";
</script>
