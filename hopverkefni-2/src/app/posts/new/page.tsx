'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import CreatePost from '@/components/Posts/CreatePost';
import styles from './page.module.css';

export default function CreatePostPage() {
  const { authState } = useAuth();

  return (
    <ProtectedRoute>
      <div className={styles.page}>
        <main className={styles.main}>
          <div className={styles.container}>
            <CreatePost user={authState.user} />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}