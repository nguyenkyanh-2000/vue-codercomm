<template>
  <div class="flex items-center space-x-2">
    <Button
      v-for="reaction in REACTION_EMOJIS"
      :key="reaction.emoji"
      @click="handleReaction(reaction.emoji)"
      variant="ghost"
      size="sm"
      :class="[
        'flex items-center gap-1 h-8 px-2',
        reaction.textColor,
        getUserReaction(reaction.emoji) ? 'bg-primary/10' : '',
      ]"
    >
      <component :is="reaction.icon" :class="reaction.textColor" :size="16" />
      <span :class="['text-xs ml-1', reaction.textColor]">
        {{ getReactionCount(reaction.emoji) }}
      </span>
    </Button>
  </div>
</template>

<script setup lang="ts">
import { usePostsStore } from "@/stores/posts";
import { useAuthStore } from "@/stores/auth";
import { REACTION_EMOJIS } from "@/lib/reactions";
import type { Post } from "@/types";
import { Button } from "@/components/ui/button";

interface Props {
  post: Post;
}

const props = defineProps<Props>();

const postsStore = usePostsStore();
const authStore = useAuthStore();

const getReactionCount = (emoji: string) => {
  return props.post.reactions?.filter((r) => r.emoji === emoji).length || 0;
};

const getUserReaction = (emoji: string) => {
  if (!authStore.currentUser) return null;
  return props.post.reactions?.find(
    (r) => r.emoji === emoji && r.author._id === authStore.currentUser?._id
  );
};

const getReactionUsers = (emoji: string) => {
  return props.post.reactions?.filter((r) => r.emoji === emoji) || [];
};

const handleReaction = async (emoji: string) => {
  await postsStore.reactToPost(props.post._id, emoji);
};
</script>
