import { SegmentedField } from '@/components/ui/segmented-field';
import { TextField } from '@/components/ui/text-field';
import type { ImageWidgetProps } from '@/types/builder';

export type ImageEditorProps = {
  props: ImageWidgetProps;
  onChange: (patch: Partial<ImageWidgetProps>) => void;
};

export function ImageEditor({ props, onChange }: ImageEditorProps) {
  return (
    <>
      <TextField
        label="Image URL"
        value={props.uri}
        onChangeText={(uri) => onChange({ uri })}
        placeholder="https://…"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="url"
      />
      <SegmentedField
        label="Fit"
        value={props.resizeMode}
        options={[
          { value: 'cover', label: 'Cover' },
          { value: 'contain', label: 'Contain' },
          { value: 'fill', label: 'Fill' },
        ]}
        onChange={(resizeMode) => onChange({ resizeMode })}
      />
    </>
  );
}
