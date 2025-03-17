import * as yup from 'yup';

export const userSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  isAdmin: yup.boolean().optional(),
});

export const updateUserSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().optional(),
  isAdmin: yup.boolean().optional(),
});

export const postSchema = yup.object({
  title: yup.string().required('Title is required'),
  content: yup.string().required('Content is required'),
  categoryIds: yup.array().of(yup.number().integer()).optional(),
  tagIds: yup.array().of(yup.number().integer()).optional(),
});

export const commentSchema = yup.object({
  content: yup.string().min(1, 'Content is required').max(500, 'Comment is too long'),
  postId: yup.number().integer()
});

export const categorySchema = yup.object({
  name: yup.string().min(1, 'Category is required').max(500, 'Category is too long'),
});

export const tagSchema = yup.object({
  name: yup.string().min(1, 'Tag is required').max(500, 'Tag is too long'),
});

export const likeSchema = yup.object({
  postId: yup.number().integer().required('Post ID is required'),
  userId: yup.number().integer().required('User ID is required'),
});