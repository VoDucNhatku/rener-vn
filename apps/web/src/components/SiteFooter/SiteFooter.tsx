import Link from 'next/link';
import { Logo } from '../Logo/Logo';
import styles from './SiteFooter.module.css';

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Logo />
          <p>
            Đồ án TMG301 — trích xuất thông tin bất động sản từ bài đăng mạng xã hội. Số liệu là giá chào thuê trong bài đăng đã
            thu, không phải giá giao dịch.
          </p>
        </div>
        <nav className={styles.cols} aria-label="Liên kết cuối trang">
          <div>
            <h2>Người đi thuê</h2>
            <Link href="/tim-tro">Tìm trọ</Link>
            <Link href="/thi-truong">Thị trường</Link>
            <Link href="/#extension">Cài extension</Link>
          </div>
          <div>
            <h2>Nhóm</h2>
            <Link href="/team/kho">Kho dữ liệu</Link>
            <Link href="/team/duyet">Hàng duyệt</Link>
            <Link href="/team/lab">Lab trích xuất</Link>
          </div>
        </nav>
      </div>
      <div className={`container ${styles.legal}`}>
        <span>
          Bài có nhãn “Ví dụ tự tạo” là bài minh họa. Bài thật chỉ nạp từ máy của nhóm, không đưa lên GitHub, và luôn được che số
          điện thoại.
        </span>
      </div>
    </footer>
  );
}
