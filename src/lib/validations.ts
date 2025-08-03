import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const registerSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const postSchema = yup.object({
  content: yup
    .string()
    .required("Post content is required")
    .min(1, "Post cannot be empty"),
});

export const commentSchema = yup.object({
  content: yup
    .string()
    .required("Comment is required")
    .min(1, "Comment cannot be empty"),
});

export type LoginForm = yup.InferType<typeof loginSchema>;
export type RegisterForm = yup.InferType<typeof registerSchema>;
export type PostForm = yup.InferType<typeof postSchema>;
export type CommentForm = yup.InferType<typeof commentSchema>;
