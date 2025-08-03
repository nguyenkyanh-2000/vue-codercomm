<template>
  <Card class="p-6">
    <!-- Post Header -->
    <div class="flex items-center space-x-3 mb-4">
      <RouterLink :to="`/users/${post.author._id}`" class="flex-shrink-0">
        <Avatar class="w-10 h-10 hover:opacity-80 transition-opacity">
          <AvatarImage :src="post.author.avatarUrl" :alt="post.author.name" />
          <AvatarFallback>{{ getInitials(post.author.name) }}</AvatarFallback>
        </Avatar>
      </RouterLink>
      <div class="flex-1">
        <RouterLink
          :to="`/users/${post.author._id}`"
          class="font-semibold text-sm text-foreground hover:underline"
        >
          {{ post.author.name }}
        </RouterLink>
        <p class="text-xs text-muted-foreground">
          {{ formatTimeAgo(post.createdAt) }}
        </p>
      </div>
    </div>

    <!-- Post Content -->
    <div class="mb-4">
      <p class="text-sm whitespace-pre-wrap">{{ post.content }}</p>
    </div>

    <!-- Post Actions -->
    <div class="flex items-center justify-between pt-4 border-t">
      <PostReactions :post="post" />
      <Button @click="toggleComments" variant="ghost" size="sm">
        {{ post.commentCount }} Comments
      </Button>
    </div>

    <!-- Comments Section -->
    <div v-if="showComments" class="mt-4 pt-4 border-t">
      <CommentList :post-id="post._id" />
    </div>
  </Card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Post } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/utils/get-initials";
import { formatTimeAgo } from "@/utils/format-time";
import PostReactions from "./PostReactions.vue";
import CommentList from "@/components/comments/CommentList.vue";

interface Props {
  post: Post;
}

defineProps<Props>();

const showComments = ref(false);

const toggleComments = () => {
  showComments.value = !showComments.value;
};
</script>
