import { TextField } from '@/components/ui/text-field';

export type LinesFieldProps = {
  label: string;
  /** One entry per line in the textarea. */
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
};

/** Edits a string array as newline-separated text — simple and predictable on mobile. */
export function LinesField({ label, value, onChange, placeholder }: LinesFieldProps) {
  return (
    <TextField
      label={label}
      value={value.join('\n')}
      onChangeText={(text) => onChange(text.split('\n'))}
      placeholder={placeholder}
      multiline
      autoCapitalize="none"
    />
  );
}
