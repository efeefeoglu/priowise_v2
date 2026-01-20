'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function CanonicalLink() {
  const pathname = usePathname();

  useEffect(() => {
    const head = document.head;
    let link = head.querySelector('link[rel="canonical"]');

    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }

    const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${pathname}`;
    link.setAttribute('href', canonicalUrl);

  }, [pathname]);

  return null;
}
