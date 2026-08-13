import { ColorField } from '@/components/ui/color-field';
import { TextField } from '@/components/ui/text-field';
import type { PersonalCardWidgetProps } from '@/types/builder';

export type PersonalCardEditorProps = {
  props: PersonalCardWidgetProps;
  onChange: (patch: Partial<PersonalCardWidgetProps>) => void;
};

export function PersonalCardEditor({ props, onChange }: PersonalCardEditorProps) {
  return (
    <>
      <TextField
        label="Name"
        value={props.name}
        onChangeText={(name) => onChange({ name })}
        placeholder="Full name"
      />
      <TextField
        label="Role"
        value={props.role}
        onChangeText={(role) => onChange({ role })}
        placeholder="Founder"
      />
      <TextField
        label="Bio"
        value={props.bio}
        onChangeText={(bio) => onChange({ bio })}
        placeholder="Short bio"
        multiline
      />
      <TextField
        label="Avatar URL"
        value={props.avatarUri ?? ''}
        onChangeText={(avatarUri) => onChange({ avatarUri })}
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
