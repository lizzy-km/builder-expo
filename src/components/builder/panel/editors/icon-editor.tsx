import { ColorField } from '@/components/ui/color-field';
import { NumberField } from '@/components/ui/number-field';
import { SegmentedField } from '@/components/ui/segmented-field';
import { TextField } from '@/components/ui/text-field';
import type { IconWidgetProps } from '@/types/builder';

export type IconEditorProps = {
  props: IconWidgetProps;
  onChange: (patch: Partial<IconWidgetProps>) => void;
};

export function IconEditor({ props, onChange }: IconEditorProps) {
  return (
    <>
      <TextField
        label="Glyph or emoji"
        value={props.glyph}
        onChangeText={(glyph) => onChange({ glyph })}
        placeholder="★"
      />
      <NumberField
        label="Size"
        value={props.size}
        onChange={(size) => onChange({ size: size ?? 24 })}
      />
      <SegmentedField
        label="Align"
        value={props.align}
        options={[
          { value: 'left', label: 'Left' },
          { value: 'center', label: 'Center' },
          { value: 'right', label: 'Right' },
        ]}
        onChange={(align) => onChange({ align })}
      />
      <ColorField label="Color" value={props.color} onChange={(color) => onChange({ color })} />
    </>
  );
}
