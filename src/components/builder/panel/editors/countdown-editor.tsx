import { useEffect, useState } from 'react';

import { ColorField } from '@/components/ui/color-field';
import { TextField } from '@/components/ui/text-field';
import { formatDateTime, parseDateTime } from '@/lib/datetime-text';
import type { CountdownWidgetProps } from '@/types/builder';

export type CountdownEditorProps = {
  props: CountdownWidgetProps;
  onChange: (patch: Partial<CountdownWidgetProps>) => void;
};

export function CountdownEditor({ props, onChange }: CountdownEditorProps) {
  const [draft, setDraft] = useState(() => formatDateTime(props.targetAt));

  useEffect(() => {
    setDraft(formatDateTime(props.targetAt));
  }, [props.targetAt]);

  const handleTargetChange = (text: string) => {
    setDraft(text);
    const parsed = parseDateTime(text);
    if (parsed !== null) onChange({ targetAt: parsed });
  };

  return (
    <>
      <TextField
        label="Target date (YYYY-MM-DD HH:mm)"
        value={draft}
        onChangeText={handleTargetChange}
        placeholder="2026-12-31 09:00"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextField
        label="Expired message"
        value={props.expiredLabel}
        onChangeText={(expiredLabel) => onChange({ expiredLabel })}
        placeholder="We're live!"
      />
      <ColorField
        label="Digit color"
        value={props.color}
        onChange={(color) => onChange({ color })}
      />
    </>
  );
}
