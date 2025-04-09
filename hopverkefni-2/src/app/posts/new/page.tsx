'use client';

import React from 'react';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import CreatePost from '@/components/Posts/CreatePost';
import styles from './page.module.css';

export default function CreatePostPage() {
  return (
    <ProtectedRoute>
      <div className={styles.page}>
        <main className={styles.main}>
          <div className={styles.container}>
            <CreatePost /> {/* Remove the user prop */}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}