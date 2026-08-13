import { useState } from 'react';
import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

import { FieldLabel } from '@/components/ui/field-label';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type TextFieldProps = Omit<TextInputProps, 'style'> & {
  label?: string;
  hint?: string;
};

export function TextField({ label, hint, multiline, onFocus, onBlur, ...rest }: TextFieldProps) {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <FieldLabel label={label} hint={hint}>
      <TextInput
        placeholderTextColor={theme.textSecondary}
        multiline={multiline}
        onFocus={(event) => {
          setIsFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        style={[
          styles.input,
          multiline && styles.multiline,
          {
            color: theme.text,
            backgroundColor: theme.background,
            borderColor: isFocused ? theme.primary : theme.border,
          },
        ]}
        {...rest}
      />
    </FieldLabel>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    fontSize: 14,
    /** Keeps single-line inputs a consistent, comfortable tap height. */
    minHeight: 40,
  },
  multiline: {
    minHeight: 76,
    paddingTop: Spacing.two,
    textAlignVertical: 'top',
  },
});
