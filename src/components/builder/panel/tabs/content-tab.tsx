import { StyleSheet, View } from 'react-native';

import { FieldCard } from '@/components/ui/field-card';
import { Spacing } from '@/constants/theme';
import { WidgetContentEditor } from '@/components/builder/panel/content-section';
import type { WidgetBlock, WidgetPropsPatch } from '@/types/builder';

export type ContentTabProps = {
  block: WidgetBlock;
  onChange: (patch: WidgetPropsPatch) => void;
};

/** The widget's own content fields, wrapped in a single card. */
export function ContentTab({ block, onChange }: ContentTabProps) {
  return (
    <View style={styles.tab}>
      <FieldCard>
        <WidgetContentEditor block={block} onChange={onChange} />
      </FieldCard>
    </View>
  );
}

const styles = StyleSheet.create({
  tab: {
    gap: Spacing.three,
  },
});
