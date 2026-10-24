'use client';
import Link, { useLinkStatus } from 'next/link';
import { ArrowRight, MapPin, Ruler, FileText } from 'lucide-react';
import { RentDisplay } from '@/components/RentDisplay/RentDisplay';
import { StatusBadge } from '@/components/StatusBadge/StatusBadge';
import type { ListingCard as Card } from '@/lib/api/types';
import { PROPERTY_LABEL, cardVerdict, feeLine, formatDate } from '@/lib/format';
import styles from './ListingCard.module.css';
export function ListingCard({ card }: { card: Card }) {
  const verdict = cardVerdict(card);
  return (
    <Link href={`/tin/${card.listing_id}?demo=${card.is_demo}`} className={styles.card}>
      <div className={styles.overview}>
        <span className={styles.type}>
          <FileText size={15} aria-hidden="true" />
          {PROPERTY_LABEL[card.property_type]}
        </span>
        <span className={styles.area}>
          <Ruler size={17} aria-hidden="true" />
          {card.area_m2 != null ? `${card.area_m2} m²` : 'Chưa rõ diện tích'}
        </span>
        <p className={styles.place}>
          <MapPin size={14} aria-hidden="true" />
          <span>
            {card.ward_name ?? 'Chưa rõ phường'}
            {card.landmark ? ` · ${card.landmark}` : ''}
          </span>
        </p>
      </div>
      <div className={styles.body}>
        <div className={styles.badges}>
          <StatusBadge tone={card.is_demo ? 'neutral' : 'info'}>
            {card.is_demo ? 'Ví dụ tự tạo' : 'Đã che SĐT'}
          </StatusBadge>
          {!card.text_complete && <StatusBadge tone="warning">Chữ chưa đầy đủ</StatusBadge>}
        </div>
        <RentDisplay rent={card.rent} />
        <div className={styles.fees}>
          <span>Phí riêng</span>
          <p>{feeLine(card.fees)}</p>
        </div>
        <p className={styles.verdict} data-v={card.verdict ?? 'none'}>
          {verdict ?? 'Chưa có nhận định'}
        </p>
        <p className={styles.date}>{card.posted_at ? `Đăng ${formatDate(card.posted_at)}` : 'Chưa rõ ngày đăng'}</p>
        <div className={styles.foot}>
          <span>Xem tin &amp; bằng chứng</span>
          <OpeningIndicator />
        </div>
      </div>
    </Link>
  );
}
function OpeningIndicator() {
  const { pending } = useLinkStatus();
  return pending ? <span role="status">Đang mở tin…</span> : <ArrowRight size={16} aria-hidden="true" />;
}
