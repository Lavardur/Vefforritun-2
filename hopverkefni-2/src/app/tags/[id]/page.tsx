'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Tag from '@/components/Tag/Tag';
import styles from './page.module.css';

export default function TagDetailPage() {
    const params = useParams();
    const tagId = params?.id ? parseInt(Array.isArray(params.id) ? params.id[0] : params.id) : null;
    
  return (
    <div className={styles.postsPage}>
      <div className={styles.container}>
        {tagId !== null && <Tag tagId={tagId} />}
      </div>
    </div>
  );
}