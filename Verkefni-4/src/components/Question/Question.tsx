import React, { JSX } from 'react';
import { Question as QuestionType } from '../../types';
import styles from './Question.module.css';

export function Question({
  question,
}: {
  question: QuestionType;
}): JSX.Element {
  const [answerId, setAnswerId] = React.useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = React.useState<boolean>(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);
    console.log('submit, valið svar:', answerId);
  };

  return (
    <div className={styles.questionContainer}>
      <h2 className={styles.questionText}>{question.text}</h2>
      <form onSubmit={onSubmit}>
        <ul className={styles.answersList}>
          {question.answers.map((answer) => {
            const isSelected = answerId === answer.id;
            const showResult = hasSubmitted && isSelected;
            const isCorrect = showResult && answer.correct;
            
            return (
              <li 
                key={answer.id} 
                className={`${styles.answerItem} ${isSelected ? styles.selected : ''}`}
              >
                <input
                  type="radio"
                  name="answer"
                  id={`answer-${answer.id}`}
                  value={answer.id}
                  checked={isSelected}
                  onChange={() => setAnswerId(answer.id)}
                  disabled={hasSubmitted}
                />
                <label 
                  htmlFor={`answer-${answer.id}`} 
                  className={styles.answerText}
                >
                  {answer.text}
                </label>
                
                {showResult && (
                  <span className={isCorrect ? styles.correct : styles.incorrect}>
                    {isCorrect ? 'RÉTT' : 'RANGT'}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
        <button 
          className={styles.submitButton} 
          disabled={answerId === null || hasSubmitted}
        >
          {hasSubmitted ? 'Svarað' : 'Svara'}
        </button>
      </form>
    </div>
  );
}
