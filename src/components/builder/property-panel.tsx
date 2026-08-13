import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { DrawerTabs } from '@/components/builder/drawer-tabs';
import { PanelHeader } from '@/components/builder/panel/panel-header';
import { AnimationTab } from '@/components/builder/panel/tabs/animation-tab';
import { AttributesTab } from '@/components/builder/panel/tabs/attributes-tab';
import { ContentTab } from '@/components/builder/panel/tabs/content-tab';
import { LayoutTab } from '@/components/builder/panel/tabs/layout-tab';
import { StyleTab } from '@/components/builder/panel/tabs/style-tab';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useBuilderStore } from '@/lib/builder-store';
import { WIDGET_LABELS } from '@/lib/widget-defaults';
import type { ContainerWidgetProps } from '@/types/builder';

type PropertyTab = 'content' | 'layout' | 'style' | 'animation' | 'attributes';

const TAB_OPTIONS: { value: PropertyTab; label: string }[] = [
  { value: 'content', label: 'Content' },
  { value: 'layout', label: 'Layout' },
  { value: 'style', label: 'Style' },
  { value: 'animation', label: 'Animation' },
  { value: 'attributes', label: 'Attributes' },
];

export type PropertyPanelProps = {
  /** True in the side panel, where the panel should use the full column height. */
  fillHeight?: boolean;
};

/** Editor for the currently selected block, split across property tabs. */
export function PropertyPanel({ fillHeight = false }: PropertyPanelProps) {
  const theme = useTheme();
  const [tab, setTab] = useState<PropertyTab>('content');

  const selectedId = useBuilderStore((state) => state.selectedId);
  const block = useBuilderStore((state) =>
    state.blocks.find((candidate) => candidate.id === state.selectedId),
  );
  const updateWidgetProps = useBuilderStore((state) => state.updateWidgetProps);
  const updateWidgetStyle = useBuilderStore((state) => state.updateWidgetStyle);
  const updateWidgetAnimation = useBuilderStore((state) => state.updateWidgetAnimation);
  const updateWidgetAttributes = useBuilderStore((state) => state.updateWidgetAttributes);
  const removeWidget = useBuilderStore((state) => state.removeWidget);

  if (!block || !selectedId) {
    return (
      <View style={styles.empty}>
        <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
          Select an element on the canvas to edit it.
        </Text>
      </View>
    );
  }

  return (
    <View style={fillHeight ? styles.panelFill : styles.panel}>
      <PanelHeader
        widgetLabel={block.attributes?.name || WIDGET_LABELS[block.type]}
        onDelete={() => removeWidget(selectedId)}
      />

      <DrawerTabs value={tab} options={TAB_OPTIONS} onChange={setTab} scrollable />

      <ScrollView
        style={fillHeight ? styles.scrollFill : styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {tab === 'content' ? (
          <ContentTab block={block} onChange={(patch) => updateWidgetProps(selectedId, patch)} />
        ) : null}

        {tab === 'layout' ? (
          <LayoutTab
            block={block}
            onStyleChange={(patch) => updateWidgetStyle(selectedId, patch)}
            onPropsChange={(patch: Partial<ContainerWidgetProps>) =>
              updateWidgetProps(selectedId, patch)
            }
          />
        ) : null}

        {tab === 'style' ? (
          <StyleTab
            style={block.style}
            onChange={(patch) => updateWidgetStyle(selectedId, patch)}
          />
        ) : null}

        {tab === 'animation' ? (
          <AnimationTab
            animation={block.animation}
            onChange={(patch) => updateWidgetAnimation(selectedId, patch)}
          />
        ) : null}

        {tab === 'attributes' ? (
          <AttributesTab
            attributes={block.attributes}
            onChange={(patch) => updateWidgetAttributes(selectedId, patch)}
          />
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    maxHeight: 360,
  },
  panelFill: {
    flex: 1,
  },
  scroll: {
    flexGrow: 0,
  },
  scrollFill: {
    flex: 1,
  },
  content: {
    padding: Spacing.three,
    paddingBottom: Spacing.five,
  },
  empty: {
    padding: Spacing.four,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 13,
    textAlign: 'center',
  },
});
