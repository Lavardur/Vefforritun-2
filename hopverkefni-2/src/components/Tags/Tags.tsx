'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Tag, UiState } from '@/types';
import { TagsApi } from '@/api';
import styles from './page.module.css';

export default function Tags() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [uiState, setUiState] = useState<UiState>('loading');


  useEffect(() => {
    async function fetchTags() {
      setUiState('loading');
      const api = new TagsApi();
      const result = await api.getTags();
        
      if (!result) {
        setUiState('error');
        return;
      }

      if (result.data.length === 0) {
        setUiState('empty');
      } else {
        setTags(result.data);
        setUiState('data');
      }
    }
    
    fetchTags();
  }, []);

  return (
    <div className={styles.tagsPage}>
      <div className={styles.container}>
        <div className={styles.tagsCloud}>
          {tags.map(tag => (
            <Link 
              key={tag.id} 
              href={`/tags/${tag.id}`} 
              className={styles.tagBubble}
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}