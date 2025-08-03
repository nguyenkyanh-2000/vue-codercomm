<template>
  <div class="space-y-6">
    <!-- Loading state -->
    <div
      v-if="postsStore.isLoading && postsStore.posts.length === 0"
      class="text-center py-8"
    >
      <p class="text-muted-foreground">Loading posts...</p>
    </div>

    <!-- Posts -->
    <div v-else-if="postsStore.posts.length > 0" class="space-y-4">
      <PostCard v-for="post in postsStore.posts" :key="post._id" :post="post" />

      <!-- Load more button -->
      <div v-if="postsStore.hasMore" class="text-center">
        <Button
          @click="loadMorePosts"
          variant="outline"
          :disabled="postsStore.isLoading"
        >
          {{ postsStore.isLoading ? "Loading..." : "Load More" }}
        </Button>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="text-center py-8">
      <p class="text-muted-foreground">
        No posts yet. Be the first to share something!
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { usePostsStore } from "@/stores/posts";
import PostCard from "./PostCard.vue";
import { Button } from "@/components/ui/button";

const postsStore = usePostsStore();

const loadMorePosts = () => {
  postsStore.fetchPosts();
};

onMounted(() => {
  if (postsStore.posts.length === 0) {
    postsStore.fetchPosts();
  }
});
</script>
