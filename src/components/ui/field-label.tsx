import { StyleSheet, Text, View, type ViewProps } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type FieldLabelProps = ViewProps & {
  /** Omit to render just the control, with no label row. */
  label?: string;
  /** Short helper text under the label, for units or accepted formats. */
  hint?: string;
};

/** Label + control wrapper shared by every property-panel field. */
export function FieldLabel({ label, hint, children, style, ...rest }: FieldLabelProps) {
  const theme = useTheme();

  return (
    <View style={[styles.field, style]} {...rest}>
      {label ? (
        <View style={styles.labelRow}>
          <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
          {hint ? <Text style={[styles.hint, { color: theme.textSecondary }]}>{hint}</Text> : null}
        </View>
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: Spacing.two,
    /** Fills its row when siblings share one, but doesn't force width otherwise. */
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: 'auto',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
  hint: {
    fontSize: 11,
  },
});
