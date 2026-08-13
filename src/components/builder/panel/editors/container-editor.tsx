import { NumberField } from '@/components/ui/number-field';
import { SegmentedField } from '@/components/ui/segmented-field';
import type { ContainerWidgetProps } from '@/types/builder';

export type ContainerEditorProps = {
  props: ContainerWidgetProps;
  onChange: (patch: Partial<ContainerWidgetProps>) => void;
};

export function ContainerEditor({ props, onChange }: ContainerEditorProps) {
  return (
    <>
      <SegmentedField
        label="Direction"
        value={props.direction}
        options={[
          { value: 'column', label: 'Column' },
          { value: 'row', label: 'Row' },
        ]}
        onChange={(direction) => onChange({ direction })}
      />
      <SegmentedField
        label="Justify"
        value={props.justify}
        options={[
          { value: 'flex-start', label: 'Start' },
          { value: 'center', label: 'Center' },
          { value: 'flex-end', label: 'End' },
          { value: 'space-between', label: 'Between' },
        ]}
        onChange={(justify) => onChange({ justify })}
      />
      <SegmentedField
        label="Align"
        value={props.align}
        options={[
          { value: 'flex-start', label: 'Start' },
          { value: 'center', label: 'Center' },
          { value: 'flex-end', label: 'End' },
          { value: 'stretch', label: 'Stretch' },
        ]}
        onChange={(align) => onChange({ align })}
      />
      <SegmentedField
        label="Wrap"
        value={props.wrap ? 'wrap' : 'nowrap'}
        options={[
          { value: 'nowrap', label: 'No wrap' },
          { value: 'wrap', label: 'Wrap' },
        ]}
        onChange={(value) => onChange({ wrap: value === 'wrap' })}
      />
      <NumberField label="Gap" value={props.gap} onChange={(gap) => onChange({ gap: gap ?? 0 })} />
    </>
  );
}
