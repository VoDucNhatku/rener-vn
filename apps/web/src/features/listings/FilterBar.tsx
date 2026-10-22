'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, useTransition } from 'react';
import { Check, ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import type { PropertyType } from '@/lib/api/types';
import { PROPERTY_LABEL } from '@/lib/format';
import { FILTER_TYPES } from './filters';
import styles from './FilterBar.module.css';

interface Props {
  wards: string[];
}

export function FilterBar({ wards }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const update = (mutate: (p: URLSearchParams) => void) => {
    const next = new URLSearchParams(params.toString());
    mutate(next);
    startTransition(() => router.replace(`${pathname}${next.size ? `?${next}` : ''}`, { scroll: false }));
  };

  const toggle = (key: string, value: string) =>
    update((p) => {
      const cur = p.getAll(key);
      p.delete(key);
      (cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value]).forEach((v) => p.append(key, v));
    });

  const wardSel = params.getAll('phuong');
  const typeSel = params.getAll('loai');
  const activeCount =
    wardSel.length + typeSel.length + ['gia_min', 'gia_max', 'dt_min', 'dt_max', 'co_gia'].filter((k) => params.get(k)).length;

  return (
    <div className={styles.bar} data-pending={pending || undefined}>
      <button type="button" className={styles.mobileToggle} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <SlidersHorizontal size={15} aria-hidden="true" /> Bộ lọc{activeCount ? ` · ${activeCount}` : ''}
      </button>

      <div className={[styles.groups, open ? styles.groupsOpen : ''].join(' ')}>
        <fieldset className={styles.group}>
          <legend>Phường</legend>
          <div className={styles.chips}>
            {wards.map((w) => (
              <Chip key={w} on={wardSel.includes(w)} onClick={() => toggle('phuong', w)}>
                {w.replace(/^(Phường|Xã) /, '')}
              </Chip>
            ))}
          </div>
        </fieldset>

        <fieldset className={styles.group}>
          <legend>Loại phòng</legend>
          <div className={styles.chips}>
            {FILTER_TYPES.map((t) => (
              <Chip key={t} on={typeSel.includes(t)} onClick={() => toggle('loai', t)}>
                {PROPERTY_LABEL[t as PropertyType]}
              </Chip>
            ))}
          </div>
        </fieldset>

        <div className={styles.row}>
          <RangeField label="Giá (triệu/tháng)" minKey="gia_min" maxKey="gia_max" step="0.5" update={update} params={params} />
          <RangeField label="Diện tích (m²)" minKey="dt_min" maxKey="dt_max" step="1" update={update} params={params} />
          <label className={styles.check}>
            <input
              type="checkbox"
              checked={params.get('co_gia') === '1'}
              onChange={(e) => update((p) => (e.target.checked ? p.set('co_gia', '1') : p.delete('co_gia')))}
            />
            <span className={styles.box} aria-hidden="true">
              <Check size={11} strokeWidth={3} />
            </span>
            Chỉ tin có giá
          </label>
          <label className={styles.sort}>
            <span className="visually-hidden">Sắp xếp</span>
            <select
              value={params.get('sap_xep') ?? 'newest'}
              onChange={(e) => update((p) => (e.target.value === 'newest' ? p.delete('sap_xep') : p.set('sap_xep', e.target.value)))}
            >
              <option value="newest">Mới nhất</option>
              <option value="price_asc">Giá tăng dần</option>
              <option value="price_desc">Giá giảm dần</option>
            </select>
            <ChevronDown size={14} aria-hidden="true" />
          </label>
          {activeCount > 0 && (
            <button type="button" className={styles.clear} onClick={() => update((p) => [...p.keys()].forEach((k) => k !== 'sap_xep' && p.delete(k)))}>
              <X size={13} aria-hidden="true" /> Xóa lọc
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" className={styles.chip} aria-pressed={on} onClick={onClick}>
      {on && <Check size={12} strokeWidth={2.5} aria-hidden="true" />}
      {children}
    </button>
  );
}

function RangeField({
  label,
  minKey,
  maxKey,
  step,
  update,
  params,
}: {
  label: string;
  minKey: string;
  maxKey: string;
  step: string;
  update: (m: (p: URLSearchParams) => void) => void;
  params: URLSearchParams | ReturnType<typeof useSearchParams>;
}) {
  const [min, setMin] = useState(params.get(minKey) ?? '');
  const [max, setMax] = useState(params.get(maxKey) ?? '');
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Keep inputs in sync when the URL changes elsewhere (e.g. "Xóa lọc").
  useEffect(() => {
    setMin(params.get(minKey) ?? '');
    setMax(params.get(maxKey) ?? '');
  }, [params, minKey, maxKey]);

  const commit = (key: string, value: string) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => update((p) => (value ? p.set(key, value) : p.delete(key))), 450);
  };

  return (
    <fieldset className={styles.range}>
      <legend>{label}</legend>
      <input
        inputMode="decimal"
        type="number"
        min="0"
        step={step}
        placeholder="Từ"
        aria-label={`${label} từ`}
        value={min}
        onChange={(e) => {
          setMin(e.target.value);
          commit(minKey, e.target.value);
        }}
      />
      <span aria-hidden="true">–</span>
      <input
        inputMode="decimal"
        type="number"
        min="0"
        step={step}
        placeholder="Đến"
        aria-label={`${label} đến`}
        value={max}
        onChange={(e) => {
          setMax(e.target.value);
          commit(maxKey, e.target.value);
        }}
      />
    </fieldset>
  );
}
