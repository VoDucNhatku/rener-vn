'use client';

import type { ListingCard as Card } from '@/lib/api/types';
import { ListingCard } from './ListingCard';
import styles from './ListingGrid.module.css';

/** Keep result geometry stable while API filters and sort change. */
export function ListingGrid({ items }: { items: Card[] }) {
  return (
    <ul className={styles.grid}>
      {items.map((c) => (
        <li key={c.listing_id}>
          <ListingCard card={c} />
        </li>
      ))}
    </ul>
  );
}
