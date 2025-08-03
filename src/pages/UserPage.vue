<template>
  <div>
    <UserHeader />
    <div class="flex gap-4 px-10 pb-10">
      <UserInfo />
      <UserPostSection />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import UserHeader from "@/components/user/UserHeader.vue";
import UserInfo from "@/components/user/UserInfo.vue";
import UserPostSection from "@/components/user/UserPostSection.vue";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const userId = computed(() => route.params.userId as string);
const error = computed(() => userStore.error);

// Fetch user when component mounts or userId changes
const fetchUser = async () => {
  if (userId.value) {
    await userStore.fetchUser(userId.value);
  }
};

// Watch for errors and redirect to 404
watch(error, (newError) => {
  if (newError) {
    router.push("/not-found");
  }
});

// Watch for userId changes and fetch new user
watch(userId, fetchUser, { immediate: true });

onMounted(() => {
  fetchUser();
});
</script>
