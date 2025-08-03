export interface User {
  _id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Reaction {
  _id: string;
  targetType: "POST" | "COMMENT";
  targetId: string;
  emoji: string;
  author: User;
  createdAt: string;
}

export interface Comment {
  _id: string;
  content: string;
  author: User;
  post: string;
  reactions: Reaction[];
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  _id: string;
  content: string;
  author: User;
  reactions: Reaction[];
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationResponse<T> {
  data: T[];
  nextCursor: string | null;
  hasMore: boolean;
}
