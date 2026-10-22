import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { EyeOff, SearchX, X } from 'lucide-react';
import { FilterBar } from '@/features/listings/FilterBar';
import { ListingGrid } from '@/features/listings/ListingGrid';
import { parseFilters, type SearchParams } from '@/features/listings/filters';
import { WARDS, getListings } from '@/lib/api/client';
import { PROPERTY_LABEL, formatDate } from '@/lib/format';
import styles from './page.module.css';

export const metadata: Metadata = { title: 'Tìm trọ' };

const FILTER_LABELS: Record<string, (v: string) => string> = {
  phuong: (v) => v,
  loai: (v) => PROPERTY_LABEL[v as keyof typeof PROPERTY_LABEL] ?? v,
  gia_min: (v) => `Giá từ ${v} tr`,
  gia_max: (v) => `Giá đến ${v} tr`,
  dt_min: (v) => `DT từ ${v} m²`,
  dt_max: (v) => `DT đến ${v} m²`,
  co_gia: () => 'Chỉ tin có giá',
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const data = await getListings(parseFilters(sp));

  // Each active condition becomes a removable chip in the empty state.
  const active: { key: string; value: string; href: string }[] = [];
  for (const [key, raw] of Object.entries(sp)) {
    if (!FILTER_LABELS[key]) continue;
    for (const value of Array.isArray(raw) ? raw : [raw ?? '']) {
      const next = new URLSearchParams();
      for (const [k, r] of Object.entries(sp)) for (const v of Array.isArray(r) ? r : [r ?? '']) if (!(k === key && v === value)) next.append(k, v);
      active.push({ key, value, href: `/tim-tro${next.size ? `?${next}` : ''}` });
    }
  }

  return (
    <div className={`container ${styles.page}`}>
      <header className={styles.head}>
        <h1 className={styles.title}>Tìm trọ</h1>
        <p className={styles.meta}>
          Dữ liệu cập nhật {formatDate(data.data_as_of)} · giá chào thuê trong bài đăng, không phải giá giao dịch
        </p>
      </header>

      <Suspense>
        <FilterBar wards={WARDS} />
      </Suspense>

      <div className={styles.summary} aria-live="polite">
        <p>
          <strong className="num">{data.total}</strong> tin phù hợp
        </p>
        {data.hidden_no_price > 0 && (
          <p className={styles.hidden}>
            <EyeOff size={14} aria-hidden="true" /> {data.hidden_no_price} tin không có giá cụ thể bị ẩn vì đang lọc theo giá
          </p>
        )}
      </div>

      {data.items.length > 0 ? (
        <ListingGrid items={data.items} />
      ) : (
        <div className={styles.empty}>
          <SearchX size={28} strokeWidth={1.5} aria-hidden="true" />
          <h2>Không có tin nào khớp đủ các điều kiện</h2>
          <p>Bỏ bớt từng điều kiện dưới đây để xem thêm tin:</p>
          <ul className={styles.remove}>
            {active.map((a) => (
              <li key={`${a.key}-${a.value}`}>
                <Link href={a.href} scroll={false}>
                  {FILTER_LABELS[a.key](a.value)} <X size={13} aria-label="bỏ điều kiện" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
