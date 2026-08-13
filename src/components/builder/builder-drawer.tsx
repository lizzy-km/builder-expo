import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { PropertyPanel } from '@/components/builder/property-panel';
import { WidgetPalette } from '@/components/builder/widget-palette';
import { SegmentedField } from '@/components/ui/segmented-field';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useBuilderStore } from '@/lib/builder-store';
import { WIDGET_LABELS } from '@/lib/widget-defaults';
import { isLayoutType } from '@/lib/widget-kind';

type DrawerTab = 'add' | 'settings';

/**
 * Bottom drawer holding the two editing surfaces. New widgets nest into the selected
 * block when it's a layout widget, otherwise they land at the top level.
 */
export function BuilderDrawer() {
  const theme = useTheme();
  const [tab, setTab] = useState<DrawerTab>('add');

  const selected = useBuilderStore((state) =>
    state.blocks.find((block) => block.id === state.selectedId),
  );
  const addWidget = useBuilderStore((state) => state.addWidget);

  const nestInto = selected && isLayoutType(selected.type) ? selected : undefined;
  const activeTab: DrawerTab = selected ? tab : 'add';

  return (
    <View style={[styles.drawer, { backgroundColor: theme.backgroundElement }]}>
      {selected ? (
        <View style={styles.tabs}>
          <SegmentedField
            label=""
            value={activeTab}
            options={[
              { value: 'add', label: 'Add widget' },
              { value: 'settings', label: `${WIDGET_LABELS[selected.type]} settings` },
            ]}
            onChange={setTab}
          />
        </View>
      ) : null}

      {activeTab === 'settings' ? (
        <PropertyPanel />
      ) : (
        <WidgetPalette
          onAdd={(type) => addWidget(type, nestInto?.id ?? null)}
          targetLabel={nestInto ? WIDGET_LABELS[nestInto.type] : undefined}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  drawer: {
    borderTopLeftRadius: Spacing.four,
    borderTopRightRadius: Spacing.four,
    overflow: 'hidden',
  },
  tabs: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
  },
});
