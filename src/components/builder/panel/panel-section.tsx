import { useState, type PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type PanelSectionProps = PropsWithChildren<{
  title: string;
  initiallyOpen?: boolean;
}>;

/** Collapsible group of related property fields. */
export function PanelSection({ title, initiallyOpen = true, children }: PanelSectionProps) {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  return (
    <View style={[styles.section, { borderColor: theme.border }]}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
        onPress={() => setIsOpen((open) => !open)}
        style={styles.header}
      >
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        <Text style={[styles.chevron, { color: theme.textSecondary }]}>{isOpen ? '−' : '+'}</Text>
      </Pressable>

      {isOpen && <View style={styles.body}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    borderTopWidth: 1,
    paddingVertical: Spacing.two,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.two,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
  },
  chevron: {
    fontSize: 18,
    fontWeight: '700',
  },
  body: {
    gap: Spacing.three,
    paddingTop: Spacing.two,
  },
});
