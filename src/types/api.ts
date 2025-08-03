import type { User, Post, Comment, Reaction } from './index';

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface AuthResponse {
  user: User;
}

export interface PostsResponse {
  posts: Post[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface CommentsResponse {
  comments: Comment[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface PostResponse {
  post: Post;
}

export interface CommentResponse {
  comment: Comment;
}

export interface ReactionResponse {
  reaction: Reaction;
  error?: string;
}

export interface UserResponse {
  user: User;
}