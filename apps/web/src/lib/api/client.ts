// Thin data layer. Each function maps 1:1 to an endpoint in docs/03-system/03-api-contract.md.
// Today it answers from demo data; swap the bodies for the generated OpenAPI client
// (NEXT_PUBLIC_API_URL) without changing the call sites.

import {
  CARDS,
  COMPARISONS,
  DETAILS,
  LAB,
  MARKET,
  MARKET_RANGE,
  OVERVIEW,
  REVIEWS,
} from './mock-data';
import type {
  Comparison,
  LabResult,
  ListingDetail,
  ListingsResponse,
  MarketSummary,
  PropertyType,
  ReviewItem,
  StatsOverview,
} from './types';

export interface ListingQuery {
  ward?: string[];
  type?: PropertyType[];
  price_min?: number;
  price_max?: number;
  area_min?: number;
  area_max?: number;
  has_price?: boolean;
  sort?: 'price_asc' | 'price_desc' | 'newest';
}

/** GET /listings — filtering/sorting happens in the API; the mock imitates it. */
export async function getListings(q: ListingQuery): Promise<ListingsResponse> {
  const priceFilter = q.price_min != null || q.price_max != null || q.has_price;
  let items = CARDS.filter((c) => {
    if (q.ward?.length && !q.ward.includes(c.ward_name ?? '')) return false;
    if (q.type?.length && !q.type.includes(c.property_type)) return false;
    if (q.area_min != null && (c.area_m2 == null || c.area_m2 < q.area_min)) return false;
    if (q.area_max != null && (c.area_m2 == null || c.area_m2 > q.area_max)) return false;
    return true;
  });
  const hasExactPrice = (c: (typeof CARDS)[number]) => c.rent.amount_form === 'exact' && c.rent.amount_vnd != null;
  // Listings without an exact price drop out when any price filter is on; the API reports how many.
  const noPriceHidden = priceFilter ? items.filter((c) => !hasExactPrice(c)).length : 0;
  if (priceFilter) {
    items = items.filter((c) => {
      if (!hasExactPrice(c)) return false;
      const v = c.rent.amount_vnd as number;
      if (q.price_min != null && v < q.price_min) return false;
      if (q.price_max != null && v > q.price_max) return false;
      return true;
    });
  }
  const sorted = [...items].sort((a, b) => {
    if (q.sort === 'price_asc' || q.sort === 'price_desc') {
      const av = a.rent.amount_vnd ?? Number.POSITIVE_INFINITY;
      const bv = b.rent.amount_vnd ?? Number.POSITIVE_INFINITY;
      return q.sort === 'price_asc' ? av - bv : bv - av;
    }
    return b.posted_at.localeCompare(a.posted_at);
  });
  return { items: sorted, total: sorted.length, hidden_no_price: noPriceHidden, data_as_of: OVERVIEW.updated_at };
}

export async function getListing(id: string): Promise<ListingDetail | null> {
  return DETAILS[id] ?? null;
}

export async function getComparison(id: string): Promise<Comparison | null> {
  return COMPARISONS[id] ?? null;
}

export async function getMarketSummary(): Promise<MarketSummary> {
  return { cells: MARKET, ...MARKET_RANGE };
}

export async function getStatsOverview(): Promise<StatsOverview> {
  return OVERVIEW;
}

export async function runLab(): Promise<LabResult> {
  return LAB;
}

export async function getReviews(): Promise<ReviewItem[]> {
  return REVIEWS;
}

export const WARDS = Array.from(new Set(CARDS.map((c) => c.ward_name).filter(Boolean))) as string[];
