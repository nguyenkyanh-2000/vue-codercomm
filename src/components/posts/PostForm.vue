<template>
  <Card class="mb-6 shadow-sm">
    <Form :validation-schema="postSchema" :on-submit="onSubmit" class="p-6">
      <div class="flex gap-4">
        <RouterLink
          v-if="currentUser"
          :to="`/users/${currentUser._id}`"
          class="flex-shrink-0 mt-1"
        >
          <Avatar class="h-10 w-10 border hover:opacity-80 transition-opacity">
            <AvatarImage
              :src="currentUser.avatarUrl || ''"
              :alt="currentUser.name"
            />
            <AvatarFallback>
              {{ getInitials(currentUser.name) }}
            </AvatarFallback>
          </Avatar>
        </RouterLink>

        <div class="flex-1">
          <FormField name="content" v-slot="{ field, errorMessage }">
            <Textarea
              v-bind="field"
              :placeholder="`What's on your mind, ${firstName}?`"
              class="resize-none min-h-[70px] border-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none px-0"
              :disabled="postsStore.isLoading"
            />
          </FormField>
        </div>
      </div>

      <div class="flex justify-end mt-4">
        <Button type="submit" :disabled="postsStore.isLoading">
          {{ postsStore.isLoading ? "Posting..." : "Post" }}
        </Button>
      </div>
    </Form>
  </Card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { usePostsStore } from "@/stores/posts";
import { useAuthStore } from "@/stores/auth";
import { postSchema, type PostForm } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField } from "@/components/ui/form";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/utils/get-initials";

const postsStore = usePostsStore();
const authStore = useAuthStore();

const currentUser = computed(() => authStore.currentUser);
const firstName = computed(() => {
  return currentUser.value?.name?.split(" ")[0] || "";
});

const onSubmit = async (values: PostForm, actions: any) => {
  try {
    await postsStore.createPost(values);
    // Reset the form after successful post creation
    actions.resetForm();
  } catch (error) {
    console.error("Failed to create post:", error);
  }
};
</script>
