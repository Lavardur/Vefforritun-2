'use client';

import { QuestionsApi } from '@/api';
import { Category, UiState } from '@/types';
import { useEffect, useState } from 'react';
import styles from './Categories.module.css';
import Link from 'next/link';

interface CategoriesProps {
  title: string;
}

export default function Categories({ title }: CategoriesProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [uiState, setUiState] = useState<UiState>('loading');

  useEffect(() => {
    async function fetchCategories() {
      setUiState('loading');
      const api = new QuestionsApi();
      const result = await api.getCategories();

      if (!result) {
        setUiState('error');
        return;
      }

      if (result.data.length === 0) {
        setUiState('empty');
      } else {
        setCategories(result.data);
        setUiState('data');
      }
    }

    fetchCategories();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>

        {uiState === 'loading' && (
          <div className={styles.loading}>Sæki flokka...</div>
        )}

        {uiState === 'error' && (
          <div className={styles.error}>Villa við að sækja flokka</div>
        )}

        {uiState === 'empty' && (
          <div className={styles.empty}>Engir flokkar fundust</div>
        )}

        {uiState === 'data' && (
          <div className={styles.categoryGrid}>
            {categories.map((category) => (
              <Link 
                href={`/flokkar/${category.slug}`} 
                key={category.id}
                className={styles.categoryCard}
              >
                <h2>{category.name}</h2>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
