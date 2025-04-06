export type Result<Ok, Err = Error> =
  | { ok: true; value: Ok }
  | { ok: false; error: Err };

export type UiState = 'initial' | 'loading' | 'error' | 'data' | 'empty';

export type Paginated<T> = {
  data: T[];
  total: number;
  limit: number;
  offset: number;
};

export type Post = {
  id: number;
  title: string;
  content: string;
  authorId: number;
  categoryIds: number[];
  tagIds: number[];
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