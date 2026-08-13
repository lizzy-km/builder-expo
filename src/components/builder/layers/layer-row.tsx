import { Pressable, StyleSheet, Text, View } from 'react-native';

import { WIDGET_GLYPHS } from '@/constants/control-glyphs';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { WIDGET_LABELS } from '@/lib/widget-defaults';
import type { WidgetBlock } from '@/types/builder';

export type LayerRowProps = {
  block: WidgetBlock;
  depth: number;
  isSelected: boolean;
  onSelect: () => void;
};

/** Indentation per nesting level. */
const INDENT = 14;

export function LayerRow({ block, depth, isSelected, onSelect }: LayerRowProps) {
  const theme = useTheme();
  const name = block.attributes?.name?.trim() || WIDGET_LABELS[block.type];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      onPress={onSelect}
      style={({ pressed }) => [
        styles.row,
        { paddingLeft: Spacing.two + depth * INDENT },
        isSelected && { backgroundColor: theme.primaryLight },
        pressed && !isSelected && styles.pressed,
      ]}
    >
      <Text style={[styles.glyph, { color: theme.textSecondary }]}>
        {WIDGET_GLYPHS[block.type]}
      </Text>
      <Text
        style={[styles.name, { color: isSelected ? theme.text : theme.textSecondary }]}
        numberOfLines={1}
      >
        {name}
      </Text>
      {block.attributes?.hidden ? (
        <View style={[styles.badge, { borderColor: theme.border }]}>
          <Text style={[styles.badgeText, { color: theme.textSecondary }]}>hidden</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingRight: Spacing.two,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.one,
  },
  glyph: {
    fontSize: 13,
    width: 18,
    textAlign: 'center',
  },
  name: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
  },
  badge: {
    borderWidth: 1,
    borderRadius: Spacing.one,
    paddingHorizontal: Spacing.one,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.6,
  },
});
