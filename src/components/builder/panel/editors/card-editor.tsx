import { ColorField } from '@/components/ui/color-field';
import { TextField } from '@/components/ui/text-field';
import type { CardWidgetProps } from '@/types/builder';

export type CardEditorProps = {
  props: CardWidgetProps;
  onChange: (patch: Partial<CardWidgetProps>) => void;
};

export function CardEditor({ props, onChange }: CardEditorProps) {
  return (
    <>
      <TextField
        label="Title"
        value={props.title}
        onChangeText={(title) => onChange({ title })}
        placeholder="Card title"
      />
      <TextField
        label="Body"
        value={props.body}
        onChangeText={(body) => onChange({ body })}
        placeholder="Supporting copy"
        multiline
      />
      <TextField
        label="Image URL"
        value={props.imageUri ?? ''}
        onChangeText={(imageUri) => onChange({ imageUri })}
        placeholder="https://…"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="url"
      />
      <ColorField
        label="Background"
        value={props.backgroundColor}
        onChange={(backgroundColor) => onChange({ backgroundColor })}
      />
    </>
  );
}
