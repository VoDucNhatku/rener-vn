import { SiteFooter } from '@/components/SiteFooter/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader/SiteHeader';
import { Suspense } from 'react';

export default function RenterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense><SiteHeader /></Suspense>
      <main id="main">{children}</main>
      <Suspense><SiteFooter /></Suspense>
    </>
  );
}
