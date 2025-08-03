<template>
  <div class="space-y-4">
    <!-- Comment Form -->
    <CommentForm :post-id="postId" />

    <!-- Comments -->
    <div v-if="comments.length > 0" class="space-y-3">
      <CommentCard
        v-for="comment in comments"
        :key="comment._id"
        :comment="comment"
        :post-id="postId"
      />

      <!-- Load more comments -->
      <div v-if="commentsStore.hasMore(postId)" class="text-center">
        <Button
          @click="loadMoreComments"
          variant="ghost"
          size="sm"
          :disabled="commentsStore.isLoading(postId)"
        >
          {{
            commentsStore.isLoading(postId)
              ? "Loading..."
              : "Load more comments"
          }}
        </Button>
      </div>
    </div>

    <!-- Loading state -->
    <div v-else-if="commentsStore.isLoading(postId)" class="text-center py-4">
      <p class="text-xs text-muted-foreground">Loading comments...</p>
    </div>

    <!-- Empty state -->
    <div v-else class="text-center py-4">
      <p class="text-xs text-muted-foreground">
        No comments yet. Be the first to comment!
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useCommentsStore } from "@/stores/comments";
import CommentForm from "./CommentForm.vue";
import CommentCard from "./CommentCard.vue";
import { Button } from "@/components/ui/button";

interface Props {
  postId: string;
}

const props = defineProps<Props>();

const commentsStore = useCommentsStore();

const comments = computed(() => commentsStore.getComments(props.postId));

const loadMoreComments = () => {
  commentsStore.fetchComments(props.postId);
};

onMounted(() => {
  if (comments.value.length === 0) {
    commentsStore.fetchComments(props.postId);
  }
});
</script>
