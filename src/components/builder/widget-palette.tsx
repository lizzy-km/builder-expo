import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { PaletteTile } from '@/components/builder/palette-tile';
import { PanelSection } from '@/components/builder/panel/panel-section';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { ADVANCED_WIDGET_GROUPS, WIDGET_GROUPS, type WidgetGroup } from '@/lib/widget-groups';
import type { WidgetType } from '@/types/builder';

export type WidgetPaletteProps = {
  onAdd: (type: WidgetType) => void;
  /** Name of the container new widgets land in, when one is selected. */
  targetLabel?: string;
  /** True in the side panel, where the tray should use the full column height. */
  fillHeight?: boolean;
};

function TileGrid({ group, onAdd }: { group: WidgetGroup; onAdd: (type: WidgetType) => void }) {
  return (
    <View style={styles.grid}>
      {group.types.map((type) => (
        <PaletteTile key={type} type={type} onPress={() => onAdd(type)} />
      ))}
    </View>
  );
}

/** Insert palette: labelled widget tiles, grouped, with advanced groups collapsed. */
export function WidgetPalette({ onAdd, targetLabel, fillHeight = false }: WidgetPaletteProps) {
  const theme = useTheme();

  return (
    <ScrollView
      style={fillHeight ? styles.scrollFill : styles.scroll}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.heading, { color: theme.text }]}>Insert Element</Text>

      {targetLabel ? (
        <Text style={[styles.target, { color: theme.primary }]}>Adding inside {targetLabel}</Text>
      ) : null}

      {WIDGET_GROUPS.map((group) => (
        <View key={group.title} style={styles.group}>
          <Text style={[styles.groupTitle, { color: theme.text }]}>{group.title}</Text>
          <TileGrid group={group} onAdd={onAdd} />
        </View>
      ))}

      <Text style={[styles.heading, { color: theme.text }]}>Advanced Widgets</Text>

      {ADVANCED_WIDGET_GROUPS.map((group) => (
        <PanelSection key={group.title} title={group.title} initiallyOpen={false}>
          <TileGrid group={group} onAdd={onAdd} />
        </PanelSection>
      ))}
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
    gap: Spacing.three,
  },
  heading: {
    fontSize: 15,
    fontWeight: '700',
  },
  target: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: -Spacing.two,
  },
  group: {
    gap: Spacing.two,
  },
  groupTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
});
