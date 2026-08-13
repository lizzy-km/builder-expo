import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/ui/app-button';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { WIDGET_GROUPS } from '@/lib/widget-groups';
import { WIDGET_LABELS } from '@/lib/widget-defaults';
import type { WidgetType } from '@/types/builder';

export type WidgetPaletteProps = {
  onAdd: (type: WidgetType) => void;
  /** Name of the container new widgets land in, when one is selected. */
  targetLabel?: string;
};

/** Grouped, scrollable tray of widget types that can be added to the canvas. */
export function WidgetPalette({ onAdd, targetLabel }: WidgetPaletteProps) {
  const theme = useTheme();

  return (
    <View style={[styles.tray, { backgroundColor: theme.backgroundElement }]}>
      {targetLabel ? (
        <Text style={[styles.target, { color: theme.textSecondary }]}>
          Adding inside {targetLabel}
        </Text>
      ) : null}

      <ScrollView style={styles.scroll} contentContainerStyle={styles.groups}>
        {WIDGET_GROUPS.map((group) => (
          <View key={group.title} style={styles.group}>
            <Text style={[styles.groupTitle, { color: theme.textSecondary }]}>{group.title}</Text>
            <View style={styles.row}>
              {group.types.map((type) => (
                <AppButton
                  key={type}
                  label={WIDGET_LABELS[type]}
                  variant="secondary"
                  size="small"
                  onPress={() => onAdd(type)}
                />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tray: {
    maxHeight: 200,
    paddingTop: Spacing.two,
  },
  target: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.one,
  },
  scroll: {
    flexGrow: 0,
  },
  groups: {
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.three,
    gap: Spacing.three,
  },
  group: {
    gap: Spacing.two,
  },
  groupTitle: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
});
