import styles from "../page.module.css";
import Categories from '@/components/Categories/Categories';

export default function CategoriesPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Categories title="Allir flokkar" />
      </main>
    </div>
  );
}
