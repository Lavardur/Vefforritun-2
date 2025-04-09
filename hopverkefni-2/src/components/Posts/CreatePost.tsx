'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PostsApi, CategoriesApi, TagsApi } from '@/api';
import { useAuth } from '@/contexts/AuthContext';
import { Category, Tag } from '@/types';
import styles from './CreatePost.module.css';

interface CreatePostProps {
  user: any; // You should define a proper User type
}

export default function CreatePost({ user }: CreatePostProps) {
  const router = useRouter();
  const { authState } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories and tags on component mount
  useEffect(() => {
    async function fetchData() {
      const categoriesApi = new CategoriesApi();
      const tagsApi = new TagsApi();

      const categoriesResult = await categoriesApi.getCategories();
      const tagsResult = await tagsApi.getTags();

      if (categoriesResult?.data) {
        setCategories(categoriesResult.data);
      }

      if (tagsResult?.data) {
        setTags(tagsResult.data);
      }
    }

    fetchData();
  }, []);

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleTagChange = (tagId: number) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!authState.token) {
      setError('You must be logged in to create a post');
      setIsSubmitting(false);
      return;
    }

    try {
      const postsApi = new PostsApi();
      const result = await postsApi.createPost(
        {
          title,
          content,
          categoryIds:
            selectedCategories.length > 0 ? selectedCategories : undefined,
          tagIds: selectedTags.length > 0 ? selectedTags : undefined,
        },
        authState.token // Pass the token from auth context
      );

      if (result && result.post) {
        router.push(`/posts/${result.post.id}`);
      } else {
        setError('Failed to create post. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Error creating post:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h1 className={styles.title}>Create a New Post</h1>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={styles.input}
            placeholder="Enter post title"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="content" className={styles.label}>
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className={styles.textarea}
            placeholder="Write your post content here..."
            rows={10}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Categories</label>
          <div className={styles.checkboxList}>
            {categories.map((category) => (
              <div key={category.id} className={styles.checkboxItem}>
                <input
                  type="checkbox"
                  id={`category-${category.id}`}
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                  className={styles.checkbox}
                />
                <label htmlFor={`category-${category.id}`}>
                  {category.name}
                </label>
              </div>
            ))}
            {categories.length === 0 && (
              <p className={styles.emptyMessage}>No categories available</p>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Tags</label>
          <div className={styles.checkboxList}>
            {tags.map((tag) => (
              <div key={tag.id} className={styles.checkboxItem}>
                <input
                  type="checkbox"
                  id={`tag-${tag.id}`}
                  checked={selectedTags.includes(tag.id)}
                  onChange={() => handleTagChange(tag.id)}
                  className={styles.checkbox}
                />
                <label htmlFor={`tag-${tag.id}`}>#{tag.name}</label>
              </div>
            ))}
            {tags.length === 0 && (
              <p className={styles.emptyMessage}>No tags available</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </>
  );
}