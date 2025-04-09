'use client';

import React from 'react';
import Link from 'next/link';
import UserMenu from '../Auth/UserMenu';
import styles from './Navbar.module.css';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  const isActiveLink = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname?.startsWith(path) ?? false;
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          BlogApp
        </Link>
        
        <div className={styles.navLinks}>
          <Link 
            href="/" 
            className={`${styles.navLink} ${isActiveLink('/') ? styles.active : ''}`}
          >
            Home
          </Link>
          <Link 
            href="/posts" 
            className={`${styles.navLink} ${isActiveLink('/posts') ? styles.active : ''}`}
          >
            Posts
          </Link>
          <Link 
            href="/categories" 
            className={`${styles.navLink} ${isActiveLink('/categories') ? styles.active : ''}`}
          >
            Categories
          </Link>
          <Link 
            href="/tags" 
            className={`${styles.navLink} ${isActiveLink('/tags') ? styles.active : ''}`}
          >
            Tags
          </Link>
          <Link href="/posts/new" className={styles.createButton}>
            Create Post
          </Link>
        </div>
        
        <UserMenu />
      </div>
    </nav>
  );
};

export default Navbar;