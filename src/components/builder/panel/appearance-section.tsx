import { PanelSection } from '@/components/builder/panel/panel-section';
import { ColorField } from '@/components/ui/color-field';
import { NumberField } from '@/components/ui/number-field';
import type { StyleProps } from '@/types/builder';

export type AppearanceSectionProps = {
  style: StyleProps;
  onChange: (patch: Partial<StyleProps>) => void;
};

export function AppearanceSection({ style, onChange }: AppearanceSectionProps) {
  return (
    <PanelSection title="Appearance">
      <ColorField
        label="Background"
        value={style.backgroundColor}
        onChange={(backgroundColor) => onChange({ backgroundColor })}
      />
      <NumberField
        label="Corner radius"
        value={style.borderRadius}
        onChange={(borderRadius) => onChange({ borderRadius })}
      />
    </PanelSection>
  );
}
