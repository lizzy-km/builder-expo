import { useEffect, useState } from 'react';

import { TextField } from '@/components/ui/text-field';
import { parseNumber } from '@/lib/dimension-value';

export type NumberFieldProps = {
  label: string;
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  placeholder?: string;
};

/** Plain numeric input for spacing, radius, and gap values. */
export function NumberField({ label, value, onChange, placeholder = '0' }: NumberFieldProps) {
  const [draft, setDraft] = useState(() => (value === undefined ? '' : String(value)));

  useEffect(() => {
    setDraft(value === undefined ? '' : String(value));
  }, [value]);

  const handleChange = (text: string) => {
    setDraft(text);
    const parsed = parseNumber(text);
    if (parsed !== null) onChange(parsed);
  };

  return (
    <TextField
      label={label}
      value={draft}
      onChangeText={handleChange}
      placeholder={placeholder}
      keyboardType="numeric"
    />
  );
}
