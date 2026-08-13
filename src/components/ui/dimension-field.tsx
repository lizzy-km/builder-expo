import { useEffect, useState } from 'react';

import { TextField } from '@/components/ui/text-field';
import {
  formatDimension,
  parseDimension,
  type DimensionValue,
} from '@/lib/dimension-value';

export type DimensionFieldProps = {
  label: string;
  value: DimensionValue | undefined;
  onChange: (value: DimensionValue | undefined) => void;
  placeholder?: string;
};

/**
 * Accepts pixels (`120`) or percentages (`50%`). Keeps its own draft text so partially
 * typed values don't reach the store, and re-syncs when the selected widget changes.
 */
export function DimensionField({ label, value, onChange, placeholder = 'auto' }: DimensionFieldProps) {
  const [draft, setDraft] = useState(() => formatDimension(value));

  useEffect(() => {
    setDraft(formatDimension(value));
  }, [value]);

  const handleChange = (text: string) => {
    setDraft(text);
    const parsed = parseDimension(text);
    if (parsed !== null) onChange(parsed);
  };

  return (
    <TextField
      label={label}
      value={draft}
      onChangeText={handleChange}
      placeholder={placeholder}
      keyboardType="default"
      autoCapitalize="none"
      autoCorrect={false}
    />
  );
}
