import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/lib/api";
import type { Post } from "@/types";
import type {
  PostsResponse,
  PostResponse,
  ReactionResponse,
} from "@/types/api";

export const usePostsStore = defineStore("posts", () => {
  const posts = ref<Post[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const cursorPostId = ref<string | null>(null);
  const hasMore = ref(false);

  const fetchPosts = async (limit = 5) => {
    try {
      isLoading.value = true;
      error.value = null;

      const response: PostsResponse = await api.get("/posts", {
        params: {
          cursor: cursorPostId.value,
          limit,
        },
      });

      posts.value = [...posts.value, ...response.posts];
      cursorPostId.value = response.nextCursor;
      hasMore.value = response.hasMore;
    } catch (err: any) {
      console.error("Failed to fetch posts:", err);
      error.value = err.response?.data?.message || "Failed to fetch posts";
    } finally {
      isLoading.value = false;
    }
  };

  const fetchUserPosts = async (userId: string, limit = 5) => {
    try {
      isLoading.value = true;
      error.value = null;

      const response: PostsResponse = await api.get(`/posts/user/${userId}`, {
        params: {
          cursor: cursorPostId.value,
          limit,
        },
      });

      posts.value = [...posts.value, ...response.posts];
      cursorPostId.value = response.nextCursor;
      hasMore.value = response.hasMore;
    } catch (err: any) {
      console.error("Failed to fetch user posts:", err);
      error.value = err.response?.data?.message || "Failed to fetch user posts";
    } finally {
      isLoading.value = false;
    }
  };

  const createPost = async (data: { content: string; image?: string }) => {
    try {
      isLoading.value = true;
      error.value = null;

      const response: PostResponse = await api.post("/posts", data);
      posts.value = [response.post, ...posts.value];
    } catch (err: any) {
      console.error(err);
      error.value = err.response?.data?.message || "Failed to create post";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const deletePost = async (postId: string) => {
    try {
      isLoading.value = true;
      error.value = null;

      await api.delete(`/posts/${postId}`);
      posts.value = posts.value.filter((post) => post._id !== postId);
    } catch (err: any) {
      console.error("Failed to delete post:", err);
      error.value = err.response?.data?.message || "Failed to delete post";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const reactToPost = async (postId: string, emoji: string) => {
    try {
      const response: ReactionResponse = await api.post("/reactions", {
        targetType: "POST",
        targetId: postId,
        emoji,
      });

      if (response.error) {
        console.error(response.error);
        return;
      }

      const { reaction } = response;

      const postIndex = posts.value.findIndex((p) => p._id === postId);
      if (postIndex === -1) return;

      const post = posts.value[postIndex];
      const reactions = [...post.reactions];

      const existingReactionIndex = reactions.findIndex(
        (r) => r._id === reaction._id
      );

      if (existingReactionIndex > -1) {
        if (reaction.emoji) {
          reactions[existingReactionIndex] = reaction;
        } else {
          reactions.splice(existingReactionIndex, 1);
        }
      } else {
        reactions.push(reaction);
      }

      posts.value[postIndex] = {
        ...post,
        reactions,
      };
    } catch (err) {
      console.error(err);
    }
  };

  const addPostCommentCount = (postId: string) => {
    const postIndex = posts.value.findIndex((post) => post._id === postId);
    if (postIndex === -1) return;

    const post = posts.value[postIndex];
    posts.value[postIndex] = {
      ...post,
      commentCount: post.commentCount + 1,
    };
  };

  const resetStore = () => {
    posts.value = [];
    cursorPostId.value = null;
    hasMore.value = false;
    error.value = null;
  };

  return {
    posts,
    isLoading,
    error,
    cursorPostId,
    hasMore,
    fetchPosts,
    fetchUserPosts,
    createPost,
    deletePost,
    reactToPost,
    addPostCommentCount,
    resetStore,
  };
});
