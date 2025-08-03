<template>
  <div class="w-full h-full flex flex-col gap-4 pb-4">
    <PostForm />
    <h2 class="text-lg font-semibold">Your Feed</h2>
    <PostList />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { usePostsStore } from "@/stores/posts";
import PostForm from "@/components/posts/PostForm.vue";
import PostList from "@/components/posts/PostList.vue";

const postsStore = usePostsStore();

const hasMore = computed(() => postsStore.hasMore);
const isLoading = computed(() => postsStore.isLoading);

const loadMorePosts = () => {
  postsStore.fetchPosts(); // Fetch all posts (not user-specific)
};

onMounted(() => {
  // Reset posts when visiting home page
  postsStore.resetStore();
  postsStore.fetchPosts(); // Fetch all posts for the main feed
});
</script>
