import { StyleSheet, View } from 'react-native';

import { ChoiceGrid } from '@/components/ui/choice-grid';
import { FieldCard } from '@/components/ui/field-card';
import { NumberField } from '@/components/ui/number-field';
import { Spacing } from '@/constants/theme';
import { DEFAULT_ANIMATION, type AnimationProps, type EntranceEffect } from '@/types/animation';

export type AnimationTabProps = {
  animation: AnimationProps | undefined;
  onChange: (patch: Partial<AnimationProps>) => void;
};

const EFFECT_OPTIONS: { value: EntranceEffect; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'fade', label: 'Fade' },
  { value: 'slideUp', label: 'Slide up' },
  { value: 'slideDown', label: 'Slide down' },
  { value: 'slideLeft', label: 'Slide left' },
  { value: 'slideRight', label: 'Slide right' },
  { value: 'zoomIn', label: 'Zoom in' },
  { value: 'zoomOut', label: 'Zoom out' },
];

export function AnimationTab({ animation, onChange }: AnimationTabProps) {
  const current = animation ?? DEFAULT_ANIMATION;

  return (
    <View style={styles.tab}>
      <FieldCard label="Entrance effect">
        <ChoiceGrid
          value={current.effect}
          options={EFFECT_OPTIONS}
          onChange={(effect) => onChange({ effect })}
        />
      </FieldCard>

      {current.effect !== 'none' ? (
        <FieldCard label="Timing">
          <View style={styles.pairRow}>
            <NumberField
              label="Duration"
              hint="ms"
              value={current.duration}
              onChange={(duration) => onChange({ duration: duration ?? DEFAULT_ANIMATION.duration })}
            />
            <NumberField
              label="Delay"
              hint="ms"
              value={current.delay}
              onChange={(delay) => onChange({ delay: delay ?? 0 })}
            />
          </View>
        </FieldCard>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  tab: {
    gap: Spacing.three,
  },
  pairRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
});
