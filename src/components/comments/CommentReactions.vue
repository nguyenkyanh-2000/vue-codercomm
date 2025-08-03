<template>
  <div class="flex items-center space-x-2">
    <Button
      v-for="reaction in REACTION_EMOJIS"
      :key="reaction.emoji"
      @click="handleReaction(reaction.emoji)"
      variant="ghost"
      size="sm"
      :class="[
        'flex items-center gap-1 h-6 px-1',
        reaction.textColor,
        myReaction?.emoji === reaction.emoji ? 'bg-primary/10' : '',
      ]"
    >
      <component :is="reaction.icon" :class="reaction.textColor" :size="14" />
      <span :class="['text-xs', reaction.textColor]">
        {{ getReactionCount(reaction.emoji) }}
      </span>
    </Button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCommentsStore } from "@/stores/comments";
import { useAuthStore } from "@/stores/auth";
import { REACTION_EMOJIS } from "@/lib/reactions";
import type { Comment } from "@/types";
import { Button } from "@/components/ui/button";

interface Props {
  comment: Comment;
  postId: string;
}

const props = defineProps<Props>();

const commentsStore = useCommentsStore();
const authStore = useAuthStore();

const currentUser = computed(() => authStore.currentUser);

const myReaction = computed(() => {
  return props.comment.reactions?.find(
    (r) => r.author._id === currentUser.value?._id
  );
});

const getReactionCount = (emoji: string) => {
  return props.comment.reactions?.filter((r) => r.emoji === emoji).length || 0;
};

const handleReaction = async (emoji: string) => {
  try {
    await commentsStore.reactToComment(props.postId, props.comment._id, emoji);
  } catch (error) {
    console.error("Failed to react to comment:", error);
  }
};
</script>
