import type { Metadata } from "next";
import "./globals.css";
import Navigation from '@/components/Navigation/Navigation';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "Verkefni 4 - Spurningaleikur",
  description: "Vefforritun 2, 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="is">
      <body>
        <div className={styles.page}>
          <Navigation />
          <main className={styles.main}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
