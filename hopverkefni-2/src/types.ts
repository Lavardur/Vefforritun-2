export type Result<Ok, Err = Error> =
  | { ok: true; value: Ok }
  | { ok: false; error: Err };

export type UiState = 'initial' | 'loading' | 'error' | 'data' | 'empty';

export type Pagination = {
  total: number;
  limit: number;
  page: number;
  totalPages: number;
  offset: number;
};

export type Paginated<T> = {
  data: T[];
  pagination: Pagination;
  total: number;
  limit: number;
  page: number;
  totalPages: number;
  offset: number;
};

export type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  categoryIds: number[];
  categories: Category[];
  tagIds: number[];
  tags: Tag[];
  likes: number;
  comments: Comment[];
};

export type PostToCreate = {
  title: string;
  content: string;
  categoryIds?: number[];
  tagIds?: number[];
};

export type PostCreateResult =
  | {
      created: true;
      post: Post;
    }
  | {
      created: false;
      reason: 'invalid-category' | 'invalid-tag';
    };

export type Comment = {
  id: number;
  content: string;
  postId: number;
  authorId: number;
};

export type CommentToCreate = {
  content: string;
  postId: number;
};

export type CommentCreateResult =
  | {
      created: true;
      comment: Comment;
    }
  | {
      created: false;
      reason: 'invalid-post';
    };

export type Category = {
  id: number;
  name: string;
};

export type CategoryToCreate = {
  name: string;
};

export type CategoryCreateResult =
  | {
      created: true;
      category: Category;
    }
  | {
      created: false;
      reason: 'invalid-category';
    };

export type Tag = {
  id: number;
  name: string;
};

export type TagToCreate = {
  name: string;
};

export type TagCreateResult =
  | {
      created: true;
      tag: Tag;
    }
  | {
      created: false;
      reason: 'invalid-tag';
    };

export type LimitOffset = {
  limit: number;
  offset: number;
};

export type Id = number & { __brand: 'id' };

export type User = {
  id: number;
  username: string;
  isAdmin: boolean;
};

export type LoginCredentials = {
  username: string;
  password: string;
};

export type LoginResponse = {
  message: string;
  token: string;
};

export type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export interface IPost {
  getPosts(limitOffset: LimitOffset): Promise<Result<Paginated<Post>>>;
  getPostById(id: Id): Promise<Result<Post | null>>;
  createPost(post: PostToCreate): Promise<Result<PostCreateResult>>;
  updatePost(id: Id, post: PostToCreate): Promise<Result<Post | null>>;
  deletePost(id: Id): Promise<Result<boolean | null>>;
}

export interface IComment {
  getCommentsByPostId(postId: Id, limitOffset: LimitOffset): Promise<Result<Paginated<Comment>>>;
  createComment(comment: CommentToCreate): Promise<Result<CommentCreateResult>>;
  updateComment(id: Id, comment: CommentToCreate): Promise<Result<Comment | null>>;
  deleteComment(id: Id): Promise<Result<boolean | null>>;
}

export interface ICategory {
  getCategories(limitOffset: LimitOffset): Promise<Result<Paginated<Category>>>;
  getCategoryById(id: Id): Promise<Result<Category | null>>;
  createCategory(category: CategoryToCreate): Promise<Result<CategoryCreateResult>>;
  updateCategory(id: Id, category: CategoryToCreate): Promise<Result<Category | null>>;
  deleteCategory(id: Id): Promise<Result<boolean | null>>;
}

export interface ITag {
  getTags(limitOffset: LimitOffset): Promise<Result<Paginated<Tag>>>;
  getTagById(id: Id): Promise<Result<Tag | null>>;
  createTag(tag: TagToCreate): Promise<Result<TagCreateResult>>;
  updateTag(id: Id, tag: TagToCreate): Promise<Result<Tag | null>>;
  deleteTag(id: Id): Promise<Result<boolean | null>>;
}

export interface IAuth {
  login(credentials: LoginCredentials): Promise<Result<LoginResponse | null>>;
  logout(): Promise<Result<boolean>>;
  getUser(): Promise<Result<User | null>>;
}