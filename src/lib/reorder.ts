/** Pure array/order helpers used by the builder store. */

import type { WidgetBlock } from '@/types/builder';

/** Move an item between indices, returning a new array. */
export function moveItem<T>(items: T[], from: number, to: number): T[] {
  if (from === to || from < 0 || to < 0 || from >= items.length || to >= items.length) {
    return items;
  }
  const next = items.slice();
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved!);
  return next;
}

/** Rewrite `order` to match array position, so persisted order survives a reload. */
export function normalizeOrder(blocks: WidgetBlock[]): WidgetBlock[] {
  return blocks.map((block, index) => (block.order === index ? block : { ...block, order: index }));
}

/** Sort by stored `order` — used when hydrating from Firestore. */
export function sortByOrder(blocks: WidgetBlock[]): WidgetBlock[] {
  return blocks.slice().sort((a, b) => a.order - b.order);
}
