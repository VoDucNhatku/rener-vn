import { House } from 'lucide-react';
import styles from './Logo.module.css';
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={styles.logo}>
      <span className={styles.mark} aria-hidden="true">
        <House size={22} strokeWidth={1.8} />
      </span>
      {!compact && (
        <span className={styles.word}>
          ReNER<span className={styles.vn}>VN</span>
        </span>
      )}
    </span>
  );
}
