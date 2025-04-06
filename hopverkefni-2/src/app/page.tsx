import Posts from '@/components/Posts/Posts';
import styles from "./page.module.css";

export default function PostsPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Posts title="New Posts" />
      </main>
    </div>
  );
}
