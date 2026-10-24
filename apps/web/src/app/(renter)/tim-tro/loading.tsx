import styles from './loading.module.css';
export default function Loading() {
  return (
    <div className={`container ${styles.page}`} aria-busy="true" role="status" aria-label="Đang tải danh sách tin">
      <span className="visually-hidden">Đang tải danh sách tin…</span>
      <div className={styles.title} aria-hidden="true" />
      <div className={styles.layout} aria-hidden="true">
        <div className={styles.bar} />
        <div className={styles.grid}>
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className={styles.card}>
              <div />
              <span />
              <span />
              <span />
              <span />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
