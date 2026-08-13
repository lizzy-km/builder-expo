/**
 * Tree operations over the flat blocks array. Blocks form a tree via `parentId`;
 * keeping the storage flat keeps Firestore writes simple, so these helpers do the
 * parent/child reasoning instead.
 */

import { moveItem } from '@/lib/reorder';
import type { WidgetBlock } from '@/types/builder';

/** Direct children of `parentId` (pass `null` for top-level), in stored order. */
export function childrenOf(blocks: WidgetBlock[], parentId: string | null): WidgetBlock[] {
  return blocks
    .filter((block) => block.parentId === parentId)
    .sort((a, b) => a.order - b.order);
}

/** Every descendant id of `id`, excluding `id` itself. */
export function descendantIds(blocks: WidgetBlock[], id: string): string[] {
  const collected: string[] = [];
  const queue = [id];

  while (queue.length > 0) {
    const current = queue.pop()!;
    for (const block of blocks) {
      if (block.parentId === current) {
        collected.push(block.id);
        queue.push(block.id);
      }
    }
  }

  return collected;
}

/** Remove a block and everything nested inside it. */
export function removeSubtree(blocks: WidgetBlock[], id: string): WidgetBlock[] {
  const doomed = new Set([id, ...descendantIds(blocks, id)]);
  return blocks.filter((block) => !doomed.has(block.id));
}

/** Rewrite `order` so each sibling group runs 0..n-1 in its current sequence. */
export function normalizeSiblingOrder(blocks: WidgetBlock[]): WidgetBlock[] {
  const counters = new Map<string, number>();

  return blocks.map((block) => {
    const key = block.parentId ?? '__root__';
    const next = counters.get(key) ?? 0;
    counters.set(key, next + 1);
    return block.order === next ? block : { ...block, order: next };
  });
}

/**
 * Reorder one sibling group. `from`/`to` are indices within that group, not the
 * flat array, so the canvas can pass through the indices it rendered.
 */
export function moveWithinParent(
  blocks: WidgetBlock[],
  parentId: string | null,
  from: number,
  to: number,
): WidgetBlock[] {
  const siblings = childrenOf(blocks, parentId);
  const reordered = moveItem(siblings, from, to);
  if (reordered === siblings) return blocks;

  const orderById = new Map(reordered.map((block, index) => [block.id, index]));
  return blocks.map((block) => {
    const nextOrder = orderById.get(block.id);
    if (nextOrder === undefined || block.order === nextOrder) return block;
    return { ...block, order: nextOrder };
  });
}

/** True when `candidateParent` sits inside `id` — used to block invalid moves. */
export function isDescendantOf(
  blocks: WidgetBlock[],
  id: string,
  candidateParent: string | null,
): boolean {
  if (candidateParent === null) return false;
  return descendantIds(blocks, id).includes(candidateParent);
}
