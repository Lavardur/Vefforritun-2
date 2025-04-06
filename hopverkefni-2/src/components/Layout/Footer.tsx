'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import styles from './Footer.module.css';

const Footer = () => {
  const { authState } = useAuth();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.copyright}>
            &copy; {currentYear} BlogApp. All rights reserved.
          </div>
          
          <div className={styles.links}>
            {authState.isAuthenticated && authState.user?.isAdmin && (
              <Link href="/admin" className={styles.adminLink}>
                Admin Panel
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;