import { StyleSheet, Text, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { ButtonWidgetProps } from '@/types/builder';

export function ButtonWidget({ label, backgroundColor, textColor }: ButtonWidgetProps) {
  const theme = useTheme();

  return (
    <View style={[styles.button, { backgroundColor: backgroundColor ?? theme.primary }]}>
      <Text style={[styles.label, { color: textColor ?? theme.onPrimary }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
});
