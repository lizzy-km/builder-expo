import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type IconSegmentedOption<T extends string> = {
  value: T;
  glyph: string;
  /** Spoken/hover name — the glyph alone isn't self-describing. */
  label: string;
};

export type IconSegmentedProps<T extends string> = {
  value: T;
  options: IconSegmentedOption<T>[];
  onChange: (value: T) => void;
};

/** Compact row of glyph buttons for layout and alignment choices. */
export function IconSegmented<T extends string>({
  value,
  options,
  onChange,
}: IconSegmentedProps<T>) {
  const theme = useTheme();

  return (
    <View style={styles.group}>
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="button"
            accessibilityLabel={option.label}
            accessibilityState={{ selected: isActive }}
            onPress={() => onChange(option.value)}
            style={({ pressed }) => [
              styles.segment,
              {
                backgroundColor: isActive ? theme.primary : theme.fieldInput,
                borderColor: isActive ? theme.primary : theme.fieldCardBorder,
              },
              pressed && !isActive && styles.pressed,
            ]}
          >
            <Text
              style={[styles.glyph, { color: isActive ? theme.onPrimary : theme.textSecondary }]}
            >
              {option.glyph}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    gap: Spacing.one,
  },
  segment: {
    flex: 1,
    minHeight: 34,
    borderWidth: 1,
    borderRadius: Spacing.one,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glyph: {
    fontSize: 15,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.6,
  },
});
