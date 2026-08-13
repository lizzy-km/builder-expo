/** Entrance animation settings attached to a widget block. */

export const ENTRANCE_EFFECTS = [
  'none',
  'fade',
  'slideUp',
  'slideDown',
  'slideLeft',
  'slideRight',
  'zoomIn',
  'zoomOut',
] as const;

export type EntranceEffect = (typeof ENTRANCE_EFFECTS)[number];

export type AnimationProps = {
  effect: EntranceEffect;
  /** Milliseconds the animation runs for. */
  duration: number;
  /** Milliseconds to wait before starting. */
  delay: number;
};

export const DEFAULT_ANIMATION: AnimationProps = {
  effect: 'none',
  duration: 500,
  delay: 0,
};
