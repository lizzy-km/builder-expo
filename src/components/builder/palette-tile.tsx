import { Pressable, StyleSheet, Text } from 'react-native';

import { WIDGET_GLYPHS } from '@/constants/control-glyphs';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { WIDGET_LABELS } from '@/lib/widget-defaults';
import type { WidgetType } from '@/types/builder';

export type PaletteTileProps = {
  type: WidgetType;
  onPress: () => void;
};

/** Square glyph-over-label tile for one widget type in the insert palette. */
export function PaletteTile({ type, onPress }: PaletteTileProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Insert ${WIDGET_LABELS[type]}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.tile,
        { backgroundColor: theme.fieldCard, borderColor: theme.fieldCardBorder },
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.glyph, { color: theme.text }]}>{WIDGET_GLYPHS[type]}</Text>
      <Text style={[styles.label, { color: theme.text }]} numberOfLines={2}>
        {WIDGET_LABELS[type]}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    width: 92,
    minHeight: 88,
    borderWidth: 1,
    borderRadius: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.one,
    paddingVertical: Spacing.three,
  },
  glyph: {
    fontSize: 22,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.65,
  },
});
