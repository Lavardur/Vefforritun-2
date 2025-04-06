import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.homepage}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Welcome to BlogApp</h1>
          <p className={styles.heroSubtitle}>
            A platform for sharing knowledge, stories, and ideas.
          </p>
          <div className={styles.heroCta}>
            <Link href="/posts" className={styles.primaryButton}>
              Explore Posts
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Features</h2>
          
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📝</div>
              <h3 className={styles.featureTitle}>Read Articles</h3>
              <p className={styles.featureDescription}>
                Explore a wide range of articles written by our community of writers.
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💬</div>
              <h3 className={styles.featureTitle}>Join Discussions</h3>
              <p className={styles.featureDescription}>
                Engage with authors and other readers through comments and discussions.
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔍</div>
              <h3 className={styles.featureTitle}>Discover Categories</h3>
              <p className={styles.featureDescription}>
                Find content that interests you by browsing our diverse categories.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.callToAction}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Ready to get started?</h2>
          <p className={styles.ctaDescription}>
            Join our community today and start exploring content that matters to you.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/posts" className={styles.primaryButton}>
              Browse Posts
            </Link>
            <Link href="/login" className={styles.secondaryButton}>
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
