import { useEffect, useState } from 'react';

import { TextField } from '@/components/ui/text-field';
import { formatDateTime, parseDateTime } from '@/lib/datetime-text';

export type DateTimeFieldProps = {
  label: string;
  value: number;
  onChange: (epochMs: number) => void;
};

/**
 * Epoch value edited as `YYYY-MM-DD HH:mm`. Keeps a draft string so partially typed
 * dates don't reach the store, and only commits once the text parses.
 */
export function DateTimeField({ label, value, onChange }: DateTimeFieldProps) {
  const [draft, setDraft] = useState(() => formatDateTime(value));

  useEffect(() => {
    setDraft(formatDateTime(value));
  }, [value]);

  const handleChange = (text: string) => {
    setDraft(text);
    const parsed = parseDateTime(text);
    if (parsed !== null) onChange(parsed);
  };

  return (
    <TextField
      label={label}
      hint="YYYY-MM-DD HH:mm"
      value={draft}
      onChangeText={handleChange}
      placeholder="2026-12-31 09:00"
      autoCapitalize="none"
      autoCorrect={false}
    />
  );
}
