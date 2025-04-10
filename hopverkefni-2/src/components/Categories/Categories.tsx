import { CategoriesApi } from "@/api";
import styles from "./Categories.module.css";
import ClientPaginationWrapper from "../Common/ClientPaginationWrapper";
import CategoryCard from "./CategoryCard";

interface CategoryProps {
  page?: number;
}

export default async function Categories({
   page = 1 
  }: CategoryProps) {
  const api = new CategoriesApi();
  const result = await api.getCategories(12, page);

  const categories = result?.data || [];
  const totalPages = result?.pagination ? result.pagination.totalPages : 1;
  
  const hasData = result?.data && result.data.length > 0;

  
  // Calculate total pages from pagination data

  
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
                <CategoryCard key={category.id} category={category} />
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
