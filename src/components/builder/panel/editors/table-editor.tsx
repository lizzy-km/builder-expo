import { LinesField } from '@/components/ui/lines-field';
import { SegmentedField } from '@/components/ui/segmented-field';
import { TextField } from '@/components/ui/text-field';
import type { TableWidgetProps } from '@/types/builder';

export type TableEditorProps = {
  props: TableWidgetProps;
  onChange: (patch: Partial<TableWidgetProps>) => void;
};

/** Rows are edited as one line per row, cells separated by `|`. */
function rowsToText(rows: string[][]): string {
  return rows.map((row) => row.join(' | ')).join('\n');
}

function textToRows(text: string): string[][] {
  return text.split('\n').map((line) => line.split('|').map((cell) => cell.trim()));
}

export function TableEditor({ props, onChange }: TableEditorProps) {
  return (
    <>
      <SegmentedField
        label="Header row"
        value={props.showHeader ? 'show' : 'hide'}
        options={[
          { value: 'show', label: 'Show' },
          { value: 'hide', label: 'Hide' },
        ]}
        onChange={(value) => onChange({ showHeader: value === 'show' })}
      />
      <LinesField
        label="Headers (one per line)"
        value={props.headers}
        onChange={(headers) => onChange({ headers })}
        placeholder="Plan"
      />
      <TextField
        label="Rows (one per line, cells split by |)"
        value={rowsToText(props.rows)}
        onChangeText={(text) => onChange({ rows: textToRows(text) })}
        placeholder="Starter | $0"
        multiline
      />
    </>
  );
}
