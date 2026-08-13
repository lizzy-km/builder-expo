import { StyleSheet, Text, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { TableWidgetProps } from '@/types/builder';

function TableRow({
  cells,
  columnCount,
  isHeader,
}: {
  cells: string[];
  columnCount: number;
  isHeader?: boolean;
}) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.row,
        { borderBottomColor: theme.border },
        isHeader && { backgroundColor: theme.backgroundSelected },
      ]}
    >
      {Array.from({ length: columnCount }, (_, index) => (
        <Text
          key={index}
          style={[
            styles.cell,
            { color: isHeader ? theme.text : theme.textSecondary },
            isHeader && styles.headerCell,
          ]}
          numberOfLines={2}
        >
          {cells[index] ?? ''}
        </Text>
      ))}
    </View>
  );
}

export function TableWidget({ headers, rows, showHeader }: TableWidgetProps) {
  const theme = useTheme();
  const columnCount = Math.max(headers.length, ...rows.map((row) => row.length), 1);

  return (
    <View style={[styles.table, { borderColor: theme.border }]}>
      {showHeader && <TableRow cells={headers} columnCount={columnCount} isHeader />}
      {rows.map((row, index) => (
        <TableRow key={index} cells={row} columnCount={columnCount} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    width: '100%',
    borderWidth: 1,
    borderRadius: Spacing.two,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  cell: {
    flex: 1,
    fontSize: 13,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.two,
  },
  headerCell: {
    fontWeight: '700',
  },
});
