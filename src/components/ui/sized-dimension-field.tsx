import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { UnitSelect } from '@/components/ui/unit-select';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { joinDimension, splitDimension, type DimensionValue } from '@/lib/dimension-value';

export type SizedDimensionFieldProps = {
  /** Omit when the enclosing card already names the control. */
  label?: string;
  value: DimensionValue | undefined;
  onChange: (value: DimensionValue | undefined) => void;
};

/** Amount input paired with a unit selector, as in the reference Height control. */
export function SizedDimensionField({ label, value, onChange }: SizedDimensionFieldProps) {
  const theme = useTheme();
  const [parts, setParts] = useState(() => splitDimension(value));

  useEffect(() => {
    setParts(splitDimension(value));
  }, [value]);

  const commit = (next: typeof parts) => {
    setParts(next);
    onChange(joinDimension(next));
  };

  return (
    <View style={styles.field}>
      {label ? <Text style={[styles.label, { color: theme.text }]}>{label}</Text> : null}
      <View style={styles.row}>
        <TextInput
          value={parts.amount}
          onChangeText={(amount) => commit({ ...parts, amount })}
          editable={parts.unit !== 'auto'}
          placeholder={parts.unit === 'auto' ? 'auto' : '0'}
          placeholderTextColor={theme.textSecondary}
          keyboardType="numeric"
          style={[
            styles.input,
            {
              color: theme.text,
              backgroundColor: theme.fieldInput,
              borderColor: theme.fieldCardBorder,
            },
            parts.unit === 'auto' && styles.disabled,
          ]}
        />
        <UnitSelect value={parts.unit} onChange={(unit) => commit({ ...parts, unit })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: Spacing.two,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  input: {
    flex: 1,
    minHeight: 38,
    borderWidth: 1,
    borderRadius: Spacing.one,
    paddingHorizontal: Spacing.two,
    fontSize: 14,
  },
  disabled: {
    opacity: 0.5,
  },
});
