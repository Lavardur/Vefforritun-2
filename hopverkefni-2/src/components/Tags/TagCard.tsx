'use client';

import { Tag } from '@/types';
import Link from 'next/link';
import styles from './TagCard.module.css';

export default function TagCard({ tag }: { tag: Tag }) {
  return (
    <Link 
      href={`/tags/${tag.id}`} 
      className={styles.tagCard}
    >
      <span className={styles.tagName}>#{tag.name}</span>
    </Link>
  );
}