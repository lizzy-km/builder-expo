import { NumberField } from '@/components/ui/number-field';
import { TextField } from '@/components/ui/text-field';
import type { EmbedWidgetProps } from '@/types/builder';

export type EmbedEditorProps = {
  props: EmbedWidgetProps;
  onChange: (patch: Partial<EmbedWidgetProps>) => void;
};

export function EmbedEditor({ props, onChange }: EmbedEditorProps) {
  return (
    <>
      <TextField
        label="Embed URL"
        value={props.url}
        onChangeText={(url) => onChange({ url })}
        placeholder="https://…"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="url"
      />
      <NumberField
        label="Height"
        value={props.height}
        onChange={(height) => onChange({ height: height ?? 220 })}
      />
    </>
  );
}
