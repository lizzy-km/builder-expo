import { useCallback, useEffect, useState } from 'react';

import {
  createSubTemplate,
  deleteSubTemplate,
  listSubTemplates,
} from '@/lib/sub-templates-repository';
import type { SubTemplate, WidgetBlock } from '@/types/builder';

/** Loads the signed-in user's saved sub templates, with save/delete kept in sync. */
export function useSubTemplates(ownerId: string | null) {
  const [templates, setTemplates] = useState<SubTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!ownerId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      setTemplates(await listSubTemplates(ownerId));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Failed to load templates');
    } finally {
      setIsLoading(false);
    }
  }, [ownerId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const save = useCallback(
    async (name: string, blocks: WidgetBlock[]) => {
      if (!ownerId) throw new Error('Not signed in');
      const created = await createSubTemplate(name, blocks, ownerId);
      setTemplates((current) => [created, ...current]);
    },
    [ownerId],
  );

  const remove = useCallback(async (id: string) => {
    setTemplates((current) => current.filter((template) => template.id !== id));
    await deleteSubTemplate(id);
  }, []);

  return { templates, isLoading, error, save, remove };
}
