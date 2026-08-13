import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

import { FieldLabel } from '@/components/ui/field-label';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type TextFieldProps = Omit<TextInputProps, 'style'> & {
  label: string;
};

export function TextField({ label, ...rest }: TextFieldProps) {
  const theme = useTheme();

  return (
    <FieldLabel label={label}>
      <TextInput
        placeholderTextColor={theme.textSecondary}
        style={[styles.input, { color: theme.text, borderColor: theme.border }]}
        {...rest}
      />
    </FieldLabel>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.two,
    fontSize: 14,
  },
});
