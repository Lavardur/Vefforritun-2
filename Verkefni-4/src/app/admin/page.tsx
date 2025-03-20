import Navigation from '@/components/Navigation/Navigation';
import Link from 'next/link';
import styles from '../page.module.css';
import adminStyles from './admin.module.css';
import Footer from "@/components/Footer/Footer";

export default function AdminPage() {
  return (
    <div className={styles.page}>
      <Navigation />
      <main className={styles.main}>
        <div className={adminStyles.adminContainer}>
          <h1 className={adminStyles.heading}>Stjórnborð</h1>
          
          <div className={adminStyles.adminCards}>
            <Link href="/admin/categories" className={adminStyles.adminCard}>
              <h2>Flokkar</h2>
              <p>Skoða, búa til, breyta og eyða flokkum</p>
            </Link>
            
            <Link href="/admin/questions" className={adminStyles.adminCard}>
              <h2>Spurningar</h2>
              <p>Skoða, búa til, breyta og eyða spurningum</p>
            </Link>
          </div>
        </div>
      </main>

      <Footer />

    </div>
  );
}