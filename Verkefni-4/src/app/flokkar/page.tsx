import styles from "../page.module.css";
import Categories from '@/components/Categories/Categories';
import Navigation from '@/components/Navigation/Navigation';
import Footer from '@/components/Footer/Footer';

export default function CategoriesPage() {
  return (
    <div className={styles.page}>
      <Navigation />
      <main className={styles.main}>
        <Categories title="Allir flokkar" />
      </main>
      <Footer />
    </div>
  );
}
