import { StyleSheet, Text, View, type ViewProps } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type FieldLabelProps = ViewProps & {
  label: string;
};

/** Vertical label + control wrapper shared by every property-panel field. */
export function FieldLabel({ label, children, style, ...rest }: FieldLabelProps) {
  const theme = useTheme();

  return (
    <View style={[styles.field, style]} {...rest}>
      <Text style={[styles.label, { color: theme.textSecondary }]}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: Spacing.one,
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
