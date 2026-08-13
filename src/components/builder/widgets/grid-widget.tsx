import { Children, type PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

import { EmptyLayoutHint } from '@/components/builder/widgets/container-widget';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { GridWidgetProps } from '@/types/builder';

function columnPercent(columns: number): `${number}%` {
  const safeColumns = Math.max(1, Math.floor(columns));
  return `${100 / safeColumns}%`;
}

/**
 * Grid layout container. React Native has no CSS grid and no `calc()`, so cells take an
 * exact percentage basis and spacing comes from per-cell padding — using `gap` here
 * would push the last column of each row onto its own line.
 */
export function GridWidget({ columns, gap, children }: PropsWithChildren<GridWidgetProps>) {
  const theme = useTheme();
  const items = Children.toArray(children);

  if (items.length === 0) {
    return <EmptyLayoutHint label="Empty grid" />;
  }

  const basis = columnPercent(columns);
  const inset = gap / 2;

  return (
    <View style={[styles.grid, { margin: -inset, borderColor: theme.border }]}>
      {items.map((child, index) => (
        <View key={index} style={[styles.cell, { flexBasis: basis, padding: inset }]}>
          {child}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: Spacing.two,
    padding: Spacing.two,
  },
  cell: {
    flexGrow: 0,
    flexShrink: 1,
  },
});
