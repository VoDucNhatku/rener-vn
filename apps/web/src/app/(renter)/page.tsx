import Link from 'next/link';
import { Suspense } from 'react';
import { ArrowRight, FileScan, GitCompareArrows, TextSelect, Eye, Users, ReceiptText } from 'lucide-react';
import { ApiState, LoadingState } from '@/components/ApiState/ApiState';
import { StatusBadge } from '@/components/StatusBadge/StatusBadge';
import { EvidenceHighlighter } from '@/components/EvidenceHighlighter/EvidenceHighlighter';
import { errorMessage } from '@/lib/api/http';
import { parseDemo, type SearchParams } from '@/features/listings/filters';
import { HERO_EXAMPLE, ev } from '@/features/landing/illustrations';
import { ReadingHero } from '@/features/landing/ReadingHero';
import { getStatsOverview } from '@/lib/api/client';
import { formatDate } from '@/lib/format';
import styles from './landing.module.css';

const CASES = [
  {
    text: 'Phòng khép kín 25m2, có gác. Giá ib nhé.',
    quote: '25m2',
    label: 'AREA' as const,
    title: 'Không công khai giá',
    body: '“Ib giá” được ghi là thiếu giá có lý do. Không biến giá thiếu thành 0 đồng.',
    Icon: Eye,
  },
  {
    text: 'Phòng 30m2, giá 1tr5/người/tháng.',
    quote: '1tr5/người/tháng',
    label: 'PRICE' as const,
    title: 'Giá theo người',
    body: 'Giữ đúng cơ sở giá theo người; không nhân lên thành giá cho cả phòng.',
    Icon: Users,
  },
  {
    text: 'Giá 3tr5, điện 3k5/số, nước 100k/người.',
    quote: 'điện 3k5/số',
    label: 'FEE' as const,
    title: 'Phí được tách riêng',
    body: 'Không cộng tiền thuê với phí thành tổng khi chưa biết mức sử dụng.',
    Icon: ReceiptText,
  },
];
export const dynamic = 'force-dynamic';
export default async function HomePage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const demo = parseDemo(await searchParams);
  const href = `/tim-tro${demo === undefined ? '' : `?demo=${demo}`}`;
  return (
    <>
      <ReadingHero detail={HERO_EXAMPLE.detail} demo={demo} />
      <div className="container">
        <Suspense fallback={<LoadingState message="Đang tải số liệu kho…" />}>
          <WarehouseStats demo={demo} />
        </Suspense>
      </div>
      <section className={`container ${styles.section}`} id="cach-hoat-dong" aria-labelledby="method-title">
        <header className={styles.center}>
          <h2 id="method-title">Từ đoạn chữ đến thông tin có căn cứ</h2>
          <p>Ba bước để đọc một tin thuê trọ rõ ràng hơn.</p>
        </header>
        <ol className={styles.steps}>
          <li>
            <FileScan size={24} aria-hidden="true" />
            <h3>1. Đọc nội dung bài đăng</h3>
            <p>Làm việc với văn bản tiếng Việt, giữ đoạn nguồn đã che số điện thoại để đối chiếu.</p>
          </li>
          <li>
            <TextSelect size={24} aria-hidden="true" />
            <h3>2. Tách giá và các khoản phí</h3>
            <p>Regex và Gemini/LLM trích xuất các trường. Mỗi giá trị có bằng chứng trong bài và được đối chiếu.</p>
          </li>
          <li>
            <GitCompareArrows size={24} aria-hidden="true" />
            <h3>3. So với tin tương tự</h3>
            <p>Backend tính trung vị trong cùng nhóm phù hợp. Thiếu dữ liệu thì nêu lý do, chưa đưa ra nhận định.</p>
          </li>
        </ol>
      </section>
      <section className={`container ${styles.section}`} id="nguyen-tac" aria-labelledby="rules-title">
        <header className={styles.sectionHead}>
          <div>
            <h2 id="rules-title">
              Bài viết có thể mơ hồ.
              <br />
              Cách hiển thị cần rõ ràng.
            </h2>
            <p>Các tình huống dưới đây là ví dụ tự tạo, không phải dữ liệu kho.</p>
          </div>
          <StatusBadge>Nguyên tắc dữ liệu</StatusBadge>
        </header>
        <ul className={styles.cases}>
          {CASES.map(({ text, quote, label, title, body, Icon }) => (
            <li key={title}>
              <div className={styles.caseQuote}>
                <EvidenceHighlighter text={text} evidence={[ev(text, quote, label)]} />
              </div>
              <h3>
                <Icon size={17} aria-hidden="true" />
                {title}
              </h3>
              <p>{body}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className={`container ${styles.section}`}>
        <div className={styles.cta}>
          <div>
            <h2>Tìm phòng, rồi kiểm lại từng con số.</h2>
            <p>Đọc giá thuê, phí và đoạn nguồn cùng một nơi. Nhận định chỉ xuất hiện khi nhóm so sánh có đủ dữ liệu.</p>
          </div>
          <Link href={href} className="button-secondary">
            Mở Tìm trọ
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
async function WarehouseStats({ demo }: { demo?: boolean }) {
  try {
    const stats = await getStatsOverview(demo);
    return (
      <section className={styles.stats} aria-label="Số liệu kho">
        <div className={styles.statsHead}>
          <h2>Kho tin hiện có</h2>
          <StatusBadge tone="info">{stats.is_demo ? 'Dữ liệu demo' : 'Dữ liệu thật'}</StatusBadge>
        </div>
        {stats.total_listings > 0 ? (
          <div className={styles.statsData}>
            <p>
              <strong className="num">{stats.total_listings}</strong> tin trong kho
            </p>
            <p>
              <strong className="num">{stats.eligible_listings}</strong> tin đủ điều kiện thống kê
            </p>
            <p>{stats.updated_at ? `Cập nhật ${formatDate(stats.updated_at)}` : 'Chưa rõ ngày cập nhật'}</p>
          </div>
        ) : (
          <p>Kho chưa có tin. Bạn vẫn có thể xem ví dụ tự tạo bên trên.</p>
        )}
        <Link href={`/tim-tro?demo=${stats.is_demo}`} className={styles.statsLink}>
          Xem kho này
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>
    );
  } catch (error) {
    return <ApiState title="Chưa tải được số liệu kho" message={errorMessage(error)} />;
  }
}
