'use client';

import React from 'react';
import Link from 'next/link';
import UserMenu from '../Auth/UserMenu';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          BlogApp
        </Link>
        
        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/posts" className={styles.navLink}>
            Posts
          </Link>
          <Link href="/categories" className={styles.navLink}>
            Categories
          </Link>
        </div>
        
        <UserMenu />
      </div>
    </nav>
  );
};

export default Navbar;