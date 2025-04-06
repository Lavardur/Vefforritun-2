import React from 'react';
import Login from '@/components/Auth/Login';
import styles from './page.module.css';

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Login />
      </main>
    </div>
  );
}