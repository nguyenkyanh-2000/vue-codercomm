<template>
  <div class="w-full flex flex-col gap-4">
    <!-- Post Form for Current User -->
    <PostForm v-if="isCurrentUser" />

    <!-- Posts Header -->
    <h2 class="text-lg font-semibold">
      {{ isCurrentUser ? "Your Posts" : "Their Posts" }}
    </h2>

    <!-- Posts List -->
    <PostList />

    <!-- Load More Button -->
    <button
      v-if="hasMore"
      type="button"
      class="text-sm text-muted-foreground hover:text-primary py-2"
      @click="loadMorePosts"
    >
      Load more posts
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { usePostsStore } from "@/stores/posts";
import { useAuthStore } from "@/stores/auth";
import PostForm from "@/components/posts/PostForm.vue";
import PostList from "@/components/posts/PostList.vue";

const route = useRoute();
const postsStore = usePostsStore();
const authStore = useAuthStore();

const userId = computed(() => route.params.userId as string);
const currentUser = computed(() => authStore.currentUser);
const hasMore = computed(() => postsStore.hasMore);

const isCurrentUser = computed(() => {
  return currentUser.value?._id === userId.value;
});

const loadMorePosts = () => {
  postsStore.fetchUserPosts(userId.value);
};

onMounted(() => {
  // Reset posts when switching users
  postsStore.resetStore();
  postsStore.fetchUserPosts(userId.value);
});
</script>
