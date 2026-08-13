import { StyleSheet, Text, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type EventFactWidgetProps = {
  caption: string;
  value: string;
  /** Secondary line, e.g. a timezone offset. */
  detail?: string;
};

/** Caption-over-value presentation shared by the end date, end hour, and zone widgets. */
export function EventFactWidget({ caption, value, detail }: EventFactWidgetProps) {
  const theme = useTheme();

  return (
    <View style={styles.fact}>
      <Text style={[styles.caption, { color: theme.textSecondary }]}>{caption}</Text>
      <Text style={[styles.value, { color: theme.text }]}>{value}</Text>
      {detail ? <Text style={[styles.detail, { color: theme.primary }]}>{detail}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  fact: {
    gap: Spacing.half,
  },
  caption: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
  },
  detail: {
    fontSize: 13,
    fontWeight: '600',
  },
});
