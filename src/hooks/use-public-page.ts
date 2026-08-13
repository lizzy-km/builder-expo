import { useEffect, useState } from 'react';

import { getPage } from '@/lib/pages-repository';
import type { LandingPage } from '@/types/builder';

export type PublicPageState = {
  page: LandingPage | null;
  isLoading: boolean;
  /** Set when the page is missing, unpublished, or unreadable. */
  error: string | null;
};

const UNAVAILABLE = 'This page is not available.';

/**
 * Loads a page for public viewing. Security rules reject unpublished pages for anyone
 * but the owner, so a permission error and a missing page are reported identically —
 * that avoids leaking whether a given id exists.
 */
export function usePublicPage(pageId: string): PublicPageState {
  const [page, setPage] = useState<LandingPage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const found = await getPage(pageId);
        if (cancelled) return;

        if (!found || !found.published) {
          setError(UNAVAILABLE);
          return;
        }
        setPage(found);
      } catch {
        if (!cancelled) setError(UNAVAILABLE);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [pageId]);

  return { page, isLoading, error };
}
