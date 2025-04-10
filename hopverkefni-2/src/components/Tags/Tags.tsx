import { TagsApi } from "@/api";
import styles from "./Tags.module.css";
import ClientPaginationWrapper from "../Common/ClientPaginationWrapper";
import TagCard from "./TagCard";

interface TagsProps {
  page?: number;
}

export default async function Tags({ page = 1 }: TagsProps) {
  const api = new TagsApi();
  const limit = 24; // Number of tags per page (more than categories since they're smaller)
  const result = await api.getTags(limit, page);
  
  const hasData = result?.data && result.data.length > 0;
  const tags = result?.data || [];
  
  // Calculate total pages from pagination data
  const totalPages = result?.pagination ? Math.ceil(result.pagination.total / limit) : 1;
  
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {!result && (
          <div className={styles.error}>Failed to load tags</div>
        )}
        
        {result && !hasData && (
          <div className={styles.noTags}>No tags found</div>
        )}
        
        {hasData && (
          <>
            <div className={styles.tagsCloud}>
              {tags.map(tag => (
                <TagCard key={tag.id} tag={tag} />
              ))}
            </div>
            
            {/* Only show pagination if there's more than one page */}
            {totalPages > 1 && (
              <div className={styles.paginationContainer}>
                <ClientPaginationWrapper 
                  currentPage={page} 
                  totalPages={totalPages} 
                  basePath="/tags"
                />
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}