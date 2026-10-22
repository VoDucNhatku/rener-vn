import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Info } from 'lucide-react';
import { PriceDistributionBar } from '@/components/PriceDistributionBar/PriceDistributionBar';
import { DetailBody } from '@/features/listing-detail/DetailBody';
import { getComparison, getListing } from '@/lib/api/client';
import { PROPERTY_LABEL, dataRangeSentence, formatDate, formatShort, verdictSentence } from '@/lib/format';
import styles from './page.module.css';

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const detail = await getListing((await params).id);
  return { title: detail ? PROPERTY_LABEL[detail.listing.room.property_type] : 'Không tìm thấy tin' };
}

export default async function ListingPage({ params }: { params: Params }) {
  const { id } = await params;
  const [detail, comparison] = await Promise.all([getListing(id), getComparison(id)]);
  if (!detail || !comparison) notFound();

  const { listing, post } = detail;
  const loc = listing.location;
  const place = [loc.landmark, loc.street, loc.ward_name, loc.old_ward_name, loc.old_district_name].filter(Boolean).join(' · ');

  return (
    <div className={`container ${styles.page}`}>
      <Link href="/tim-tro" className={styles.back}>
        <ArrowLeft size={14} aria-hidden="true" /> Về danh sách
      </Link>

      <header className={styles.head}>
        <div className={styles.badges}>
          {detail.origin === 'extension' ? (
            <span className={styles.real}>Bài thật · đã che SĐT</span>
          ) : (
            <span className={styles.example}>Ví dụ tự tạo</span>
          )}
          {!post.text_complete && <span className={styles.partial}>Chữ chưa đầy đủ</span>}
        </div>
        <h1 className={styles.title}>
          {PROPERTY_LABEL[listing.room.property_type]}
          {listing.area.value_m2 != null ? `, ${listing.area.value_m2} m²` : ''}
        </h1>
        <p className={styles.meta}>
          <span>{place || 'Chưa rõ vị trí'}</span>
          <span>{post.posted_at ? `Đăng ${formatDate(post.posted_at)}` : 'Chưa rõ ngày đăng'}</span>
          {post.permalink && (
            <a href={post.permalink} target="_blank" rel="noreferrer noopener">
              Bài gốc <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          )}
        </p>
      </header>

      {!post.text_complete && (
        <p className={styles.notice} role="note">
          <Info size={15} aria-hidden="true" />
          Extension thu bài này khi chưa mở được “Xem thêm”, nên chữ bị cắt. Những gì phần chữ đã thu không nói tới sẽ hiện là
          “Chưa rõ” hoặc “Không đề cập”, không đoán.
        </p>
      )}

      <DetailBody detail={detail} />

      <section className={styles.compare} aria-labelledby="compare-title">
        <h2 id="compare-title" className={styles.h2}>
          So sánh
        </h2>
        <div className={styles.compareGrid}>
          <div>
            <p className={styles.verdict} data-v={comparison.verdict ?? 'none'}>
              {verdictSentence(comparison, listing.rent.amount_form, listing.rent.visibility)}
            </p>
            <PriceDistributionBar comparison={comparison} targetRent={listing.rent.amount_vnd ?? null} />
            <p className={styles.fine}>{dataRangeSentence(comparison.data_from, comparison.data_to)}</p>
          </div>
          <aside className={styles.similar} aria-labelledby="similar-title">
            <h3 id="similar-title">Tin giống nhất</h3>
            {comparison.similar.length ? (
              <ul>
                {comparison.similar.map((s) => (
                  <li key={s.listing_id}>
                    <Link href={`/tin/${s.listing_id}`}>
                      <span className="num">{formatShort(s.rent_vnd)}</span>
                      <span>{s.area_m2 != null ? `${s.area_m2} m²` : 'DT chưa rõ'}</span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.none}>Chưa có tin tương tự để so.</p>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}
