import { ColorField } from '@/components/ui/color-field';
import { SegmentedField } from '@/components/ui/segmented-field';
import { TextField } from '@/components/ui/text-field';
import type { TextWidgetProps } from '@/types/builder';

export type TextEditorProps = {
  props: TextWidgetProps;
  onChange: (patch: Partial<TextWidgetProps>) => void;
};

export function TextEditor({ props, onChange }: TextEditorProps) {
  return (
    <>
      <TextField
        label="Content"
        value={props.content}
        onChangeText={(content) => onChange({ content })}
        placeholder="Enter text"
        multiline
      />
      <SegmentedField
        label="Variant"
        value={props.variant}
        options={[
          { value: 'heading', label: 'Heading' },
          { value: 'subheading', label: 'Sub' },
          { value: 'paragraph', label: 'Body' },
        ]}
        onChange={(variant) => onChange({ variant })}
      />
      <SegmentedField
        label="Align"
        value={props.align ?? 'left'}
        options={[
          { value: 'left', label: 'Left' },
          { value: 'center', label: 'Center' },
          { value: 'right', label: 'Right' },
        ]}
        onChange={(align) => onChange({ align })}
      />
      <ColorField label="Text color" value={props.color} onChange={(color) => onChange({ color })} />
    </>
  );
}
