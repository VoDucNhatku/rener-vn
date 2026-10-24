'use client';
import Link from 'next/link';
import { Info } from 'lucide-react';
import { useDatasetHref } from '@/lib/useDatasetHref';
import { Logo } from '../Logo/Logo';
import styles from './SiteFooter.module.css';
export function SiteFooter() {
  const scoped = useDatasetHref();
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.notice}>
          <Info size={19} aria-hidden="true" />
          <p>
            <strong>Lưu ý dữ liệu:</strong> Số liệu là giá chào thuê trong bài đăng, không phải giá giao dịch. Bạn cần
            kiểm tra thực tế trước khi đặt cọc. Tin có nhãn “Ví dụ tự tạo” thuộc bộ demo.
          </p>
        </div>
        <div className={styles.row}>
          <Link href={scoped('/')} aria-label="ReNER-VN — trang chủ">
            <Logo />
          </Link>
          <nav aria-label="Liên kết cuối trang">
            <Link href={scoped('/tim-tro')}>Tìm trọ</Link>
            <Link href={scoped('/#cach-hoat-dong')}>Phương pháp</Link>
            <Link href={scoped('/#nguyen-tac')}>Nguyên tắc dữ liệu</Link>
          </nav>
          <p>
            ReNER-VN · Đồ án TMG301
            <br />
            Regex + Gemini/LLM + đối chiếu
          </p>
        </div>
      </div>
    </footer>
  );
}
