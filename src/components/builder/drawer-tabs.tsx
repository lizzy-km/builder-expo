import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type DrawerTabsProps<T extends string> = {
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  /** Scroll horizontally instead of dividing the width — for more than ~3 tabs. */
  scrollable?: boolean;
};

/** Underlined tab strip for switching panel surfaces. */
export function DrawerTabs<T extends string>({
  value,
  options,
  onChange,
  scrollable = false,
}: DrawerTabsProps<T>) {
  const theme = useTheme();

  const tabs = (
    <>
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            onPress={() => onChange(option.value)}
            style={[
              scrollable ? styles.scrollTab : styles.tab,
              { borderBottomColor: isActive ? theme.primary : 'transparent' },
            ]}
          >
            <Text
              style={[
                styles.label,
                { color: isActive ? theme.text : theme.textSecondary },
                isActive && styles.activeLabel,
              ]}
              numberOfLines={1}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </>
  );

  if (scrollable) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.scrollStrip, { borderBottomColor: theme.border }]}
        contentContainerStyle={styles.scrollContent}
      >
        {tabs}
      </ScrollView>
    );
  }

  return <View style={[styles.strip, { borderBottomColor: theme.border }]}>{tabs}</View>;
}

const styles = StyleSheet.create({
  strip: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingHorizontal: Spacing.two,
  },
  scrollStrip: {
    flexGrow: 0,
    borderBottomWidth: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.two,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.three,
    borderBottomWidth: 2,
    marginBottom: -1,
  },
  scrollTab: {
    alignItems: 'center',
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three,
    borderBottomWidth: 2,
    marginBottom: -1,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
  activeLabel: {
    fontWeight: '700',
  },
});
