import Link from 'next/link';
import { ArrowDown, ArrowRight, FileText, Search } from 'lucide-react';
import { EvidenceHighlighter } from '@/components/EvidenceHighlighter/EvidenceHighlighter';
import { RentDisplay } from '@/components/RentDisplay/RentDisplay';
import { StatusBadge } from '@/components/StatusBadge/StatusBadge';
import type { ListingDetail } from '@/lib/api/types';
import { feeLine } from '@/lib/format';
import styles from './ReadingHero.module.css';
export function ReadingHero({ detail, demo }: { detail: ListingDetail; demo?: boolean }) {
  const { listing, post } = detail;
  const evidence = [
    ...listing.room.evidence,
    ...listing.area.evidence,
    ...listing.location.evidence,
    ...listing.rent.evidence,
    ...listing.fees.flatMap((f) => f.evidence ?? []),
  ];
  return (
    <section className={`container ${styles.hero}`} aria-labelledby="hero-title">
      <div className={styles.copy}>
        <span className={styles.eyebrow}>
          <span />
          Thông tin thuê trọ, có đoạn nguồn
        </span>
        <h1 id="hero-title">
          Đọc đúng <span>giá thuê.</span>
          <br />
          Hiểu rõ từng khoản phí.
        </h1>
        <p className={styles.lead}>
          Từ bài đăng tiếng Việt đến thông tin rõ ràng. ReNER-VN tách giá, phí, diện tích và giúp bạn so với các tin
          tương tự khi đủ dữ liệu.
        </p>
        <div className={styles.actions}>
          <Link href={`/tim-tro${demo === undefined ? '' : `?demo=${demo}`}`} className="button">
            <Search size={17} aria-hidden="true" />
            Tìm phòng
          </Link>
          <Link href="#cach-hoat-dong" className="button-secondary">
            Cách ReNER đọc bài
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <p className={styles.method}>
          Regex + Gemini/LLM + đối chiếu
          <br />
          <span>Giá thuê và phí luôn được hiển thị riêng.</span>
        </p>
      </div>
      <figure className={styles.example}>
        <figcaption>
          <span className={styles.exampleTitle}>
            <FileText size={18} aria-hidden="true" />
            Từ một bài đăng
          </span>
          <StatusBadge tone="info">Ví dụ tự tạo</StatusBadge>
        </figcaption>
        <div className={styles.post}>
          <EvidenceHighlighter text={post.text} evidence={evidence} />
        </div>
        <div className={styles.flow}>
          <ArrowDown size={18} aria-hidden="true" />
          <span>Trích xuất &amp; chuẩn hóa</span>
        </div>
        <div className={styles.result}>
          <div>
            <p>Giá thuê trong ví dụ</p>
            <RentDisplay rent={listing.rent} />
          </div>
          <div className={styles.area}>
            <span>Diện tích</span>
            <strong>{listing.area.value_m2} m²</strong>
          </div>
        </div>
        <p className={styles.fees}>{feeLine(listing.fees)}</p>
        <p className={styles.disclaimer}>Minh họa cách đọc bài; không phải kết quả xử lý hay thống kê từ API.</p>
      </figure>
    </section>
  );
}
