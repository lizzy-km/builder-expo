import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FieldLabel } from '@/components/ui/field-label';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type SegmentedOption<T extends string> = {
  value: T;
  label: string;
};

export type SegmentedFieldProps<T extends string> = {
  label: string;
  value: T;
  options: SegmentedOption<T>[];
  onChange: (value: T) => void;
};

/** Single-choice selector rendered as a row of connected buttons. */
export function SegmentedField<T extends string>({
  label,
  value,
  options,
  onChange,
}: SegmentedFieldProps<T>) {
  const theme = useTheme();

  return (
    <FieldLabel label={label}>
      <View style={[styles.group, { borderColor: theme.border }]}>
        {options.map((option) => {
          const isActive = option.value === value;
          return (
            <Pressable
              key={option.value}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
              onPress={() => onChange(option.value)}
              style={[
                styles.segment,
                { backgroundColor: isActive ? theme.primary : 'transparent' },
              ]}
            >
              <Text
                style={[
                  styles.segmentLabel,
                  { color: isActive ? theme.onPrimary : theme.textSecondary },
                ]}
                numberOfLines={1}
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
  group: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: Spacing.two,
    overflow: 'hidden',
  },
  segment: {
    flex: 1,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.one,
    alignItems: 'center',
  },
  segmentLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});
