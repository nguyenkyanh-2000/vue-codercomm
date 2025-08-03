<template>
  <div class="flex space-x-3">
    <RouterLink :to="`/users/${comment.author._id}`" class="flex-shrink-0">
      <Avatar class="w-8 h-8 hover:opacity-80 transition-opacity">
        <AvatarImage
          :src="comment.author.avatarUrl || ''"
          :alt="comment.author.name"
        />
        <AvatarFallback>{{ getInitials(comment.author.name) }}</AvatarFallback>
      </Avatar>
    </RouterLink>

    <div class="flex-1 min-w-0">
      <div class="bg-muted rounded-lg px-3 py-2">
        <div class="flex items-center space-x-2 mb-1">
          <RouterLink
            :to="`/users/${comment.author._id}`"
            class="font-semibold text-sm text-foreground hover:underline"
          >
            {{ comment.author.name }}
          </RouterLink>
          <p class="text-xs text-muted-foreground">
            {{ formatTimeAgo(comment.createdAt) }}
          </p>
        </div>
        <p class="text-sm whitespace-pre-wrap">{{ comment.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Comment } from "@/types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/utils/get-initials";
import { formatTimeAgo } from "@/utils/format-time";

interface Props {
  comment: Comment;
  postId: string;
}

defineProps<Props>();
</script>
