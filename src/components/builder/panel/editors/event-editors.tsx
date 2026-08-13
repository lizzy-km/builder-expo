/** Content editors for the five event widgets. */

import { ColorField } from '@/components/ui/color-field';
import { DateTimeField } from '@/components/ui/datetime-field';
import { SegmentedField } from '@/components/ui/segmented-field';
import { TextField } from '@/components/ui/text-field';
import type {
  EndDateWidgetProps,
  EndHourWidgetProps,
  RegisterWidgetProps,
  SubmitEntryWidgetProps,
  TimeZoneWidgetProps,
} from '@/types/builder';

type Editor<T> = {
  props: T;
  onChange: (patch: Partial<T>) => void;
};

export function SubmitEntryEditor({ props, onChange }: Editor<SubmitEntryWidgetProps>) {
  return (
    <>
      <TextField
        label="Button label"
        value={props.label}
        onChangeText={(label) => onChange({ label })}
        placeholder="Submit entry"
      />
      <TextField
        label="Success message"
        value={props.successMessage}
        onChangeText={(successMessage) => onChange({ successMessage })}
        placeholder="Thanks — your entry is in!"
        multiline
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

export function RegisterEditor({ props, onChange }: Editor<RegisterWidgetProps>) {
  return (
    <>
      <TextField
        label="Button label"
        value={props.label}
        onChangeText={(label) => onChange({ label })}
        placeholder="Register now"
      />
      <TextField
        label="Registration link"
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

export function EndDateEditor({ props, onChange }: Editor<EndDateWidgetProps>) {
  return (
    <>
      <TextField
        label="Caption"
        value={props.caption}
        onChangeText={(caption) => onChange({ caption })}
        placeholder="Entries close"
      />
      <DateTimeField label="Ends at" value={props.endsAt} onChange={(endsAt) => onChange({ endsAt })} />
      <SegmentedField
        label="Date format"
        value={props.dateStyle}
        options={[
          { value: 'short', label: 'Short' },
          { value: 'medium', label: 'Medium' },
          { value: 'long', label: 'Long' },
        ]}
        onChange={(dateStyle) => onChange({ dateStyle })}
      />
    </>
  );
}

export function EndHourEditor({ props, onChange }: Editor<EndHourWidgetProps>) {
  return (
    <>
      <TextField
        label="Caption"
        value={props.caption}
        onChangeText={(caption) => onChange({ caption })}
        placeholder="Closing time"
      />
      <DateTimeField label="Ends at" value={props.endsAt} onChange={(endsAt) => onChange({ endsAt })} />
      <SegmentedField
        label="Clock"
        value={props.use24Hour ? '24' : '12'}
        options={[
          { value: '12', label: '12-hour' },
          { value: '24', label: '24-hour' },
        ]}
        onChange={(value) => onChange({ use24Hour: value === '24' })}
      />
    </>
  );
}

export function TimeZoneEditor({ props, onChange }: Editor<TimeZoneWidgetProps>) {
  return (
    <>
      <TextField
        label="Caption"
        value={props.caption}
        onChangeText={(caption) => onChange({ caption })}
        placeholder="Times shown in"
      />
      <TextField
        label="Time zone"
        hint="blank = viewer's zone"
        value={props.timeZone}
        onChangeText={(timeZone) => onChange({ timeZone })}
        placeholder="Asia/Colombo"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <SegmentedField
        label="GMT offset"
        value={props.showOffset ? 'show' : 'hide'}
        options={[
          { value: 'show', label: 'Show' },
          { value: 'hide', label: 'Hide' },
        ]}
        onChange={(value) => onChange({ showOffset: value === 'show' })}
      />
    </>
  );
}
