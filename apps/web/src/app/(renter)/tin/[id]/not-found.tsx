'use client';
import Link from 'next/link';
import { FileQuestion } from 'lucide-react';
import { useDatasetHref } from '@/lib/useDatasetHref';
import styles from './page.module.css';
export default function NotFound() {
  const scoped = useDatasetHref();
  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.head}>
        <FileQuestion size={32} aria-hidden="true" />
        <h1 className={styles.title}>Không tìm thấy tin</h1>
        <p className={styles.fine}>Tin không tồn tại hoặc chưa được công khai trong kho đang chọn.</p>
        <Link href={scoped('/tim-tro')} className="button-secondary" style={{ marginTop: 24 }}>
          Về Tìm trọ
        </Link>
      </div>
    </div>
  );
}
