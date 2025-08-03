<template>
  <Form
    :validation-schema="commentSchema"
    :on-submit="onSubmit"
    class="flex space-x-2"
  >
    <Avatar class="w-8 h-8 flex-shrink-0">
      <AvatarImage
        v-if="authStore.currentUser?.avatarUrl"
        :src="authStore.currentUser.avatarUrl"
        :alt="authStore.currentUser.name"
      />
      <AvatarFallback>{{
        getInitials(authStore.currentUser?.name || "")
      }}</AvatarFallback>
    </Avatar>

    <div class="flex-1 flex space-x-2">
      <FormField name="content" v-slot="{ field, errorMessage }">
        <Input
          v-bind="field"
          placeholder="Write a comment..."
          class="flex-1"
          :class="{ 'border-destructive': errorMessage }"
        />
      </FormField>
      <Button type="submit" size="sm"> Post </Button>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { useCommentsStore } from "@/stores/comments";
import { useAuthStore } from "@/stores/auth";
import { commentSchema, type CommentForm } from "@/lib/validations";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";

interface Props {
  postId: string;
}

const props = defineProps<Props>();

const commentsStore = useCommentsStore();
const authStore = useAuthStore();

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const onSubmit = async (values: CommentForm, actions: any) => {
  try {
    await commentsStore.createComment(props.postId, values);
    // Reset the form after successful comment creation
    actions.resetForm();
  } catch (error) {
    console.error("Failed to create comment:", error);
  }
};
</script>
