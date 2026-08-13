import { StyleSheet, View } from 'react-native';

import { PanelSection } from '@/components/builder/panel/panel-section';
import { ChoiceGrid } from '@/components/ui/choice-grid';
import { NumberField } from '@/components/ui/number-field';
import { Spacing } from '@/constants/theme';
import { DEFAULT_ANIMATION, type AnimationProps, type EntranceEffect } from '@/types/animation';

export type AnimationSectionProps = {
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

export function AnimationSection({ animation, onChange }: AnimationSectionProps) {
  const current = animation ?? DEFAULT_ANIMATION;

  return (
    <PanelSection title="Animation" initiallyOpen={false}>
      <ChoiceGrid
        label="Entrance effect"
        value={current.effect}
        options={EFFECT_OPTIONS}
        onChange={(effect) => onChange({ effect })}
      />

      {current.effect !== 'none' ? (
        <View style={styles.row}>
          <NumberField
            label="Duration (ms)"
            value={current.duration}
            onChange={(duration) => onChange({ duration: duration ?? DEFAULT_ANIMATION.duration })}
          />
          <NumberField
            label="Delay (ms)"
            value={current.delay}
            onChange={(delay) => onChange({ delay: delay ?? 0 })}
          />
        </View>
      ) : null}
    </PanelSection>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
});
