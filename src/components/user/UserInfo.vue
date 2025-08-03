<template>
  <div v-if="isLoading">
    <UserInfoFallback />
  </div>

  <div
    v-else
    class="container max-w-sm rounded-md bg-slate-100 flex flex-col gap-4 p-6 h-fit"
  >
    <!-- No Info Message -->
    <div v-if="!hasInfo" class="flex flex-col">
      <h4 class="text-lg font-bold">No info</h4>
      <p class="text-sm text-gray-500">
        This user has not added any information yet.
      </p>
    </div>

    <!-- About Me -->
    <div v-if="user?.aboutMe" class="flex flex-col">
      <h4 class="text-lg font-bold">About me</h4>
      <p class="text-sm text-gray-500">{{ user.aboutMe }}</p>
    </div>

    <!-- Location -->
    <div v-if="user?.city || user?.country" class="flex flex-col">
      <h4 class="text-lg font-bold">Location</h4>
      <p class="text-sm text-gray-500">
        <template v-if="user?.city">{{ user.city }}</template>
        <template v-if="user?.city && user?.country">, </template>
        <template v-if="user?.country">{{ user.country }}</template>
      </p>
    </div>

    <!-- Work -->
    <div v-if="user?.company || user?.jobTitle" class="flex flex-col">
      <h4 class="text-lg font-bold">Work</h4>
      <p class="text-sm text-gray-500 truncate">
        <template v-if="user?.jobTitle">{{ user.jobTitle }}</template>
        <template v-if="user?.jobTitle && user?.company"> at </template>
        <template v-if="user?.company">{{ user.company }}</template>
      </p>
    </div>

    <!-- Social Links -->
    <div v-if="hasSocials" class="flex flex-col">
      <h4 class="text-lg font-bold">Social</h4>
      <div class="flex items-center gap-3">
        <a
          v-if="user?.facebookLink"
          :href="user.facebookLink"
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-500 hover:text-blue-600 transition-colors"
        >
          <Facebook class="h-5 w-5" />
        </a>
        <a
          v-if="user?.instagramLink"
          :href="user.instagramLink"
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-500 hover:text-pink-600 transition-colors"
        >
          <Instagram class="h-5 w-5" />
        </a>
        <a
          v-if="user?.linkedinLink"
          :href="user.linkedinLink"
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-500 hover:text-blue-700 transition-colors"
        >
          <Linkedin class="h-5 w-5" />
        </a>
        <a
          v-if="user?.twitterLink"
          :href="user.twitterLink"
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-500 hover:text-blue-400 transition-colors"
        >
          <Twitter class="h-5 w-5" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-vue-next";
import { useUserStore } from "@/stores/user";
import UserInfoFallback from "./UserInfoFallback.vue";

const userStore = useUserStore();
const user = computed(() => userStore.user);
const isLoading = computed(() => userStore.isLoading);

const hasInfo = computed(() => {
  return (
    user.value?.aboutMe ||
    user.value?.city ||
    user.value?.country ||
    user.value?.company ||
    user.value?.jobTitle
  );
});

const hasSocials = computed(() => {
  return (
    user.value?.facebookLink ||
    user.value?.instagramLink ||
    user.value?.linkedinLink ||
    user.value?.twitterLink
  );
});
</script>
