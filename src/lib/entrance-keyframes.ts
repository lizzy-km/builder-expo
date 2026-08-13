/**
 * Keyframe builders for each entrance effect. A fresh `Keyframe` instance is created
 * per call because Reanimated mutates them when duration/delay are applied.
 */

import { Easing, Keyframe, type ReanimatedKeyframe } from 'react-native-reanimated';

import type { AnimationProps, EntranceEffect } from '@/types/animation';

/** Distance travelled by slide effects, in points. */
const SLIDE_OFFSET = 24;

const EASING = Easing.out(Easing.cubic);

type KeyframeFactory = () => ReanimatedKeyframe;

const FACTORIES: Record<Exclude<EntranceEffect, 'none'>, KeyframeFactory> = {
  fade: () =>
    new Keyframe({
      0: { opacity: 0 },
      100: { opacity: 1, easing: EASING },
    }),
  slideUp: () =>
    new Keyframe({
      0: { opacity: 0, transform: [{ translateY: SLIDE_OFFSET }] },
      100: { opacity: 1, transform: [{ translateY: 0 }], easing: EASING },
    }),
  slideDown: () =>
    new Keyframe({
      0: { opacity: 0, transform: [{ translateY: -SLIDE_OFFSET }] },
      100: { opacity: 1, transform: [{ translateY: 0 }], easing: EASING },
    }),
  slideLeft: () =>
    new Keyframe({
      0: { opacity: 0, transform: [{ translateX: SLIDE_OFFSET }] },
      100: { opacity: 1, transform: [{ translateX: 0 }], easing: EASING },
    }),
  slideRight: () =>
    new Keyframe({
      0: { opacity: 0, transform: [{ translateX: -SLIDE_OFFSET }] },
      100: { opacity: 1, transform: [{ translateX: 0 }], easing: EASING },
    }),
  zoomIn: () =>
    new Keyframe({
      0: { opacity: 0, transform: [{ scale: 0.85 }] },
      100: { opacity: 1, transform: [{ scale: 1 }], easing: EASING },
    }),
  zoomOut: () =>
    new Keyframe({
      0: { opacity: 0, transform: [{ scale: 1.15 }] },
      100: { opacity: 1, transform: [{ scale: 1 }], easing: EASING },
    }),
};

/** Build the configured entering animation, or null when the effect is `none`. */
export function buildEntrance({
  effect,
  duration,
  delay,
}: AnimationProps): ReanimatedKeyframe | null {
  if (effect === 'none') return null;

  const keyframe = FACTORIES[effect]().duration(Math.max(1, duration));
  return delay > 0 ? keyframe.delay(delay) : keyframe;
}
