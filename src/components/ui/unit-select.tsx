import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type DimensionUnit = 'px' | '%' | 'auto';

export const UNIT_LABELS: Record<DimensionUnit, string> = {
  px: 'Pixels',
  '%': 'Percentage',
  auto: 'Auto',
};

export type UnitSelectProps = {
  value: DimensionUnit;
  units?: DimensionUnit[];
  onChange: (unit: DimensionUnit) => void;
};

const DEFAULT_UNITS: DimensionUnit[] = ['px', '%', 'auto'];

/**
 * Cycles through dimension units on tap. A tap-to-cycle control beats a modal picker
 * for three short options, and works identically on native and web.
 */
export function UnitSelect({ value, units = DEFAULT_UNITS, onChange }: UnitSelectProps) {
  const theme = useTheme();

  const advance = () => {
    const index = units.indexOf(value);
    onChange(units[(index + 1) % units.length]!);
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Unit: ${UNIT_LABELS[value]}. Tap to change.`}
      onPress={advance}
      style={({ pressed }) => [
        styles.select,
        { backgroundColor: theme.fieldInput, borderColor: theme.fieldCardBorder },
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.label, { color: theme.text }]} numberOfLines={1}>
        {UNIT_LABELS[value]}
      </Text>
      <View style={styles.caretBox}>
        <Text style={[styles.caret, { color: theme.textSecondary }]}>▾</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.one,
    minWidth: 108,
    minHeight: 38,
    borderWidth: 1,
    borderRadius: Spacing.one,
    paddingHorizontal: Spacing.two,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
  },
  caretBox: {
    paddingLeft: Spacing.one,
  },
  caret: {
    fontSize: 10,
  },
  pressed: {
    opacity: 0.7,
  },
});
