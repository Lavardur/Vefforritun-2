import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Vefforritun 2, 2025</h1>
          <h2 className={styles.subtitle}>Verkefni 4: React framendi</h2>
          <p className={styles.description}>
            Flokkar af spurningum sem er hægt að svara og fá endurgjöf á svari.	 
          </p>
          <div className={styles.actions}>
            <Link href="/flokkar" className={styles.primaryButton}>
              Skoða flokka
            </Link>
            <Link href="/admin" className={styles.secondaryButton}>
              Stjórnborð
            </Link>
          </div>
        </div>

        <section className={styles.infoSection}>
          <h2>Um verkefnið</h2>
          <p>
            Verkefnið snýst um að setja upp React framenda fyrir vefþjónustu gerða í verkefni 3.
            Notendur geta skoðað spurningar í mismunandi flokkum og svarað þeim til að æfa sig.
          </p>
        </section>

        <section className={styles.functionalitySection}>
          <h2>Virkni</h2>
          <ul className={styles.featureList}>
            <li>
              <span>Forsíða</span> sem birtir verkefnalýsingu með hlekki á aðrar síður.
            </li>
            <li>
              <span>Flokkasíða</span> sem birtir spurningar í gefnum flokk, ef flokkur er ekki til skal birt 404 síðu.
            </li>
            <li>
              <span>Stjórnborðssíða</span> sem leyfir að:
              <ul>
                <li>Búa til, breyta og eyða flokk.</li>
                <li>Búa til spurningu með svörum.</li>
                <li>Breyta spurningu með svörum.</li>
              </ul>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
