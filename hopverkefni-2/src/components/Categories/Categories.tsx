import Link from "next/link";
import { CategoriesApi } from "@/api";
import styles from "./Categories.module.css";

export default async function Categories() {
  const api = new CategoriesApi();
  const result = await api.getCategories();
  
  const hasData = result?.data && result.data.length > 0;
  const categories = result?.data || [];
  
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Categories</h1>

        {!result && (
          <div className={styles.error}>Failed to load categories</div>
        )}

        {result && !hasData && (
          <div className={styles.empty}>No categories found</div>
        )}

        {hasData && (
          <div className={styles.categoriesGrid}>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className={styles.categoryCard}
              >
                <h2 className={styles.categoryTitle}>{category.name}</h2>
                {category.description && (
                  <p className={styles.categoryDescription}>
                    {category.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
