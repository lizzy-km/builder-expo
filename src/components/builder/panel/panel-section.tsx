import { useState, type PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type PanelSectionProps = PropsWithChildren<{
  title: string;
  initiallyOpen?: boolean;
}>;

/** Collapsible card grouping related property fields. */
export function PanelSection({ title, initiallyOpen = true, children }: PanelSectionProps) {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  return (
    <View style={[styles.section, { backgroundColor: theme.background, borderColor: theme.border }]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${title} settings`}
        accessibilityState={{ expanded: isOpen }}
        onPress={() => setIsOpen((open) => !open)}
        style={({ pressed }) => [styles.header, pressed && styles.pressed]}
      >
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        <View style={[styles.chevronBox, { backgroundColor: theme.backgroundElement }]}>
          <Text style={[styles.chevron, { color: theme.textSecondary }]}>
            {isOpen ? '▾' : '▸'}
          </Text>
        </View>
      </Pressable>

      {isOpen ? (
        <View style={[styles.body, { borderTopColor: theme.border }]}>{children}</View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    borderWidth: 1,
    borderRadius: Spacing.three,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
  },
  pressed: {
    opacity: 0.6,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
  },
  chevronBox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevron: {
    fontSize: 11,
    fontWeight: '700',
  },
  body: {
    borderTopWidth: 1,
    gap: Spacing.four,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
  },
});
