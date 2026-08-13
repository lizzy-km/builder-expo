import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { FieldLabel } from '@/components/ui/field-label';
import { COLOR_SWATCHES } from '@/constants/swatches';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ColorFieldProps = {
  /** Omit when the enclosing card already names the control. */
  label?: string;
  value: string | undefined;
  onChange: (value: string | undefined) => void;
};

/** Accepts any CSS color string; blank clears back to the theme default. */
function isCompleteColor(text: string): boolean {
  if (!text.startsWith('#')) return true;
  return text.length === 4 || text.length === 7;
}

export function ColorField({ label, value, onChange }: ColorFieldProps) {
  const theme = useTheme();
  const [draft, setDraft] = useState(value ?? '');

  useEffect(() => {
    setDraft(value ?? '');
  }, [value]);

  const handleChange = (text: string) => {
    setDraft(text);
    if (!text.trim()) {
      onChange(undefined);
      return;
    }
    if (isCompleteColor(text.trim())) onChange(text.trim());
  };

  const selectSwatch = (color: string) => {
    setDraft(color);
    onChange(color);
  };

  return (
    <FieldLabel label={label}>
      <View style={styles.inputRow}>
        <View
          style={[
            styles.preview,
            { backgroundColor: value ?? 'transparent', borderColor: theme.border },
          ]}
        />
        <TextInput
          value={draft}
          onChangeText={handleChange}
          placeholder="default"
          placeholderTextColor={theme.textSecondary}
          autoCapitalize="none"
          autoCorrect={false}
          style={[
            styles.input,
            { color: theme.text, borderColor: theme.border, backgroundColor: theme.background },
          ]}
        />
      </View>

      <View style={styles.swatches}>
        {COLOR_SWATCHES.map((color) => (
          <Pressable
            key={color}
            accessibilityRole="button"
            accessibilityLabel={label ? `Set ${label} to ${color}` : `Use color ${color}`}
            onPress={() => selectSwatch(color)}
            style={[
              styles.swatch,
              { backgroundColor: color },
              { borderColor: value === color ? theme.text : theme.border },
            ]}
          />
        ))}
      </View>
    </FieldLabel>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  preview: {
    width: 40,
    height: 40,
    borderRadius: Spacing.two,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    fontSize: 14,
    minHeight: 40,
  },
  swatches: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  swatch: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
  },
});
