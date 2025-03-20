import { Category } from '@/components/Category/Category';
import styles from "../../page.module.css";

export default async function FlokkaPage({
  params,
}: {
  params: Promise<{ flokkur: string }>;
}) {
  const { flokkur } = await params;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Category slug={flokkur} />
      </main>
    </div>
  );
}
