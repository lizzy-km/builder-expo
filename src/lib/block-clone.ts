/**
 * Cloning a block subtree. Every copied block needs a fresh id, and child `parentId`
 * links must be rewritten to point at the copies rather than the originals.
 */

import { nanoid } from 'nanoid/non-secure';

import { childrenOf, descendantIds } from '@/lib/block-tree';
import type { WidgetBlock } from '@/types/builder';

/** Extract a block and all its descendants, unchanged. */
export function extractSubtree(blocks: WidgetBlock[], rootId: string): WidgetBlock[] {
  const ids = new Set([rootId, ...descendantIds(blocks, rootId)]);
  return blocks.filter((block) => ids.has(block.id));
}

/**
 * Clone a subtree under `newParentId`. Returns the new blocks; the root's `order` is set
 * to `order` and its parent to `newParentId`, with inner links remapped to the copies.
 */
export function cloneSubtree(
  subtree: WidgetBlock[],
  rootId: string,
  newParentId: string | null,
  order: number,
): WidgetBlock[] {
  const idMap = new Map(subtree.map((block) => [block.id, nanoid(10)]));

  return subtree.map((block) => {
    const isRoot = block.id === rootId;
    return {
      ...block,
      id: idMap.get(block.id)!,
      parentId: isRoot ? newParentId : idMap.get(block.parentId ?? '') ?? newParentId,
      order: isRoot ? order : block.order,
    };
  });
}

/** Next free order index within a sibling group. */
export function nextOrderIn(blocks: WidgetBlock[], parentId: string | null): number {
  return childrenOf(blocks, parentId).length;
}
