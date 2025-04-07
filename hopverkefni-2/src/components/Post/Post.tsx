"use client";

import { useEffect, useState } from "react";
import type { Post, UiState, Paginated } from "@/types";
import styles from "./Post.module.css";
import Link from "next/link";
import { PostsApi } from "@/api";

interface PostProps {
  postId: number;
}

export default function Post({ postId }: PostProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [uiState, setUiState] = useState<UiState>("loading");

  useEffect(() => {
    async function fetchPost() {
      setUiState("loading");
      const api = new PostsApi();

      if (!postId) {
        setUiState("error");
        return;
      }

      const result = await api.getPostById(postId);

      console.log('post result',result)

      if (!result) {
        setUiState("error");
        return;
      }

      if (result === null) {
        setUiState("empty");
      } else {
        setPost(result);
        setUiState("data");
      }
    }

    fetchPost();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {uiState === "loading" && (
          <div className={styles.loading}>Sæki flokka...</div>
        )}

        {uiState === "error" && (
          <div className={styles.error}>Villa við að sækja flokka</div>
        )}

        {uiState === "empty" && (
          <div className={styles.empty}>Engir flokkar fundust</div>
        )}

        {uiState === "data" && (
          <article className={styles.postDetail}>
            <div className={styles.container}>
              <div className={styles.breadcrumbs}>
                <Link href="/">Home</Link> / <Link href="/posts">Posts</Link> /{" "}
                <span>{post?.title}</span>
              </div>

              <h1 className={styles.title}>{post?.title}</h1>

              <div className={styles.meta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaIcon}>📅</span>
                  <span>{post?.createdAt}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaIcon}>👤</span>
                  <span>by {post?.authorId}</span>
                </div>
              </div>

              {/* {post.imageUrl && (
            <div className={styles.featuredImage}>
              <Image 
                src={post.imageUrl}
                alt={post.title}
                width={1200}
                height={600}
                className={styles.image}
              />
            </div>
          )} */}

              <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: post?.content || "" }}
              />

              <div className={styles.tags}>
                <div className={styles.tagsSection}>
                  <h3 className={styles.tagsTitle}>Categories:</h3>
                  <div className={styles.tagsList}>
                    {post?.categories.map((category) => (
                      <Link
                        key={`category-${category.id}`}
                        href={`/categories/${category.id}`}
                        className={`${styles.tag} ${styles.categoryTag}`}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className={styles.tagsSection}>
                  <h3 className={styles.tagsTitle}>Tags:</h3>
                  <div className={styles.tagsList}>
                    {post?.tags.map((tag) => (
                      <Link
                        key={`tag-${tag.id}`}
                        href={`/tags/${tag.id}`}
                        className={`${styles.tag} ${styles.normalTag}`}
                      >
                        #{tag.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.backLink}>
                <Link href="/posts">← Back to Posts</Link>
              </div>
            </div>
          </article>
        )}
      </div>
    </main>
  );
}
