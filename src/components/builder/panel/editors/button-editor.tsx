import { ColorField } from '@/components/ui/color-field';
import { TextField } from '@/components/ui/text-field';
import type { ButtonWidgetProps } from '@/types/builder';

export type ButtonEditorProps = {
  props: ButtonWidgetProps;
  onChange: (patch: Partial<ButtonWidgetProps>) => void;
};

export function ButtonEditor({ props, onChange }: ButtonEditorProps) {
  return (
    <>
      <TextField
        label="Label"
        value={props.label}
        onChangeText={(label) => onChange({ label })}
        placeholder="Get started"
      />
      <TextField
        label="Link"
        value={props.href ?? ''}
        onChangeText={(href) => onChange({ href })}
        placeholder="https://…"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="url"
      />
      <ColorField
        label="Button color"
        value={props.backgroundColor}
        onChange={(backgroundColor) => onChange({ backgroundColor })}
      />
      <ColorField
        label="Label color"
        value={props.textColor}
        onChange={(textColor) => onChange({ textColor })}
      />
    </>
  );
}
