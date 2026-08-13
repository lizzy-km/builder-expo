import type { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { ContainerWidgetProps } from '@/types/builder';

/** Flex layout container. Children are rendered by the canvas and passed in. */
export function ContainerWidget({
  direction,
  gap,
  justify,
  align,
  wrap,
  children,
}: PropsWithChildren<ContainerWidgetProps>) {
  const theme = useTheme();

  if (!children) {
    return <EmptyLayoutHint label="Empty flex container" />;
  }

  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: direction,
          gap,
          justifyContent: justify,
          alignItems: align,
          flexWrap: wrap ? 'wrap' : 'nowrap',
          borderColor: theme.border,
        },
      ]}
    >
      {children}
    </View>
  );
}

/** Shared dashed placeholder shown when a layout widget has no children yet. */
export function EmptyLayoutHint({ label }: { label: string }) {
  const theme = useTheme();

  return (
    <View style={[styles.empty, { borderColor: theme.border }]}>
      <Text style={[styles.hint, { color: theme.textSecondary }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: Spacing.two,
    padding: Spacing.two,
  },
  empty: {
    minHeight: 80,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: Spacing.two,
    padding: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hint: {
    fontSize: 14,
  },
});
