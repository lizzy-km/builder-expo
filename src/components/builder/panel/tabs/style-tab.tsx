import { StyleSheet, View } from 'react-native';

import { ColorField } from '@/components/ui/color-field';
import { FieldCard } from '@/components/ui/field-card';
import { NumberField } from '@/components/ui/number-field';
import { Spacing } from '@/constants/theme';
import type { StyleProps } from '@/types/builder';

export type StyleTabProps = {
  style: StyleProps;
  onChange: (patch: Partial<StyleProps>) => void;
};

export function StyleTab({ style, onChange }: StyleTabProps) {
  return (
    <View style={styles.tab}>
      <FieldCard label="Background">
        <ColorField
          value={style.backgroundColor}
          onChange={(backgroundColor) => onChange({ backgroundColor })}
        />
      </FieldCard>

      <FieldCard label="Padding">
        <View style={styles.pairRow}>
          <NumberField
            label="Horizontal"
            value={style.paddingHorizontal}
            onChange={(paddingHorizontal) => onChange({ paddingHorizontal })}
          />
          <NumberField
            label="Vertical"
            value={style.paddingVertical}
            onChange={(paddingVertical) => onChange({ paddingVertical })}
          />
        </View>
      </FieldCard>

      <FieldCard label="Margin">
        <View style={styles.pairRow}>
          <NumberField
            label="Top"
            value={style.marginTop}
            onChange={(marginTop) => onChange({ marginTop })}
          />
          <NumberField
            label="Bottom"
            value={style.marginBottom}
            onChange={(marginBottom) => onChange({ marginBottom })}
          />
        </View>
      </FieldCard>

      <FieldCard label="Corner radius">
        <NumberField
          value={style.borderRadius}
          onChange={(borderRadius) => onChange({ borderRadius })}
        />
      </FieldCard>
    </View>
  );
}

const styles = StyleSheet.create({
  tab: {
    gap: Spacing.three,
  },
  pairRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
});
