import { useCallback, useEffect, useState } from 'react';

import { createPage, deletePage, listPages } from '@/lib/pages-repository';
import type { LandingPage } from '@/types/builder';

/**
 * Loads the signed-in user's landing pages and exposes create/delete that keep local
 * state in sync. Waits for `ownerId` before querying, since rules require it.
 */
export function usePages(ownerId: string | null) {
  const [pages, setPages] = useState<LandingPage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!ownerId) return;

    setIsLoading(true);
    setError(null);
    try {
      setPages(await listPages(ownerId));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Failed to load pages');
    } finally {
      setIsLoading(false);
    }
  }, [ownerId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const addPage = useCallback(
    async (title: string) => {
      if (!ownerId) throw new Error('Not signed in');
      const page = await createPage({ title, ownerId });
      setPages((current) => [page, ...current]);
      return page;
    },
    [ownerId],
  );

  const removePage = useCallback(async (id: string) => {
    setPages((current) => current.filter((page) => page.id !== id));
    await deletePage(id);
  }, []);

  return { pages, isLoading, error, refresh, addPage, removePage };
}
