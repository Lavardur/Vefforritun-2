'use client';

import { useRouter } from 'next/navigation';
import Pagination from './Pagination';

export default function ClientPaginationWrapper({
  currentPage,
  totalPages,
  basePath
}: {
  currentPage: number;
  totalPages: number;
  basePath: string;
}) {
  const router = useRouter();
  
  const handlePageChange = (page: number) => {
    router.push(`${basePath}?page=${page}`);
  };
  
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
}