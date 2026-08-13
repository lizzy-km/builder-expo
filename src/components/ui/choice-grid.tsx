import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FieldLabel } from '@/components/ui/field-label';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ChoiceGridProps<T extends string> = {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
};

/** Wrapping grid of single-choice chips — for option sets too long for one row. */
export function ChoiceGrid<T extends string>({
  label,
  value,
  options,
  onChange,
}: ChoiceGridProps<T>) {
  const theme = useTheme();

  return (
    <FieldLabel label={label}>
      <View style={styles.grid}>
        {options.map((option) => {
          const isActive = option.value === value;
          return (
            <Pressable
              key={option.value}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
              onPress={() => onChange(option.value)}
              style={[
                styles.chip,
                {
                  backgroundColor: isActive ? theme.primary : 'transparent',
                  borderColor: isActive ? theme.primary : theme.border,
                },
              ]}
            >
              <Text
                style={[styles.label, { color: isActive ? theme.onPrimary : theme.textSecondary }]}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </FieldLabel>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  chip: {
    borderWidth: 1,
    borderRadius: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
});
