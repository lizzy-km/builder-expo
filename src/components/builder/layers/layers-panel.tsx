import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { LayerRow } from '@/components/builder/layers/layer-row';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { flattenTree } from '@/lib/block-tree';
import { useBuilderStore } from '@/lib/builder-store';

export type LayersPanelProps = {
  fillHeight?: boolean;
};

/** Outline of the page's block tree; tapping a row selects that block on the canvas. */
export function LayersPanel({ fillHeight = false }: LayersPanelProps) {
  const theme = useTheme();
  const blocks = useBuilderStore((state) => state.blocks);
  const selectedId = useBuilderStore((state) => state.selectedId);
  const selectWidget = useBuilderStore((state) => state.selectWidget);

  const rows = flattenTree(blocks);

  return (
    <ScrollView
      style={fillHeight ? styles.scrollFill : styles.scroll}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.heading, { color: theme.text }]}>Layers</Text>

      {rows.length === 0 ? (
        <View style={styles.empty}>
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            No elements yet. Add one from the Insert tab.
          </Text>
        </View>
      ) : (
        rows.map(({ block, depth }) => (
          <LayerRow
            key={block.id}
            block={block}
            depth={depth}
            isSelected={block.id === selectedId}
            onSelect={() => selectWidget(block.id)}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 0,
    maxHeight: 340,
  },
  scrollFill: {
    flex: 1,
  },
  content: {
    padding: Spacing.three,
    paddingBottom: Spacing.five,
    gap: Spacing.half,
  },
  heading: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: Spacing.two,
  },
  empty: {
    paddingVertical: Spacing.four,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 13,
    textAlign: 'center',
  },
});
