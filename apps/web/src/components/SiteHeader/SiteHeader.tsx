'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, Puzzle, X } from 'lucide-react';
import { Logo } from '../Logo/Logo';
import styles from './SiteHeader.module.css';

const NAV = [
  { href: '/tim-tro', label: 'Tìm trọ' },
  { href: '/thi-truong', label: 'Thị trường' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={[styles.header, scrolled ? styles.scrolled : ''].join(' ')}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="ReNER-VN — trang chủ">
          <Logo />
        </Link>

        <nav className={styles.nav} aria-label="Điều hướng chính">
          {NAV.map((n) => {
            const active = pathname.startsWith(n.href);
            return (
              <Link key={n.href} href={n.href} className={[styles.link, active ? styles.active : ''].join(' ')} aria-current={active ? 'page' : undefined}>
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.actions}>
          <Link href="/team/lab" className={styles.ghost}>
            Khu nhóm
          </Link>
          <Link href="/#extension" className={styles.cta}>
            <Puzzle size={14} strokeWidth={1.75} aria-hidden="true" />
            Cài extension
          </Link>
        </div>

        <button
          type="button"
          className={styles.burger}
          aria-label={open ? 'Đóng menu' : 'Mở menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <div id="mobile-nav" className={[styles.sheet, open ? styles.sheetOpen : ''].join(' ')} hidden={!open}>
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className={styles.sheetLink}>
            {n.label}
          </Link>
        ))}
        <Link href="/team/lab" className={styles.sheetLink}>
          Khu nhóm
        </Link>
        <Link href="/#extension" className={styles.cta}>
          <Puzzle size={14} aria-hidden="true" /> Cài extension
        </Link>
      </div>
    </header>
  );
}
