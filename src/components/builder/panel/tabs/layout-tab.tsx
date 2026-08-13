import { StyleSheet, Text, View } from 'react-native';

import { FieldCard } from '@/components/ui/field-card';
import { IconSegmented } from '@/components/ui/icon-segmented';
import { NumberField } from '@/components/ui/number-field';
import { SizedDimensionField } from '@/components/ui/sized-dimension-field';
import { ALIGN_GLYPHS, JUSTIFY_GLYPHS, LAYOUT_GLYPHS } from '@/constants/control-glyphs';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { isLayoutType } from '@/lib/widget-kind';
import type { ContainerWidgetProps, StyleProps, WidgetBlock } from '@/types/builder';

export type LayoutTabProps = {
  block: WidgetBlock;
  onStyleChange: (patch: Partial<StyleProps>) => void;
  onPropsChange: (patch: Partial<ContainerWidgetProps>) => void;
};

/** Flow controls, shown only for widgets that lay out children. */
function FlowControls({
  props,
  onChange,
}: {
  props: ContainerWidgetProps;
  onChange: (patch: Partial<ContainerWidgetProps>) => void;
}) {
  return (
    <>
      <FieldCard label="Layout type">
        <IconSegmented
          value={props.wrap ? 'wrap' : props.direction}
          options={[
            { value: 'column', glyph: LAYOUT_GLYPHS.column, label: 'Stack vertically' },
            { value: 'row', glyph: LAYOUT_GLYPHS.row, label: 'Lay out horizontally' },
            { value: 'wrap', glyph: LAYOUT_GLYPHS.wrap, label: 'Wrap onto new lines' },
          ]}
          onChange={(value) =>
            value === 'wrap'
              ? onChange({ wrap: true, direction: 'row' })
              : onChange({ wrap: false, direction: value })
          }
        />
      </FieldCard>

      <FieldCard label="Alignment">
        <IconSegmented
          value={props.justify}
          options={[
            { value: 'flex-start', glyph: JUSTIFY_GLYPHS['flex-start'], label: 'Align to start' },
            { value: 'center', glyph: JUSTIFY_GLYPHS.center, label: 'Center' },
            { value: 'flex-end', glyph: JUSTIFY_GLYPHS['flex-end'], label: 'Align to end' },
            {
              value: 'space-between',
              glyph: JUSTIFY_GLYPHS['space-between'],
              label: 'Space between',
            },
          ]}
          onChange={(justify) => onChange({ justify })}
        />
        <IconSegmented
          value={props.align}
          options={[
            { value: 'flex-start', glyph: ALIGN_GLYPHS['flex-start'], label: 'Cross-axis start' },
            { value: 'center', glyph: ALIGN_GLYPHS.center, label: 'Cross-axis center' },
            { value: 'flex-end', glyph: ALIGN_GLYPHS['flex-end'], label: 'Cross-axis end' },
            { value: 'stretch', glyph: ALIGN_GLYPHS.stretch, label: 'Stretch to fill' },
          ]}
          onChange={(align) => onChange({ align })}
        />
      </FieldCard>

      <FieldCard label="Gap">
        <NumberField value={props.gap} onChange={(gap) => onChange({ gap: gap ?? 0 })} />
      </FieldCard>
    </>
  );
}

export function LayoutTab({ block, onStyleChange, onPropsChange }: LayoutTabProps) {
  const theme = useTheme();
  const showsFlow = isLayoutType(block.type) && block.type === 'container';

  return (
    <View style={styles.tab}>
      {showsFlow ? (
        <>
          <Text style={[styles.groupTitle, { color: theme.text }]}>Layout</Text>
          <FlowControls
            props={block.props as ContainerWidgetProps}
            onChange={onPropsChange}
          />
        </>
      ) : null}

      <Text style={[styles.groupTitle, { color: theme.text }]}>Size</Text>

      <FieldCard label="Height">
        <SizedDimensionField
          value={block.style.height}
          onChange={(height) => onStyleChange({ height })}
        />
        <View style={styles.pairRow}>
          <SizedDimensionField
            label="Min height"
            value={block.style.minHeight}
            onChange={(minHeight) => onStyleChange({ minHeight })}
          />
          <SizedDimensionField
            label="Max height"
            value={block.style.maxHeight}
            onChange={(maxHeight) => onStyleChange({ maxHeight })}
          />
        </View>
      </FieldCard>

      <FieldCard label="Width">
        <SizedDimensionField
          label=""
          value={block.style.width}
          onChange={(width) => onStyleChange({ width })}
        />
        <View style={styles.pairRow}>
          <SizedDimensionField
            label="Min width"
            value={block.style.minWidth}
            onChange={(minWidth) => onStyleChange({ minWidth })}
          />
          <SizedDimensionField
            label="Max width"
            value={block.style.maxWidth}
            onChange={(maxWidth) => onStyleChange({ maxWidth })}
          />
        </View>
      </FieldCard>
    </View>
  );
}

const styles = StyleSheet.create({
  tab: {
    gap: Spacing.three,
  },
  groupTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: Spacing.one,
  },
  pairRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
});
