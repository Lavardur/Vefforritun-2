import Link from "next/link";
import { CategoriesApi } from "@/api";
import styles from "./Categories.module.css";
import ClientPaginationWrapper from "../Common/ClientPaginationWrapper";

interface CategoryProps {
  page?: number;
}

export default async function Categories({ page = 1 }: CategoryProps) {
  const api = new CategoriesApi();
  const limit = 12; // Number of categories per page
  const result = await api.getCategories(limit, page);
  
  const hasData = result?.data && result.data.length > 0;
  const categories = result?.data || [];
  
  // Calculate total pages from pagination data
  const totalPages = result?.pagination ? Math.ceil(result.pagination.total / limit) : 1;
  
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
          <>
            <div className={styles.categoriesGrid}>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className={styles.categoryCard}
                >
                  <h2 className={styles.categoryTitle}>{category.name}</h2>
                </Link>
              ))}
            </div>
            
            {/* Only show pagination if there's more than one page */}
            {totalPages > 1 && (
              <div className={styles.paginationContainer}>
                <ClientPaginationWrapper 
                  currentPage={page} 
                  totalPages={totalPages} 
                  basePath="/categories"
                />
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
