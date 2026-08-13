import type { PropsWithChildren } from 'react';
import Animated from 'react-native-reanimated';

import { buildEntrance } from '@/lib/entrance-keyframes';
import { DEFAULT_ANIMATION, type AnimationProps } from '@/types/animation';

export type AnimatedBlockProps = PropsWithChildren<{
  animation?: AnimationProps;
  /** Bump to replay the entrance — remounts the animated view. */
  replayKey?: number;
}>;

/**
 * Applies a block's entrance animation. Reanimated only runs `entering` on mount, so
 * the caller changes `replayKey` to force a remount and re-trigger the effect.
 */
export function AnimatedBlock({ animation, replayKey = 0, children }: AnimatedBlockProps) {
  const settings = animation ?? DEFAULT_ANIMATION;
  const entering = buildEntrance(settings);

  if (!entering) return <>{children}</>;

  const identity = `${settings.effect}-${settings.duration}-${settings.delay}-${replayKey}`;

  return (
    <Animated.View key={identity} entering={entering}>
      {children}
    </Animated.View>
  );
}
