import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/lib/api";
import type { Comment } from "@/types";
import type {
  CommentsResponse,
  CommentResponse,
  ReactionResponse,
} from "@/types/api";

export const useCommentsStore = defineStore("comments", () => {
  const commentsByPost = ref<Record<string, Comment[]>>({});
  const loadingByPost = ref<Record<string, boolean>>({});
  const cursorByPost = ref<Record<string, string | null>>({});
  const hasMoreByPost = ref<Record<string, boolean>>({});
  const errorByPost = ref<Record<string, string | null>>({});

  const getComments = (postId: string) => {
    return commentsByPost.value[postId] || [];
  };

  const isLoading = (postId: string) => {
    return loadingByPost.value[postId] || false;
  };

  const hasMore = (postId: string) => {
    return hasMoreByPost.value[postId] ?? true;
  };

  const getError = (postId: string) => {
    return errorByPost.value[postId] || null;
  };

  const fetchComments = async (postId: string, limit = 5) => {
    try {
      loadingByPost.value[postId] = true;
      errorByPost.value[postId] = null;

      const response: CommentsResponse = await api.get(
        `/posts/${postId}/comments`,
        {
          params: {
            cursor: cursorByPost.value[postId],
            limit,
          },
        }
      );

      const currentComments = commentsByPost.value[postId] || [];
      commentsByPost.value[postId] = [...currentComments, ...response.comments];
      cursorByPost.value[postId] = response.nextCursor;
      hasMoreByPost.value[postId] = response.hasMore;
    } catch (err: any) {
      console.error("Failed to fetch comments:", err);
      errorByPost.value[postId] =
        err.response?.data?.message || "Failed to fetch comments";
    } finally {
      loadingByPost.value[postId] = false;
    }
  };

  const createComment = async (postId: string, data: { content: string }) => {
    try {
      errorByPost.value[postId] = null;
      const response: CommentResponse = await api.post(
        `/posts/${postId}/comments`,
        data
      );
      const currentComments = commentsByPost.value[postId] || [];
      commentsByPost.value[postId] = [response.comment, ...currentComments];
    } catch (err: any) {
      console.error("Failed to create comment:", err);
      errorByPost.value[postId] =
        err.response?.data?.message || "Failed to create comment";
      throw err;
    }
  };

  const reactToComment = async (
    postId: string,
    commentId: string,
    emoji: string
  ) => {
    try {
      errorByPost.value[postId] = null;

      const response: ReactionResponse = await api.post("/reactions", {
        targetType: "COMMENT",
        targetId: commentId,
        emoji,
      });

      if (response.error) {
        console.error(response.error);
        errorByPost.value[postId] = response.error;
        return;
      }

      const { reaction } = response;
      const comments = commentsByPost.value[postId] || [];
      const commentIndex = comments.findIndex((c) => c._id === commentId);

      if (commentIndex === -1) return;

      const comment = comments[commentIndex];
      const reactions = [...comment.reactions];

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

      commentsByPost.value[postId][commentIndex] = {
        ...comment,
        reactions,
      };
    } catch (err: any) {
      console.error("Failed to react to comment:", err);
      errorByPost.value[postId] =
        err.response?.data?.message || "Failed to react to comment";
    }
  };

  const resetComments = (postId: string) => {
    delete commentsByPost.value[postId];
    delete loadingByPost.value[postId];
    delete cursorByPost.value[postId];
    delete hasMoreByPost.value[postId];
    delete errorByPost.value[postId];
  };

  return {
    getComments,
    isLoading,
    hasMore,
    getError,
    fetchComments,
    createComment,
    reactToComment,
    resetComments,
  };
});
