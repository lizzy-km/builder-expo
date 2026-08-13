import { useCallback, useEffect, useState } from 'react';

import { useBuilderStore } from '@/lib/builder-store';
import { getPage, savePageBlocks, setPagePublished } from '@/lib/pages-repository';

/** Hydrates the builder store from Firestore and exposes a save action for one page. */
export function usePageEditor(pageId: string) {
  const loadPage = useBuilderStore((state) => state.loadPage);
  const reset = useBuilderStore((state) => state.reset);
  const markSaved = useBuilderStore((state) => state.markSaved);
  const setPublished = useBuilderStore((state) => state.setPublished);
  const blocks = useBuilderStore((state) => state.blocks);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const hydrate = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const page = await getPage(pageId);
        if (cancelled) return;
        if (!page) {
          setError('This page no longer exists.');
          return;
        }
        loadPage(page.id, page.title, page.blocks, page.published);
      } catch (cause) {
        if (!cancelled) setError(cause instanceof Error ? cause.message : 'Failed to load page');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void hydrate();
    return () => {
      cancelled = true;
      reset();
    };
  }, [pageId, loadPage, reset]);

  const save = useCallback(async () => {
    setIsSaving(true);
    setError(null);
    try {
      await savePageBlocks(pageId, blocks);
      markSaved();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Failed to save page');
    } finally {
      setIsSaving(false);
    }
  }, [pageId, blocks, markSaved]);

  const togglePublished = useCallback(
    async (next: boolean) => {
      setError(null);
      try {
        await setPagePublished(pageId, next);
        setPublished(next);
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : 'Failed to update sharing');
      }
    },
    [pageId, setPublished],
  );

  return { isLoading, isSaving, error, save, togglePublished };
}
