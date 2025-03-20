'use client';

import { QuestionsApi } from '@/api';
import { Question as TQuestion, UiState } from '@/types';
import { JSX, useEffect, useState } from 'react';
import { Question } from '../Question/Question';
import styles from './Category.module.css';

export function Category({ slug }: { slug: string }): JSX.Element {
  const [uiState, setUiState] = useState<UiState>('initial');
  const [questions, setQuestions] = useState<TQuestion[]>([]);
  const [categoryName, setCategoryName] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      setUiState('loading');
      const api = new QuestionsApi();
      const response = await api.getQuestions(slug);

      if (!response) {
        setUiState('error');
        return;
      }
      
      setCategoryName(slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '));
      
      if (response.data.length === 0) {
        setUiState('empty');
      } else {
        setUiState('data');
        setQuestions(response.data);
      }
    }
    fetchData();
  }, [slug]);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{categoryName || 'Spurningar'}</h1>
      
      {uiState === 'loading' && (
        <div className={styles.loading}>Sæki gögn...</div>
      )}
      
      {uiState === 'error' && (
        <div className={styles.error}>Villa við að sækja gögn</div>
      )}
      
      {uiState === 'empty' && (
        <div className={styles.empty}>Engar spurningar fundust í þessum flokki</div>
      )}
      
      {uiState === 'initial' && (
        <div className={styles.message}>Vinsamlegast veldu flokk</div>
      )}
      
      {uiState === 'data' && (
        <div className={styles.questionsContainer}>
          {questions.map((question) => (
            <Question key={question.id} question={question} />
          ))}
        </div>
      )}
    </div>
  );
}
