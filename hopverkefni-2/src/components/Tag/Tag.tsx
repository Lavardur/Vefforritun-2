'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Tag } from '@/types';
import { TagsApi } from '@/api';
import Posts from '@/components/Posts/Posts';
import styles from './page.module.css';

interface TagProps {
  tagId: number;
}

export default function Tag({ tagId }: TagProps) {
  const [tag, setTag] = useState<Tag | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [parsedTagId, setParsedTagId] = useState<number | null>(null);

  // Parse the tag ID
  useEffect(() => {
    if (tagId) {
      setParsedTagId(tagId);
    } else {
      setParsedTagId(null);
    }
  }, [tagId]);

  useEffect(() => {
    const fetchTag = async () => {
      if (!parsedTagId) {
        setError('Tag ID is missing or invalid');
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        const api = new TagsApi();
        const tagData = await api.getTagById(parsedTagId);
        
        if (tagData) {
          setTag(tagData);
          setError(null);
        } else {
          setError('Tag not found');
          setTag(null);
        }
      } catch (err) {
        console.error('Error fetching tag:', err);
        setError('An error occurred while fetching the tag');
        setTag(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTag();
  }, [parsedTagId]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading tag...</div>
      </div>
    );
  }

  if (error || !tag || !parsedTagId) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          {error || 'Tag not found'}
          <div className={styles.backLink}>
            <Link href="/tags">Back to Tags</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.tagDetail}>
      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <Link href="/">Home</Link> / <Link href="/tags">Tags</Link> / <span>#{tag.name}</span>
        </div>
        
        <div className={styles.tagHeader}>
          <h1 className={styles.title}>#{tag.name}</h1>
        </div>
        
        <div className={styles.postsSection}>
          <Posts 
            tagId={parsedTagId} 
            title={`Posts tagged with #${tag.name}`} 
          />
        </div>
        
        <div className={styles.backLink}>
          <Link href="/tags">← Back to Tags</Link>
        </div>
      </div>
    </div>
  );
}