/**
 * Pure geometry helpers for the drag-to-reorder canvas. Kept worklet-safe (no imports,
 * no closures over React state) so they can be called from the UI thread.
 */

/** Which index a row dragged by `translationY` should land on. */
export function targetIndexFor(
  fromIndex: number,
  translationY: number,
  rowHeight: number,
  total: number,
): number {
  'worklet';
  const shift = Math.round(translationY / rowHeight);
  const target = fromIndex + shift;
  if (target < 0) return 0;
  if (target > total - 1) return total - 1;
  return target;
}

/** Offset applied to a non-dragged row so it visually makes room for the dragged one. */
export function shiftForRow(
  rowIndex: number,
  fromIndex: number,
  targetIndex: number,
  rowHeight: number,
): number {
  'worklet';
  if (rowIndex === fromIndex) return 0;
  if (fromIndex < targetIndex && rowIndex > fromIndex && rowIndex <= targetIndex) {
    return -rowHeight;
  }
  if (fromIndex > targetIndex && rowIndex >= targetIndex && rowIndex < fromIndex) {
    return rowHeight;
  }
  return 0;
}
