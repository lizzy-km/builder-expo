import { StyleSheet, View } from 'react-native';

import { PanelSection } from '@/components/builder/panel/panel-section';
import { NumberField } from '@/components/ui/number-field';
import { Spacing } from '@/constants/theme';
import type { StyleProps } from '@/types/builder';

export type SpacingSectionProps = {
  style: StyleProps;
  onChange: (patch: Partial<StyleProps>) => void;
};

const ROWS: { key: keyof StyleProps; label: string }[][] = [
  [
    { key: 'paddingHorizontal', label: 'Padding X' },
    { key: 'paddingVertical', label: 'Padding Y' },
  ],
  [
    { key: 'marginTop', label: 'Margin top' },
    { key: 'marginBottom', label: 'Margin bottom' },
  ],
];

export function SpacingSection({ style, onChange }: SpacingSectionProps) {
  const setValue = (key: keyof StyleProps) => (value: number | undefined) =>
    onChange({ [key]: value });

  return (
    <PanelSection title="Spacing">
      {ROWS.map((row) => (
        <View key={row[0]!.key} style={styles.row}>
          {row.map(({ key, label }) => (
            <NumberField
              key={key}
              label={label}
              value={style[key] as number | undefined}
              onChange={setValue(key)}
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
