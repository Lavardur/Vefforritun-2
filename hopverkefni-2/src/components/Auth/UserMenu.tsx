'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import styles from './UserMenu.module.css';
import { useRouter } from 'next/navigation';

const UserMenu = () => {
  const { authState, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (authState.isLoading) {
    return <div className={styles.userMenuPlaceholder}></div>;
  }

  return (
    <div className={styles.userMenu}>
      {authState.isAuthenticated ? (
        <>
          <button className={styles.userButton} onClick={toggleMenu}>
            <span className={styles.avatarIcon}>
              {authState.user?.username.charAt(0) || 'U'}
            </span>
            <span className={styles.username}>{authState.user?.username}</span>
          </button>
          
          {menuOpen && (
            <div className={styles.dropdownMenu}>
              <Link href="/profile" className={styles.menuItem} onClick={() => setMenuOpen(false)}>
                Profile
              </Link>
              {authState.user?.isAdmin && (
                <Link href="/admin" className={styles.menuItem} onClick={() => setMenuOpen(false)}>
                  Admin Panel
                </Link>
              )}
              <button className={styles.menuItem} onClick={handleLogout}>
                Log Out
              </button>
            </div>
          )}
        </>
      ) : (
        <div className={styles.authButtons}>
          <Link href="/login" className={styles.loginButton}>
            Log In
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserMenu;