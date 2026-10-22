'use client';

import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import type { ListingCard as Card } from '@/lib/api/types';
import { ListingCard } from './ListingCard';
import styles from './ListingGrid.module.css';

/** Cards glide to their new slot when filters/sort change (Motion `layout`, stable keys). */
export function ListingGrid({ items }: { items: Card[] }) {
  return (
    <MotionConfig reducedMotion="user">
      <ul className={styles.grid}>
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((c) => (
            <motion.li
              key={c.listing_id}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
            >
              <ListingCard card={c} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </MotionConfig>
  );
}
