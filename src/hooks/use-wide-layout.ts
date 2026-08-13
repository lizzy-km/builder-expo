import { useWindowDimensions } from 'react-native';

/**
 * Width at which the builder switches from a bottom drawer to a right-hand side panel.
 * Below this, a fixed side panel would leave too little room for the canvas.
 */
export const WIDE_LAYOUT_BREAKPOINT = 900;

/** True when there's room to show the editing surfaces beside the canvas. */
export function useWideLayout(): boolean {
  const { width } = useWindowDimensions();
  return width >= WIDE_LAYOUT_BREAKPOINT;
}
