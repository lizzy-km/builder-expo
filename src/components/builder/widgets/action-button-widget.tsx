import { StyleSheet, Text, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ActionButtonWidgetProps = {
  label: string;
  backgroundColor?: string;
  textColor?: string;
  /** Shown under the button in the editor to explain the widget's runtime behaviour. */
  note?: string;
};

/**
 * Shared presentation for the event action buttons (submit entry, register). The editor
 * renders them inert; wiring them to a backend is a separate concern.
 */
export function ActionButtonWidget({
  label,
  backgroundColor,
  textColor,
  note,
}: ActionButtonWidgetProps) {
  const theme = useTheme();

  return (
    <View style={styles.wrapper}>
      <View style={[styles.button, { backgroundColor: backgroundColor ?? theme.primary }]}>
        <Text style={[styles.label, { color: textColor ?? theme.onPrimary }]}>{label}</Text>
      </View>
      {note ? <Text style={[styles.note, { color: theme.textSecondary }]}>{note}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: Spacing.two,
    alignItems: 'flex-start',
  },
  button: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  note: {
    fontSize: 12,
  },
});
