import styles from "./Post.module.css";
import Link from "next/link";
import { PostsApi } from "@/api";
import { notFound } from "next/navigation";

interface PostProps {
  postId: number;
}

export default async function Post({ postId }: PostProps) {
  if (!postId) {
    notFound();
  }

  const api = new PostsApi();
  const post = await api.getPostById(postId);

  if (!post) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <article className={styles.postDetail}>
          <div className={styles.container}>
            <div className={styles.breadcrumbs}>
              <Link href="/">Home</Link> / <Link href="/posts">Posts</Link> /{" "}
              <span>{post.title}</span>
            </div>

            <h1 className={styles.title}>{post.title}</h1>

            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <span className={styles.metaIcon}>📅</span>
                <span>
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaIcon}>👤</span>
                <span>by {post.authorId}</span>
              </div>
            </div>

            <div
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />

            <div className={styles.tags}>
              <div className={styles.tagsSection}>
                <h3 className={styles.tagsTitle}>Categories:</h3>
                <div className={styles.tagsList}>
                  {post.categories?.map((category) => (
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
                  {post.tags?.map((tag) => (
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
      </div>
    </main>
  );
}
