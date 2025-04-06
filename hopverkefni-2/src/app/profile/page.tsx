'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import styles from './page.module.css';

export default function ProfilePage() {
  const { authState } = useAuth();

  return (
    <ProtectedRoute>
      <div className={styles.page}>
        <main className={styles.main}>
          <div className={styles.profileContainer}>
            <h1 className={styles.title}>Your Profile</h1>
            
            {authState.user && (
              <div className={styles.profileInfo}>
                <div className={styles.avatar}>
                  {authState.user.username.charAt(0)}
                </div>
                
                <div className={styles.details}>
                  <div className={styles.field}>
                    <span className={styles.label}>Username:</span>
                    <span className={styles.value}>{authState.user.username}</span>
                  </div>
                  
                  <div className={styles.field}>
                    <span className={styles.label}>User ID:</span>
                    <span className={styles.value}>{authState.user.id}</span>
                  </div>
                  
                  <div className={styles.field}>
                    <span className={styles.label}>Role:</span>
                    <span className={`${styles.value} ${styles.role} ${styles[authState.user.isAdmin ? 'admin' : 'user']}`}>
                      {authState.user.isAdmin ? 'Admin' : 'User'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}