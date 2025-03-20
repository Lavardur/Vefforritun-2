'use client';

import { QuestionsApi } from '@/api';
import { Category, Paginated, UiState } from '@/types';
import { useEffect, useState } from 'react';
import styles from './Categories.module.css';

export default function CategoriesAdmin() {
  const [uiState, setUiState] = useState<UiState>('initial');
  const [categories, setCategories] = useState<Paginated<Category> | null>(null);
  const [newCategory, setNewCategory] = useState({ name: '' });
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setUiState('loading');
    const api = new QuestionsApi();
    const response = await api.getCategories();

    if (!response) {
      setUiState('error');
      setErrorMessage('Villa við að sækja flokka');
    } else {
      setUiState('data');
      setCategories(response);
    }
  }

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    
    try {
      const api = new QuestionsApi();
      const result = await api.createCategory(newCategory.name);
      
      if (result) {
        fetchCategories();
        setNewCategory({ name: '' });
      } else {
        setErrorMessage('Villa við að bæta við flokk');
      }
    } catch (error) {
      setErrorMessage('Villa við að bæta við flokk');
      console.error(error);
    }
  };

  const handleEditCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    
    if (!editCategory) return;
    
    try {
      const api = new QuestionsApi();
      const result = await api.updateCategory(editCategory.slug, editCategory.name);
      
      if (result) {
        fetchCategories();
        setEditCategory(null);
      } else {
        setErrorMessage('Villa við að uppfæra flokk');
      }
    } catch (error) {
      setErrorMessage('Villa við að uppfæra flokk');
      console.error(error);
    }
  };

  const handleDeleteCategory = async (slug: string) => {
    if (!confirm('Ertu viss um að þú viljir eyða þessum flokk?')) {
      return;
    }
    
    setErrorMessage(null);
    
    try {
      const api = new QuestionsApi();
      const success = await api.deleteCategory(slug);
      
      if (success) {
        fetchCategories();
      } else {
        setErrorMessage('Villa við að eyða flokk');
      }
    } catch (error) {
      setErrorMessage('Villa við að eyða flokk');
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Flokkar</h2>
      
      {errorMessage && (
        <div className={styles.error}>{errorMessage}</div>
      )}
      
      <div className={styles.formContainer}>
        <h3>Bæta við nýjum flokk</h3>
        <form onSubmit={handleAddCategory}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Heiti flokks:</label>
            <input 
              type="text" 
              id="name" 
              value={newCategory.name}
              onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
              required
            />
          </div>
          <button type="submit" className={styles.button}>Bæta við</button>
        </form>
      </div>

      {uiState === 'loading' && <div className={styles.loading}>Sæki flokka...</div>}
      {uiState === 'error' && <div className={styles.error}>Villa við að sækja flokka</div>}
      {uiState === 'data' && categories && (
        <div className={styles.categoryList}>
          <h3>Núverandi flokkar</h3>
          {categories.data.length === 0 ? (
            <div className={styles.empty}>Engir flokkar fundust</div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Heiti</th>
                  <th>Slóðaheiti (slug)</th>
                  <th>Aðgerðir</th>
                </tr>
              </thead>
              <tbody>
                {categories.data.map((category) => (
                  <tr key={category.id}>
                    <td>{category.name}</td>
                    <td>{category.slug}</td>
                    <td className={styles.actions}>
                      <button 
                        onClick={() => setEditCategory(category)}
                        className={styles.editButton}
                      >
                        Breyta
                      </button>
                      <button 
                        onClick={() => handleDeleteCategory(category.slug)}
                        className={styles.deleteButton}
                      >
                        Eyða
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {editCategory && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Breyta flokk</h3>
            <form onSubmit={handleEditCategory}>
              <div className={styles.formGroup}>
                <label htmlFor="editName">Heiti flokks:</label>
                <input 
                  type="text" 
                  id="editName" 
                  value={editCategory.name}
                  onChange={(e) => setEditCategory({...editCategory, name: e.target.value})}
                  required
                />
              </div>
              <div className={styles.buttonGroup}>
                <button type="submit" className={styles.button}>Vista</button>
                <button 
                  type="button" 
                  onClick={() => setEditCategory(null)}
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