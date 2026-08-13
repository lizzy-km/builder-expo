import { StyleSheet, View } from 'react-native';

import { PanelSection } from '@/components/builder/panel/panel-section';
import { DimensionField } from '@/components/ui/dimension-field';
import { Spacing } from '@/constants/theme';
import type { DimensionValue } from '@/lib/dimension-value';
import type { SizeProps } from '@/types/builder';

export type SizeSectionProps = {
  size: SizeProps;
  onChange: (patch: SizeProps) => void;
};

/** Field order mirrors CSS box sizing: base, then min, then max. */
const ROWS: { key: keyof SizeProps; label: string }[][] = [
  [
    { key: 'width', label: 'Width' },
    { key: 'height', label: 'Height' },
  ],
  [
    { key: 'minWidth', label: 'Min width' },
    { key: 'minHeight', label: 'Min height' },
  ],
  [
    { key: 'maxWidth', label: 'Max width' },
    { key: 'maxHeight', label: 'Max height' },
  ],
];

export function SizeSection({ size, onChange }: SizeSectionProps) {
  const setDimension = (key: keyof SizeProps) => (value: DimensionValue | undefined) =>
    onChange({ [key]: value });

  return (
    <PanelSection title="Size">
      {ROWS.map((row) => (
        <View key={row[0]!.key} style={styles.row}>
          {row.map(({ key, label }) => (
            <DimensionField
              key={key}
              label={label}
              value={size[key]}
              onChange={setDimension(key)}
            />
          ))}
        </View>
      ))}
    </PanelSection>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
});
