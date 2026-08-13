import { StyleSheet, Text, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useCountdown } from '@/hooks/use-countdown';
import { useTheme } from '@/hooks/use-theme';
import type { CountdownWidgetProps } from '@/types/builder';

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

function CountdownCell({ value, label, color }: { value: string; label: string; color: string }) {
  const theme = useTheme();

  return (
    <View style={styles.cell}>
      <Text style={[styles.value, { color }]}>{value}</Text>
      <Text style={[styles.label, { color: theme.textSecondary }]}>{label}</Text>
    </View>
  );
}

export function CountdownWidget({ targetAt, expiredLabel, color }: CountdownWidgetProps) {
  const theme = useTheme();
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetAt);
  const valueColor = color ?? theme.primary;

  if (isExpired) {
    return <Text style={[styles.expired, { color: valueColor }]}>{expiredLabel}</Text>;
  }

  return (
    <View style={styles.row}>
      <CountdownCell value={pad(days)} label="Days" color={valueColor} />
      <CountdownCell value={pad(hours)} label="Hours" color={valueColor} />
      <CountdownCell value={pad(minutes)} label="Mins" color={valueColor} />
      <CountdownCell value={pad(seconds)} label="Secs" color={valueColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  cell: {
    alignItems: 'center',
    minWidth: 48,
  },
  value: {
    fontSize: 28,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  expired: {
    fontSize: 20,
    fontWeight: '700',
  },
});
