import { ColorField } from '@/components/ui/color-field';
import { LinesField } from '@/components/ui/lines-field';
import { TextField } from '@/components/ui/text-field';
import type { NavbarWidgetProps } from '@/types/builder';

export type NavbarEditorProps = {
  props: NavbarWidgetProps;
  onChange: (patch: Partial<NavbarWidgetProps>) => void;
};

export function NavbarEditor({ props, onChange }: NavbarEditorProps) {
  return (
    <>
      <TextField
        label="Brand"
        value={props.brand}
        onChangeText={(brand) => onChange({ brand })}
        placeholder="Your brand"
      />
      <LinesField
        label="Links (one per line)"
        value={props.links}
        onChange={(links) => onChange({ links })}
        placeholder="Home"
      />
      <ColorField
        label="Background"
        value={props.backgroundColor}
        onChange={(backgroundColor) => onChange({ backgroundColor })}
      />
      <ColorField
        label="Text color"
        value={props.textColor}
        onChange={(textColor) => onChange({ textColor })}
      />
    </>
  );
}
