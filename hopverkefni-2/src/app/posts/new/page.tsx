'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import CreatePost from '@/components/Posts/CreatePost';
import styles from './page.module.css';

export default function CreatePostPage() {
  // You don't need to destructure authState here since you're
  // passing the entire user object to CreatePost

  return (
    <ProtectedRoute>
      <div className={styles.page}>
        <main className={styles.main}>
          <div className={styles.container}>
            <CreatePost user={null} /> {/* The user prop isn't needed anymore */}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}