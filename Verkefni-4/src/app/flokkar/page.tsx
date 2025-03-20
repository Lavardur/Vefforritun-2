import styles from "../page.module.css";
import Categories from '@/components/Categories/Categories';
import Navigation from '@/components/Navigation/Navigation';

export default function CategoriesPage() {
  return (
    <div className={styles.page}>
      <Navigation />
      <main className={styles.main}>
        <Categories title="Allir flokkar" />
      </main>
      <footer className={styles.footer}>
        <p>Vefforritun 2, 2025 - Verkefni 4</p>
      </footer>
    </div>
  );
}
