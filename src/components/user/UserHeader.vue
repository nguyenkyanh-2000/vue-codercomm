<template>
  <div v-if="isLoading">
    <UserHeaderFallback />
  </div>

  <div v-else>
    <!-- Cover Image -->
    <div class="h-48 md:h-80 w-full overflow-hidden">
      <img
        v-if="user?.coverUrl"
        :src="user.coverUrl"
        :alt="`${user.name}'s cover`"
        class="w-full h-full object-cover"
      />
      <div
        v-else
        class="w-full h-full bg-gradient-to-r from-primary/50 to-secondary/50"
      />
    </div>

    <!-- Avatar and Info -->
    <div
      class="flex flex-col gap-4 sm:flex-row items-center sm:items-end px-4 sm:px-6 z-10 translate-y-[-50%]"
    >
      <Avatar
        class="h-32 w-32 sm:h-48 sm:w-48 border-4 border-background bg-background"
      >
        <AvatarImage :src="user?.avatarUrl || ''" :alt="user?.name" />
        <AvatarFallback class="text-4xl">
          {{ getInitials(user?.name) }}
        </AvatarFallback>
      </Avatar>

      <div
        class="flex flex-col items-center sm:items-start h-full sm:translate-y-[-40%]"
      >
        <h1 class="text-2xl md:text-3xl font-bold truncate" :title="user?.name">
          {{ user?.name }}
        </h1>

        <span class="text-sm text-muted-foreground">
          <strong>{{ user?.postCount ?? 0 }}</strong> Posts
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils/get-initials";
import { useUserStore } from "@/stores/user";
import UserHeaderFallback from "./UserHeaderFallback.vue";

const userStore = useUserStore();
const user = computed(() => userStore.user);
const isLoading = computed(() => userStore.isLoading);
</script>
