import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { BlockList } from '@/components/builder/block-list';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { WidgetBlock } from '@/types/builder';

export type BuilderCanvasProps = {
  blocks: WidgetBlock[];
  selectedId: string | null;
  /** Bumped to replay entrance animations across the page. */
  replayKey: number;
  onSelect: (id: string | null) => void;
  onReorder: (parentId: string | null, from: number, to: number) => void;
};

/** Fallback row height until the first block reports its measured height. */
const ESTIMATED_ROW_HEIGHT = 96;

export function BuilderCanvas({
  blocks,
  selectedId,
  replayKey,
  onSelect,
  onReorder,
}: BuilderCanvasProps) {
  const theme = useTheme();
  const [rowHeight, setRowHeight] = useState(ESTIMATED_ROW_HEIGHT);

  if (blocks.length === 0) {
    return <EmptyCanvas />;
  }

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <BlockList
        blocks={blocks}
        parentId={null}
        selectedId={selectedId}
        rowHeight={rowHeight}
        replayKey={replayKey}
        onSelect={onSelect}
        onReorder={onReorder}
        onMeasure={setRowHeight}
      />
    </ScrollView>
  );
}

function EmptyCanvas() {
  const theme = useTheme();

  return (
    <View style={[styles.empty, { backgroundColor: theme.background }]}>
      <Text style={[styles.emptyTitle, { color: theme.text }]}>Your page is empty</Text>
      <Text style={[styles.emptyHint, { color: theme.textSecondary }]}>
        Add a widget from the palette below to get started.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.three,
    gap: Spacing.two,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.four,
    gap: Spacing.two,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  emptyHint: {
    fontSize: 14,
    textAlign: 'center',
  },
});
