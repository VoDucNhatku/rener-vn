import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ApiState } from '@/components/ApiState/ApiState';
import { PriceDistributionBar } from '@/components/PriceDistributionBar/PriceDistributionBar';
import { getComparison } from '@/lib/api/client';
import { errorMessage } from '@/lib/api/http';
import { PROPERTY_LABEL, formatShort } from '@/lib/format';
import styles from '@/app/(renter)/tin/[id]/page.module.css';

export async function ComparisonPanel({ id, demo, targetRent }: { id: string; demo: boolean; targetRent: number | null }) {
  try {
    const c = await getComparison(id, demo);
    return <div className={styles.compareGrid}>
      <div>
        <p className={styles.verdict} data-v={c.verdict ?? 'none'}>{c.message}</p>
        <PriceDistributionBar comparison={c} targetRent={targetRent} />
        <p className={styles.fine}>Nhóm: {PROPERTY_LABEL[c.criteria.property_type ?? 'unknown']} · {c.criteria.ward_name ?? 'chưa rõ phường'} · {c.criteria.basis === 'per_person' ? 'giá/người' : c.criteria.basis === 'per_unit' ? 'giá/phòng' : 'chưa rõ cơ sở giá'} · {c.criteria.broad_group ? 'nhóm rộng, không xét diện tích' : c.criteria.area_band ? `${c.criteria.area_band} m²` : 'chưa rõ diện tích'} · cửa sổ {c.criteria.window_days} ngày. Không chia nhóm theo nội thất.</p>
        <p className={styles.fine}>{c.disclaimer ?? 'Chưa có khoảng thời gian dữ liệu để so sánh. Số liệu là giá chào thuê, không phải giá giao dịch.'}</p>
        {c.is_demo && <p className={styles.fine}>Nhóm so sánh dùng dữ liệu demo.</p>}
      </div>
      <aside className={styles.similar} aria-labelledby="similar-title">
        <h3 id="similar-title">Tin giống nhất</h3>
        {c.similar.length ? <ul>{c.similar.map((s) => <li key={s.listing_id}>
          <Link href={`/tin/${s.listing_id}?demo=${c.is_demo}`}><span className="num">{formatShort(s.rent_vnd)}</span><span>{s.area_m2 != null ? `${s.area_m2} m²` : 'DT chưa rõ'}</span><ArrowUpRight size={14} aria-hidden="true" /></Link>
        </li>)}</ul> : <p className={styles.none}>Chưa có tin tương tự để so.</p>}
      </aside>
    </div>;
  } catch (error) {
    return <ApiState title="Chưa tải được so sánh" message={errorMessage(error)} />;
  }
}
