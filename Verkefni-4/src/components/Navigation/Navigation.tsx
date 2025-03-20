"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from './Navigation.module.css';

export default function Navigation() {
  const pathname = usePathname();
  
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <ul>
          <li>
            <Link href="/" className={pathname === "/" ? styles.active : ""}>
              Forsíða
            </Link>
          </li>
          <li>
            <Link 
              href="/flokkar" 
              className={pathname === "/flokkar" ? styles.active : ""}
            >
              Flokkar
            </Link>
          </li>
          <li>
            <Link 
              href="/admin" 
              className={pathname.startsWith("/admin") ? styles.active : ""}
            >
              Stjórnborð
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}