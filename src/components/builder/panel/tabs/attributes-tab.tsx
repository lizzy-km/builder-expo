import { StyleSheet, View } from 'react-native';

import { FieldCard } from '@/components/ui/field-card';
import { SegmentedField } from '@/components/ui/segmented-field';
import { TextField } from '@/components/ui/text-field';
import { Spacing } from '@/constants/theme';
import type { BlockAttributes } from '@/types/builder';

export type AttributesTabProps = {
  attributes: BlockAttributes | undefined;
  onChange: (patch: Partial<BlockAttributes>) => void;
};

const EMPTY: BlockAttributes = {};

export function AttributesTab({ attributes, onChange }: AttributesTabProps) {
  const current = attributes ?? EMPTY;

  return (
    <View style={styles.tab}>
      <FieldCard label="Identity">
        <TextField
          label="Layer name"
          hint="shown in Layers"
          value={current.name ?? ''}
          onChangeText={(name) => onChange({ name })}
          placeholder="Hero heading"
        />
        <TextField
          label="Element id"
          value={current.domId ?? ''}
          onChangeText={(domId) => onChange({ domId })}
          placeholder="hero-heading"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextField
          label="CSS classes"
          hint="space separated"
          value={current.className ?? ''}
          onChangeText={(className) => onChange({ className })}
          placeholder="hero title"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </FieldCard>

      <FieldCard label="Accessibility & testing">
        <TextField
          label="Accessible label"
          value={current.ariaLabel ?? ''}
          onChangeText={(ariaLabel) => onChange({ ariaLabel })}
          placeholder="Describes this element"
        />
        <TextField
          label="Test id"
          value={current.testId ?? ''}
          onChangeText={(testId) => onChange({ testId })}
          placeholder="hero-heading"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </FieldCard>

      <FieldCard label="Visibility">
        <SegmentedField
          value={current.hidden ? 'hidden' : 'visible'}
          options={[
            { value: 'visible', label: 'Visible' },
            { value: 'hidden', label: 'Hidden' },
          ]}
          onChange={(value) => onChange({ hidden: value === 'hidden' })}
        />
      </FieldCard>
    </View>
  );
}

const styles = StyleSheet.create({
  tab: {
    gap: Spacing.three,
  },
});
