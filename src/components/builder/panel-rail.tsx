import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type RailItem<T extends string> = {
  value: T;
  glyph: string;
  label: string;
};

export type PanelRailProps<T extends string> = {
  value: T;
  items: RailItem<T>[];
  onChange: (value: T) => void;
  /** Vertical on wide layouts (a true rail), horizontal in the bottom drawer. */
  orientation: 'vertical' | 'horizontal';
};

/** Switches between the editor's panel surfaces. */
export function PanelRail<T extends string>({
  value,
  items,
  onChange,
  orientation,
}: PanelRailProps<T>) {
  const theme = useTheme();
  const isVertical = orientation === 'vertical';

  return (
    <View
      style={[
        isVertical ? styles.railVertical : styles.railHorizontal,
        { backgroundColor: theme.panelRail, borderColor: theme.border },
      ]}
    >
      {items.map((item) => {
        const isActive = item.value === value;
        return (
          <Pressable
            key={item.value}
            accessibilityRole="button"
            accessibilityLabel={item.label}
            accessibilityState={{ selected: isActive }}
            onPress={() => onChange(item.value)}
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: isActive ? theme.primary : 'transparent' },
              pressed && !isActive && styles.pressed,
            ]}
          >
            <Text
              style={[styles.glyph, { color: isActive ? theme.onPrimary : theme.textSecondary }]}
            >
              {item.glyph}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  railVertical: {
    borderRightWidth: 1,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.one,
    gap: Spacing.two,
  },
  railHorizontal: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    gap: Spacing.two,
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glyph: {
    fontSize: 16,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.6,
  },
});
