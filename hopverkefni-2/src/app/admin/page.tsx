import React from 'react';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import styles from './page.module.css';

export default function AdminPage() {
  return (
    <ProtectedRoute adminOnly={true}>
      <div className={styles.adminPage}>
        <div className={styles.container}>
          <h1 className={styles.title}>Admin Panel</h1>
          
          <p className={styles.description}>
            Welcome to the admin panel. From here, you can manage posts, categories, and users.
          </p>
          
          <div className={styles.adminGrid}>
            <div className={styles.adminCard}>
              <h2 className={styles.cardTitle}>Manage Posts</h2>
              <p className={styles.cardDescription}>
                Create, edit, or delete posts.
              </p>
              <button className={styles.cardButton}>Manage Posts</button>
            </div>
            
            <div className={styles.adminCard}>
              <h2 className={styles.cardTitle}>Manage Categories</h2>
              <p className={styles.cardDescription}>
                Add, edit, or remove post categories.
              </p>
              <button className={styles.cardButton}>Manage Categories</button>
            </div>
            
            <div className={styles.adminCard}>
              <h2 className={styles.cardTitle}>Manage Users</h2>
              <p className={styles.cardDescription}>
                View, edit, or delete user accounts.
              </p>
              <button className={styles.cardButton}>Manage Users</button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}