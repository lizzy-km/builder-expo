/**
 * Firestore has two constraints the builder's in-memory shape violates:
 *   1. `undefined` field values are rejected outright.
 *   2. Nested arrays (`string[][]`) are unsupported.
 *
 * The table widget's `rows` is a `string[][]`, so it's flattened to one object per row
 * on the way out and rebuilt on the way in. Everything else passes through unchanged.
 */

import { stripUndefined } from '@/lib/strip-undefined';
import type { TableWidgetProps, WidgetBlock } from '@/types/builder';

/** A table row as stored: `{ cells: [...] }` — one level of array, which Firestore allows. */
type StoredRow = { cells: string[] };

function isTableBlock(block: WidgetBlock): boolean {
  return block.type === 'table';
}

function encodeBlock(block: WidgetBlock): WidgetBlock {
  if (!isTableBlock(block)) return block;

  const props = block.props as TableWidgetProps;
  const rows: StoredRow[] = props.rows.map((cells) => ({ cells }));
  return { ...block, props: { ...props, rows } as unknown as TableWidgetProps };
}

function decodeBlock(block: WidgetBlock): WidgetBlock {
  if (!isTableBlock(block)) return block;

  const props = block.props as Omit<TableWidgetProps, 'rows'> & {
    rows?: (StoredRow | string[])[];
  };
  const rows = (props.rows ?? []).map((row) =>
    Array.isArray(row) ? row : (row.cells ?? []),
  );
  return { ...block, props: { ...props, rows } as TableWidgetProps };
}

/** Prepare blocks for a Firestore write. */
export function encodeBlocks(blocks: WidgetBlock[]): WidgetBlock[] {
  return stripUndefined(blocks.map(encodeBlock));
}

/** Rebuild blocks read back from Firestore. */
export function decodeBlocks(blocks: WidgetBlock[]): WidgetBlock[] {
  return blocks.map(decodeBlock);
}
