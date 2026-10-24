'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Menu, Search, X } from 'lucide-react';
import { Logo } from '../Logo/Logo';
import { useDatasetHref } from '@/lib/useDatasetHref';
import styles from './SiteHeader.module.css';
const NAV = [
  { href: '/', label: 'Trang chủ' },
  { href: '/tim-tro', label: 'Tìm trọ' },
  { href: '/#cach-hoat-dong', label: 'Cách hoạt động' },
];
export function SiteHeader() {
  const pathname = usePathname();
  const scoped = useDatasetHref();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);
  const navLink = (n: (typeof NAV)[number], mobile = false) => {
    const active =
      n.href === '/'
        ? pathname === '/'
        : n.href === '/tim-tro' && (pathname === '/tim-tro' || pathname.startsWith('/tin/'));
    return (
      <Link
        key={n.href}
        href={scoped(n.href)}
        onClick={() => setOpen(false)}
        className={mobile ? styles.sheetLink : styles.link}
        aria-current={active ? 'page' : undefined}
      >
        {n.label}
      </Link>
    );
  };
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href={scoped('/')} aria-label="ReNER-VN — trang chủ">
          <Logo />
        </Link>
        <nav className={styles.nav} aria-label="Điều hướng chính">
          {NAV.map((n) => navLink(n))}
        </nav>
        <Link href={scoped('/tim-tro')} className={`button ${styles.cta}`}>
          <Search size={16} aria-hidden="true" />
          Khám phá kho tin
        </Link>
        <button
          ref={toggle}
          type="button"
          className={styles.burger}
          aria-label={open ? 'Đóng menu' : 'Mở menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <nav id="mobile-nav" aria-label="Điều hướng trên điện thoại" className={styles.sheet} hidden={!open}>
        {NAV.map((n) => navLink(n, true))}
      </nav>
    </header>
  );
}
