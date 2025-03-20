'use client';

import { QuestionsApi } from '@/api';
import {Category, Question, UiState } from '@/types';
import { useEffect, useState } from 'react';
import styles from './Questions.module.css';

export default function QuestionsAdmin() {
  const [uiState, setUiState] = useState<UiState>('initial');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [editQuestion, setEditQuestion] = useState<Question | null>(null);
  const [newQuestion, setNewQuestion] = useState<{
    text: string;
    categoryId: string;
    answers: {text: string; correct: boolean}[];
  }>({
    text: '',
    categoryId: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false },
      { text: '', correct: false },
      { text: '', correct: false }
    ]
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchQuestions(selectedCategory);
      
      // Update the categoryId in the newQuestion form
      const categoryId = categories.find(cat => cat.slug === selectedCategory)?.id;
      if (categoryId) {
        setNewQuestion(prev => ({
          ...prev,
          categoryId: categoryId.toString()
        }));
      }
    }
  }, [selectedCategory, categories]);

  async function fetchCategories() {
    const api = new QuestionsApi();
    const response = await api.getCategories();
    
    if (response) {
      setCategories(response.data);
      if (response.data.length > 0) {
        setSelectedCategory(response.data[0].slug);
      }
    }
  }

  async function fetchQuestions(categorySlug: string) {
    setUiState('loading');
    const api = new QuestionsApi();
    const response = await api.getQuestions(categorySlug);

    if (!response) {
      setUiState('error');
    } else if (response.data.length === 0) {
      setUiState('empty');
      setQuestions([]);
    } else {
      setUiState('data');
      setQuestions(response.data);
    }
  }

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const api = new QuestionsApi();
      
      // Find the category ID for the selected category slug
      const category = categories.find(cat => cat.slug === selectedCategory);
      const categoryId = category?.id;
      
      if (!categoryId) {
        console.error('Could not find category ID for the selected category');
        return;
      }
      
      console.log('Creating question:');
      console.log('- Text:', newQuestion.text);
      console.log('- Category ID:', categoryId);
      console.log('- Answers:', newQuestion.answers);
      
      // Create the question
      const result = await api.createQuestion(
        newQuestion.text,
        categoryId.toString(), // Keep the toString()
        newQuestion.answers
      );
      
      if (result) {
        console.log('Question created successfully:', result);
        // Refresh the questions list
        fetchQuestions(selectedCategory);
        // Reset the form
        resetNewQuestion();
      } else {
        console.error('Failed to create question');
      }
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };

  const handleEditQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editQuestion) return;
    
    try {
      const api = new QuestionsApi();
      
      // Update the question
      const result = await api.updateQuestion(
        editQuestion.id,
        editQuestion.text,
        editQuestion.answers
      );
      
      if (result) {
        // Refresh the questions list
        fetchQuestions(selectedCategory);
        // Close the edit modal
        setEditQuestion(null);
      } else {
        console.error('Failed to update question');
        // You might want to show an error message to the user
      }
    } catch (error) {
      console.error('Error updating question:', error);
      // You might want to show an error message to the user
    }
  };

  const handleDeleteQuestion = async (id: number) => {
    if (confirm('Ertu viss um að þú viljir eyða þessari spurningu?')) {
      try {
        const api = new QuestionsApi();
        
        // Delete the question
        const success = await api.deleteQuestion(id);
        
        if (success) {
          // Refresh the questions list
          fetchQuestions(selectedCategory);
        } else {
          console.error('Failed to delete question');
          // You might want to show an error message to the user
        }
      } catch (error) {
        console.error('Error deleting question:', error);
        // You might want to show an error message to the user
      }
    }
  };

  const resetNewQuestion = () => {
    const categoryId = categories.find(cat => cat.slug === selectedCategory)?.id;
    
    setNewQuestion({
      text: '',
      categoryId: categoryId ? categoryId.toString() : '',
      answers: [
        { text: '', correct: true },
        { text: '', correct: false },
        { text: '', correct: false },
        { text: '', correct: false }
      ]
    });
  };

  const updateNewAnswer = (index: number, text: string, correct?: boolean) => {
    const updatedAnswers = [...newQuestion.answers];
    
    if (correct !== undefined) {
      updatedAnswers.forEach((a, i) => {
        updatedAnswers[i] = {...a, correct: i === index};
      });
    } else {
      updatedAnswers[index] = {...updatedAnswers[index], text};
    }
    
    setNewQuestion({...newQuestion, answers: updatedAnswers});
  };

  const updateEditAnswer = (index: number, text: string, correct?: boolean) => {
    if (!editQuestion) return;
    
    const updatedAnswers = [...editQuestion.answers];
    
    if (correct !== undefined) {
      updatedAnswers.forEach((a, i) => {
        updatedAnswers[i] = {...a, correct: i === index};
      });
    } else {
      updatedAnswers[index] = {...updatedAnswers[index], text};
    }
    
    setEditQuestion({...editQuestion, answers: updatedAnswers});
  };

  return (
    <div className={styles.container}>
      <h2>Spurningar</h2>
      <div className={styles.categorySelector}>
        <label htmlFor="categorySelect">Veldu flokk:</label>
        <select 
          id="categorySelect"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category.id} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className={styles.formContainer}>
        <h3>Bæta við nýrri spurningu</h3>
        <form onSubmit={handleAddQuestion}>
          <div className={styles.formGroup}>
            <label htmlFor="question">Spurning:</label>
            <textarea 
              id="question" 
              value={newQuestion.text}
              onChange={(e) => setNewQuestion({...newQuestion, text: e.target.value})}
              required
            />
          </div>
          
          <h4>Svör</h4>
          <div className={styles.answersContainer}>
            {newQuestion.answers.map((answer, index) => (
              <div key={index} className={styles.answerGroup}>
                <div className={styles.answerInput}>
                  <input 
                    type="text" 
                    placeholder={`Svar ${index + 1}`}
                    value={answer.text}
                    onChange={(e) => updateNewAnswer(index, e.target.value)}
                    required
                  />
                </div>
                <div className={styles.correctAnswer}>
                  <input 
                    type="radio"
                    name="correctAnswer"
                    checked={answer.correct}
                    onChange={() => updateNewAnswer(index, answer.text, true)}
                  />
                  <label>Rétt svar</label>
                </div>
              </div>
            ))}
          </div>
          
          <button type="submit" className={styles.button}>Bæta við</button>
        </form>
      </div>

      {uiState === 'loading' && <div className={styles.loading}>Sæki spurningar...</div>}
      {uiState === 'error' && <div className={styles.error}>Villa við að sækja spurningar</div>}
      {uiState === 'empty' && <div className={styles.empty}>Engar spurningar í þessum flokki</div>}
      {uiState === 'data' && (
        <div className={styles.questionsList}>
          <h3>Núverandi spurningar</h3>
          {questions.map((question) => (
            <div key={question.id} className={styles.questionItem}>
              <div className={styles.questionText}>{question.text}</div>
              <div className={styles.questionAnswers}>
                {question.answers.map((answer, index) => (
                  <div key={index} className={`${styles.answerItem} ${answer.correct ? styles.correctAnswer : ''}`}>
                    {answer.text} {answer.correct && <span>(Rétt)</span>}
                  </div>
                ))}
              </div>
              <div className={styles.questionActions}>
                <button 
                  onClick={() => setEditQuestion(question)}
                  className={styles.editButton}
                >
                  Breyta
                </button>
                <button 
                  onClick={() => handleDeleteQuestion(question.id)}
                  className={styles.deleteButton}
                >
                  Eyða
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editQuestion && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Breyta spurningu</h3>
            <form onSubmit={handleEditQuestion}>
              <div className={styles.formGroup}>
                <label htmlFor="editQuestion">Spurning:</label>
                <textarea 
                  id="editQuestion" 
                  value={editQuestion.text}
                  onChange={(e) => setEditQuestion({...editQuestion, text: e.target.value})}
                  required
                />
              </div>
              
              <h4>Svör</h4>
              <div className={styles.answersContainer}>
                {editQuestion.answers.map((answer, index) => (
                  <div key={index} className={styles.answerGroup}>
                    <div className={styles.answerInput}>
                      <input 
                        type="text" 
                        value={answer.text}
                        onChange={(e) => updateEditAnswer(index, e.target.value)}
                        required
                      />
                    </div>
                    <div className={styles.correctAnswer}>
                      <input 
                        type="radio"
                        name="editCorrectAnswer"
                        checked={answer.correct}
                        onChange={() => updateEditAnswer(index, answer.text, true)}
                      />
                      <label>Rétt svar</label>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className={styles.buttonGroup}>
                <button type="submit" className={styles.button}>Vista</button>
                <button 
                  type="button" 
                  onClick={() => setEditQuestion(null)}
                  className={styles.cancelButton}
                >
                  Hætta við
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}