import { NumberField } from '@/components/ui/number-field';
import { SegmentedField } from '@/components/ui/segmented-field';
import type { GridWidgetProps } from '@/types/builder';

export type GridEditorProps = {
  props: GridWidgetProps;
  onChange: (patch: Partial<GridWidgetProps>) => void;
};

const COLUMN_CHOICES = ['1', '2', '3', '4'] as const;

export function GridEditor({ props, onChange }: GridEditorProps) {
  return (
    <>
      <SegmentedField
        label="Columns"
        value={String(props.columns) as (typeof COLUMN_CHOICES)[number]}
        options={COLUMN_CHOICES.map((value) => ({ value, label: value }))}
        onChange={(value) => onChange({ columns: Number(value) })}
      />
      <NumberField label="Gap" value={props.gap} onChange={(gap) => onChange({ gap: gap ?? 0 })} />
    </>
  );
}
