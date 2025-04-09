import Link from 'next/link';
import { TagsApi } from '@/api';
import styles from './Tags.module.css';

export default async function Tags() {
  const api = new TagsApi();
  const result = await api.getTags();
  
  const hasData = result?.data && result.data.length > 0;
  const tags = result?.data || [];

  return (
    <div className={styles.tagsPage}>
      <div className={styles.container}>
        {!result && (
          <div className={styles.error}>Failed to load tags</div>
        )}
        
        {result && !hasData && (
          <div className={styles.noTags}>No tags found</div>
        )}
        
        {hasData && (
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
        )}
      </div>
    </div>
  );
}