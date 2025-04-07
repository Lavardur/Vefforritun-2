"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Category, UiState } from "@/types";
import { CategoriesApi } from "@/api";
import styles from "./page.module.css";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [uiState, setUiState] = useState<UiState>("loading");

  useEffect(() => {
    async function fetchCategories() {
      setUiState("loading");
      const api = new CategoriesApi();

      const result = await api.getCategories();

      if (!result) {
        setUiState("error");
        return;
      }

      if (result.data.length === 0) {
        setUiState("empty");
      } else {
        setCategories(result.data);
        setUiState("data");
      }
    }
    fetchCategories();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.container}>

        {uiState === "loading" && (
          <div className={styles.loading}>Sæki flokka...</div>
        )}

        {uiState === "error" && (
          <div className={styles.error}>Villa við að sækja flokka</div>
        )}

        {uiState === "empty" && (
          <div className={styles.empty}>Engir flokkar fundust</div>
        )}

        {uiState === "data" && (
          <div className={styles.categoriesPage}>
            <div className={styles.container}>
              <div className={styles.categoriesGrid}>
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.id}`}
                    className={styles.categoryCard}
                  >
                    <h2 className={styles.categoryTitle}>{category.name}</h2>
                    {category.id && (
                      <p className={styles.categoryDescription}>
                        {category.id}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
