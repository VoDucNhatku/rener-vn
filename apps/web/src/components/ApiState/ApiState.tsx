import { RetryButton } from './RetryButton';
import styles from './state.module.css';
import { CircleAlert } from 'lucide-react';

export function ApiState({ title, message, reset }: { title: string; message: string; reset?: () => void }) {
  return (
    <div className={styles.state} role="alert">
      <CircleAlert size={22} aria-hidden="true" />
      <h2>{title}</h2>
      <p>{message}</p>
      <RetryButton reset={reset} />
    </div>
  );
}
export function LoadingState({ message = 'Đang tải dữ liệu…' }: { message?: string }) {
  return (
    <div className={styles.loading} role="status" aria-live="polite">
      <p>{message}</p>
      <span />
      <span />
      <span />
    </div>
  );
}
