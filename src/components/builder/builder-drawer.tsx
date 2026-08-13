import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { LayersPanel } from '@/components/builder/layers/layers-panel';
import { PanelRail, type RailItem } from '@/components/builder/panel-rail';
import { PropertyPanel } from '@/components/builder/property-panel';
import { SubTemplatesPanel } from '@/components/builder/templates/sub-templates-panel';
import { WidgetPalette } from '@/components/builder/widget-palette';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useBuilderStore } from '@/lib/builder-store';
import { WIDGET_LABELS } from '@/lib/widget-defaults';
import { isLayoutType } from '@/lib/widget-kind';

type Surface = 'insert' | 'layers' | 'templates' | 'properties';

const RAIL_ITEMS: RailItem<Surface>[] = [
  { value: 'insert', glyph: '＋', label: 'Insert element' },
  { value: 'layers', glyph: '☰', label: 'Layers' },
  { value: 'templates', glyph: '❐', label: 'Sub templates' },
  { value: 'properties', glyph: '⚙', label: 'Properties' },
];

export type BuilderDrawerProps = {
  /** Side panel on wide screens, bottom sheet on narrow ones. */
  placement: 'side' | 'bottom';
};

/** Hosts the editor's four panel surfaces behind an icon rail. */
export function BuilderDrawer({ placement }: BuilderDrawerProps) {
  const theme = useTheme();
  const [surface, setSurface] = useState<Surface>('insert');

  const selected = useBuilderStore((state) =>
    state.blocks.find((block) => block.id === state.selectedId),
  );
  const addWidget = useBuilderStore((state) => state.addWidget);

  // Reveal the properties surface when the canvas selection changes, so tapping an
  // element on the canvas shows its settings instead of leaving the palette open.
  const previousSelection = useRef<string | undefined>(selected?.id);
  useEffect(() => {
    if (selected?.id && selected.id !== previousSelection.current) {
      setSurface('properties');
    }
    previousSelection.current = selected?.id;
  }, [selected?.id]);

  const nestInto = selected && isLayoutType(selected.type) ? selected : undefined;
  const isSide = placement === 'side';

  return (
    <View
      style={[
        isSide ? styles.side : styles.bottom,
        { backgroundColor: theme.panelSurface, borderColor: theme.border },
      ]}
    >
      <PanelRail
        value={surface}
        items={RAIL_ITEMS}
        onChange={setSurface}
        orientation={isSide ? 'vertical' : 'horizontal'}
      />

      <View style={styles.body}>
        {surface === 'insert' ? (
          <WidgetPalette
            onAdd={(type) => addWidget(type, nestInto?.id ?? null)}
            targetLabel={nestInto ? WIDGET_LABELS[nestInto.type] : undefined}
            fillHeight={isSide}
          />
        ) : null}

        {surface === 'layers' ? <LayersPanel fillHeight={isSide} /> : null}
        {surface === 'templates' ? <SubTemplatesPanel fillHeight={isSide} /> : null}
        {surface === 'properties' ? <PropertyPanel fillHeight={isSide} /> : null}
      </View>
    </View>
  );
}

/** Width of the side panel on wide layouts, including the rail. */
const SIDE_PANEL_WIDTH = 340;

const styles = StyleSheet.create({
  side: {
    width: SIDE_PANEL_WIDTH,
    flexDirection: 'row',
    borderLeftWidth: 1,
  },
  bottom: {
    borderTopLeftRadius: Spacing.four,
    borderTopRightRadius: Spacing.four,
    overflow: 'hidden',
  },
  body: {
    flex: 1,
  },
});
