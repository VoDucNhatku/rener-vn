'use client';

import Link from 'next/link';
import { useLayoutEffect, useRef, useState } from 'react';
import { ArrowRight, Puzzle, MoreHorizontal, ThumbsUp, MessageCircle } from 'lucide-react';
import { EvidenceHighlighter } from '@/components/EvidenceHighlighter/EvidenceHighlighter';
import type { Comparison, ListingDetail } from '@/lib/api/types';
import { FEE_LABEL, PROPERTY_LABEL, dataRangeSentence, feeValue, formatShort, formatVnd, verdictSentence } from '@/lib/format';
import styles from './ReadingHero.module.css';

const STEPS = ['Bài gốc', 'Gán nhãn', 'Chuẩn hóa', 'So sánh'];

interface Props {
  detail: ListingDetail;
  comparison: Comparison;
}

/**
 * Pinned, scroll-scrubbed explainer: a rental post is read in four beats.
 * Everything renders in its final state first; GSAP only adds motion on wide screens
 * without prefers-reduced-motion, so content stays readable with JS or motion off.
 */
export function ReadingHero({ detail, comparison }: Props) {
  const { listing, post } = detail;
  const rootRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);

  const evidence = [
    ...(listing.room.evidence ?? []),
    ...(listing.area.evidence ?? []),
    ...(listing.location.evidence ?? []),
    ...(listing.rent.evidence ?? []),
    ...listing.fees.flatMap((f) => f.evidence ?? []),
  ];

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    // Code-split GSAP so the first paint never waits for it.
    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1000px) and (prefers-reduced-motion: no-preference)', () => {
        root.dataset.motion = 'on';
        const marks = q('[data-hero-post] [data-label]');
        const tags = q('[data-hero-post] [data-label] > span:first-child');
        const rows = q('[data-sheet-row]');

        gsap.set(q('[data-tilt]'), { transformPerspective: 1100 });
        gsap.set(q('[data-hero-post]'), { x: 150, y: 40, rotation: -1.5, scale: 1.04 });
        gsap.set(q('[data-sheet]'), { autoAlpha: 0, x: 60, rotation: 2 });
        gsap.set(rows, { autoAlpha: 0, x: 16 });
        gsap.set(q('[data-verdict]'), { autoAlpha: 0, y: 80 });
        gsap.set(q('[data-bar-iqr]'), { scaleX: 0 });
        gsap.set(q('[data-bar-target]'), { autoAlpha: 0, left: '0%' });
        gsap.set(marks, { backgroundSize: '0% 100%' });
        gsap.set(tags, { autoAlpha: 0, y: 4 });
        gsap.set(q('[data-beat]:not([data-beat="0"])'), { autoAlpha: 0, y: 28 });

        const beat = (n: number) => q(`[data-beat="${n}"]`);
        const tl = gsap.timeline({
          defaults: { ease: 'power2.out' },
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: '+=2400',
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => setStep(Math.min(3, Math.floor(self.progress * 4 + 0.1))),
          },
        });

        // Beat 1 — the highlighter sweeps across each span, labels appear above.
        tl.to(beat(0), { autoAlpha: 0, y: -28, duration: 0.5 })
          .to(beat(1), { autoAlpha: 1, y: 0, duration: 0.5 }, '<0.2')
          .to(q('[data-hero-post]'), { x: 40, y: 10, rotation: 0, scale: 1, duration: 1 }, '<')
          .to(marks, { backgroundSize: '100% 100%', duration: 0.35, stagger: 0.12, ease: 'none' }, '<0.2')
          .to(tags, { autoAlpha: 1, y: 0, duration: 0.25, stagger: 0.12 }, '<0.1')
          // Beat 2 — post steps back, the normalised sheet comes in row by row.
          .to(beat(1), { autoAlpha: 0, y: -28, duration: 0.5 }, '+=0.4')
          .to(beat(2), { autoAlpha: 1, y: 0, duration: 0.5 }, '<0.2')
          .to(q('[data-hero-post]'), { x: -60, y: 20, scale: 0.88, duration: 0.9 }, '<')
          .to(q('[data-sheet]'), { autoAlpha: 1, x: 0, rotation: 0, duration: 0.8 }, '<0.1')
          .to(rows, { autoAlpha: 1, x: 0, duration: 0.3, stagger: 0.1 }, '<0.3')
          // Beat 3 — comparison panel rises and the marker travels to this listing's price.
          .to(beat(2), { autoAlpha: 0, y: -28, duration: 0.5 }, '+=0.4')
          .to(beat(3), { autoAlpha: 1, y: 0, duration: 0.5 }, '<0.2')
          .to(q('[data-hero-post]'), { y: -30, scale: 0.84, autoAlpha: 0.5, duration: 0.9 }, '<')
          .to(q('[data-sheet]'), { y: -70, duration: 0.9 }, '<')
          .to(q('[data-verdict]'), { autoAlpha: 1, y: 0, duration: 0.8 }, '<0.1')
          .to(q('[data-bar-iqr]'), { scaleX: 1, duration: 0.6 }, '<0.4')
          .to(q('[data-bar-target]'), { autoAlpha: 1, duration: 0.1 }, '<0.3')
          .to(q('[data-bar-target]'), { left: q('[data-bar-target]')[0]?.dataset.pos ?? '50%', duration: 0.8, ease: 'power3.out' }, '<')
          .to({}, { duration: 0.4 });

        // Pointer tilt runs on its own wrapper so it never fights the scroll timeline.
        const tilt = q('[data-tilt]')[0];
        const rx = gsap.quickTo(tilt, 'rotationX', { duration: 0.6, ease: 'power3.out' });
        const ry = gsap.quickTo(tilt, 'rotationY', { duration: 0.6, ease: 'power3.out' });
        const onMove = (e: PointerEvent) => {
          const r = root.getBoundingClientRect();
          const nx = (e.clientX - (r.left + r.width * 0.65)) / (r.width / 2);
          const ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
          ry(gsap.utils.clamp(-1, 1, nx) * 5);
          rx(gsap.utils.clamp(-1, 1, ny) * -4);
        };
        root.addEventListener('pointermove', onMove);
        return () => {
          root.removeEventListener('pointermove', onMove);
          delete root.dataset.motion;
        };
      });

      cleanup = () => mm.revert();
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  const rent = listing.rent;
  const target = rent.amount_vnd ?? null;
  const c = comparison;
  const scale =
    c.p25 != null && c.p75 != null && target != null
      ? (() => {
          const pts = [c.p25, c.p75, target, ...(c.median != null ? [c.median] : [])];
          const lo = Math.min(...pts) * 0.85;
          const hi = Math.max(...pts) * 1.1;
          return (v: number) => ((v - lo) / (hi - lo)) * 100;
        })()
      : null;

  return (
    <section ref={rootRef} className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <div className={styles.beats}>
            <div data-beat="0" className={styles.beat}>
              <p className={styles.eyebrow}>Đồ án NLP · Real Estate NER</p>
              <h1 id="hero-title" className={styles.title}>
                Đọc đúng <em>giá thuê</em> trọ.
              </h1>
              <p className={styles.lead}>
                ReNER-VN đọc bài cho thuê trên Facebook, tách giá thuê khỏi tiền điện, nước, cọc, rồi cho bạn biết giá đó đứng ở
                đâu so với các tin tương tự.
              </p>
              <div className={styles.ctas}>
                <Link href="/tim-tro" className={styles.primary}>
                  Tìm phòng <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link href="#extension" className={styles.secondary}>
                  <Puzzle size={15} aria-hidden="true" /> Cài extension
                </Link>
              </div>
            </div>
            <div data-beat="1" className={styles.beat}>
              <p className={styles.eyebrow}>01 — Gán nhãn</p>
              <h2 className={styles.beatTitle}>Mỗi con số trỏ về đúng chữ trong bài.</h2>
              <p className={styles.lead}>
                Regex và LLM cùng đọc. LLM chỉ được trích nguyên văn; đoạn nào không tìm thấy trong bài thì bị bỏ, không đoán.
              </p>
            </div>
            <div data-beat="2" className={styles.beat}>
              <p className={styles.eyebrow}>02 — Chuẩn hóa</p>
              <h2 className={styles.beatTitle}>“5tr5/th” thành 5.500.000 đ. Phí đứng riêng.</h2>
              <p className={styles.lead}>
                Điện, nước, cọc là phí: không cộng vào giá thuê, không nhân theo số người. Bài không nói thì ghi “Không đề cập”.
              </p>
            </div>
            <div data-beat="3" className={styles.beat}>
              <p className={styles.eyebrow}>03 — So sánh</p>
              <h2 className={styles.beatTitle}>Đặt cạnh trung vị của {c.n} tin tương tự.</h2>
              <p className={styles.lead}>
                Cùng phường, cùng loại, cùng khoảng diện tích. Nhóm có dưới 10 tin thì nói thẳng: chưa đủ dữ liệu.
              </p>
            </div>
          </div>

          <ol className={styles.rail} aria-label="Các bước">
            {STEPS.map((s, i) => (
              <li key={s} className={i <= step ? styles.railOn : ''} aria-current={i === step ? 'step' : undefined}>
                <span className={styles.railDot} />
                {s}
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.stage}>
          <div data-tilt className={styles.tilt}>
            <article data-hero-post className={styles.post} aria-label="Bài đăng ví dụ">
              <header className={styles.postHead}>
                <span className={styles.avatar} aria-hidden="true" />
                <div>
                  <p className={styles.postGroup}>{post.source_group_name}</p>
                  <p className={styles.postMeta}>Người đăng đã ẩn · 2 giờ</p>
                </div>
                <MoreHorizontal size={18} className={styles.postMore} aria-hidden="true" />
              </header>
              <EvidenceHighlighter text={post.text} evidence={evidence} size="lg" className={styles.postText} />
              <footer className={styles.postFoot} aria-hidden="true">
                <span>
                  <ThumbsUp size={14} /> Thích
                </span>
                <span>
                  <MessageCircle size={14} /> Bình luận
                </span>
                <span className={styles.stamp}>ví dụ tự tạo</span>
              </footer>
            </article>

            <aside data-sheet className={styles.sheet} aria-label="Kết quả chuẩn hóa">
              <p className={styles.sheetTitle}>Đã chuẩn hóa</p>
              <dl className={styles.sheetList}>
                <div data-sheet-row className={styles.sheetPrice}>
                  <dt>Giá thuê</dt>
                  <dd>
                    {target != null ? formatVnd(target) : 'Chưa có giá'}
                    <small>/tháng/phòng</small>
                  </dd>
                </div>
                <div data-sheet-row>
                  <dt>Diện tích</dt>
                  <dd>{listing.area.value_m2} m²</dd>
                </div>
                <div data-sheet-row>
                  <dt>Loại</dt>
                  <dd>
                    {PROPERTY_LABEL[listing.room.property_type]}
                    {listing.room.bedrooms ? ` · ${listing.room.bedrooms} PN` : ''}
                  </dd>
                </div>
                <div data-sheet-row>
                  <dt>Vị trí</dt>
                  <dd>{listing.location.landmark}</dd>
                </div>
                {listing.fees.map((f) => (
                  <div data-sheet-row key={f.type} className={styles.sheetFee}>
                    <dt>{FEE_LABEL[f.type]}</dt>
                    <dd>{feeValue(f)}</dd>
                  </div>
                ))}
              </dl>
            </aside>

            <aside data-verdict className={styles.verdict} aria-label="Nhận định giá">
              <p className={styles.verdictKicker}>Nhận định</p>
              <p className={styles.verdictText} data-v={c.verdict ?? 'none'}>
                {verdictSentence(c, rent.amount_form, rent.visibility)}
              </p>
              {scale && c.p25 != null && c.p75 != null && c.median != null && target != null && (
                <div className={styles.bar} aria-hidden="true">
                  <span className={styles.barAxis} />
                  <span
                    data-bar-iqr
                    className={styles.barIqr}
                    style={{ left: `${scale(c.p25)}%`, width: `${scale(c.p75) - scale(c.p25)}%` }}
                  />
                  <span className={styles.barMedian} style={{ left: `${scale(c.median)}%` }} />
                  <span data-bar-target data-pos={`${scale(target)}%`} className={styles.barTarget} style={{ left: `${scale(target)}%` }}>
                    <span>Tin này</span>
                  </span>
                </div>
              )}
              <p className={styles.verdictMeta}>
                {c.p25 != null && c.p75 != null && c.median != null
                  ? `Trung vị ${formatShort(c.median)} · P25–P75 ${formatShort(c.p25)}–${formatShort(c.p75)} · N = ${c.n}`
                  : `N = ${c.n}`}
              </p>
              <p className={styles.verdictFine}>{dataRangeSentence(c.data_from, c.data_to)}</p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
