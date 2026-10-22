import type { ListingQuery } from '@/lib/api/client';
import type { PropertyType } from '@/lib/api/types';

export type SearchParams = Record<string, string | string[] | undefined>;

const TYPES: PropertyType[] = ['phong_tro', 'ccmn', 'can_ho_dich_vu', 'nha_nguyen_can'];
const SORTS = ['newest', 'price_asc', 'price_desc'] as const;
// ?nguon=that → posts from the team's extension; ?nguon=vidu → invented examples.
const ORIGINS: Record<string, ListingQuery['origin']> = { that: 'extension', vidu: 'demo' };

const list = (v: string | string[] | undefined) => (v == null ? [] : Array.isArray(v) ? v : [v]);
const num = (v: string | string[] | undefined) => {
  const s = Array.isArray(v) ? v[0] : v;
  if (s == null || s === '') return undefined;
  const n = Number(s.replace(',', '.'));
  return Number.isFinite(n) && n >= 0 ? n : undefined;
};

/**
 * URL is the source of truth for filters (docs/01-product/03 §3.2). Prices in the URL are in
 * millions to keep links readable: ?gia_max=4 means ≤ 4.000.000 đ. Invalid values are dropped.
 */
export function parseFilters(sp: SearchParams): ListingQuery {
  const priceMin = num(sp.gia_min);
  const priceMax = num(sp.gia_max);
  const sort = (Array.isArray(sp.sap_xep) ? sp.sap_xep[0] : sp.sap_xep) as ListingQuery['sort'];
  return {
    ward: list(sp.phuong),
    type: list(sp.loai).filter((t): t is PropertyType => TYPES.includes(t as PropertyType)),
    price_min: priceMin != null ? Math.round(priceMin * 1_000_000) : undefined,
    price_max: priceMax != null ? Math.round(priceMax * 1_000_000) : undefined,
    area_min: num(sp.dt_min),
    area_max: num(sp.dt_max),
    has_price: (Array.isArray(sp.co_gia) ? sp.co_gia[0] : sp.co_gia) === '1' || undefined,
    origin: ORIGINS[(Array.isArray(sp.nguon) ? sp.nguon[0] : sp.nguon) ?? ''],
    sort: SORTS.includes(sort as (typeof SORTS)[number]) ? sort : 'newest',
  };
}

export { TYPES as FILTER_TYPES };
