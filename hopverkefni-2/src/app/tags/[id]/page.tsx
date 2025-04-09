import React from 'react';
import Posts from '@/components/Posts/Posts';
import styles from './page.module.css';
import { TagsApi } from '@/api';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

type Props = {
  params: {
    id: string;
  };
};

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tagId = parseInt(params.id);
  
  if (isNaN(tagId)) {
    return {
      title: 'Tag Not Found',
      description: 'The requested tag could not be found.'
    };
  }
  
  const api = new TagsApi();
  const tag = await api.getTagById(tagId);
  
  if (!tag) {
    return {
      title: 'Tag Not Found',
      description: 'The requested tag could not be found.'
    };
  }
  
  return {
    title: `Posts tagged with #${tag.name}`,
    description: `Browse all posts with the tag #${tag.name}`
  };
}

export default async function TagDetailPage({ params }: Props) {
  const tagId = parseInt(params.id);
  
  if (isNaN(tagId)) {
    notFound();
  }
  
  const api = new TagsApi();
  const tag = await api.getTagById(tagId);
  
  if (!tag) {
    notFound();
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
            tagId={tagId} 
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