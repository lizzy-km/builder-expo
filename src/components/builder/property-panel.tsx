import { ScrollView, StyleSheet, View } from 'react-native';

import { AnimationSection } from '@/components/builder/panel/animation-section';
import { AppearanceSection } from '@/components/builder/panel/appearance-section';
import { ContentSection } from '@/components/builder/panel/content-section';
import { SizeSection } from '@/components/builder/panel/size-section';
import { SpacingSection } from '@/components/builder/panel/spacing-section';
import { Spacing } from '@/constants/theme';
import { useBuilderStore } from '@/lib/builder-store';

/** Editor for the currently selected block. Renders nothing when no block is selected. */
export function PropertyPanel() {
  const selectedId = useBuilderStore((state) => state.selectedId);
  const block = useBuilderStore((state) =>
    state.blocks.find((candidate) => candidate.id === state.selectedId),
  );
  const updateWidgetProps = useBuilderStore((state) => state.updateWidgetProps);
  const updateWidgetStyle = useBuilderStore((state) => state.updateWidgetStyle);
  const updateWidgetAnimation = useBuilderStore((state) => state.updateWidgetAnimation);

  if (!block || !selectedId) return null;

  return (
    <View style={styles.panel}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <ContentSection
          block={block}
          onChange={(patch) => updateWidgetProps(selectedId, patch)}
        />
        <SizeSection
          size={block.style}
          onChange={(patch) => updateWidgetStyle(selectedId, patch)}
        />
        <SpacingSection
          style={block.style}
          onChange={(patch) => updateWidgetStyle(selectedId, patch)}
        />
        <AppearanceSection
          style={block.style}
          onChange={(patch) => updateWidgetStyle(selectedId, patch)}
        />
        <AnimationSection
          animation={block.animation}
          onChange={(patch) => updateWidgetAnimation(selectedId, patch)}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    maxHeight: 320,
  },
  scroll: {
    flexGrow: 0,
  },
  content: {
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.four,
  },
});
