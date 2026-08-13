import type { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type FieldCardProps = PropsWithChildren<{
  /** Omit for a card that holds only controls, with no caption. */
  label?: string;
}>;

/**
 * Tinted container holding one logical group of controls. Grouping related fields in a
 * filled card (rather than separating them with rules) is what gives the editor panel
 * its scannable structure.
 */
export function FieldCard({ label, children }: FieldCardProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.fieldCard, borderColor: theme.fieldCardBorder },
      ]}
    >
      {label ? <Text style={[styles.label, { color: theme.text }]}>{label}</Text> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: Spacing.two,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
});
