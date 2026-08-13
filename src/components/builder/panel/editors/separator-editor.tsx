import { ColorField } from '@/components/ui/color-field';
import { NumberField } from '@/components/ui/number-field';
import type { SeparatorWidgetProps } from '@/types/builder';

export type SeparatorEditorProps = {
  props: SeparatorWidgetProps;
  onChange: (patch: Partial<SeparatorWidgetProps>) => void;
};

export function SeparatorEditor({ props, onChange }: SeparatorEditorProps) {
  return (
    <>
      <NumberField
        label="Thickness"
        value={props.thickness}
        onChange={(thickness) => onChange({ thickness: thickness ?? 1 })}
      />
      <ColorField label="Color" value={props.color} onChange={(color) => onChange({ color })} />
    </>
  );
}
