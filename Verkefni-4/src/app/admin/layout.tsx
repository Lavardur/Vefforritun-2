import Navigation from '@/components/Navigation/Navigation';
import styles from '../page.module.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}