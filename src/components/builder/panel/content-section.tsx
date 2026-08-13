import { PanelSection } from '@/components/builder/panel/panel-section';
import { ButtonEditor } from '@/components/builder/panel/editors/button-editor';
import { CardEditor } from '@/components/builder/panel/editors/card-editor';
import { ContainerEditor } from '@/components/builder/panel/editors/container-editor';
import { CountdownEditor } from '@/components/builder/panel/editors/countdown-editor';
import { EmbedEditor } from '@/components/builder/panel/editors/embed-editor';
import {
  EndDateEditor,
  EndHourEditor,
  RegisterEditor,
  SubmitEntryEditor,
  TimeZoneEditor,
} from '@/components/builder/panel/editors/event-editors';
import { GridEditor } from '@/components/builder/panel/editors/grid-editor';
import { IconEditor } from '@/components/builder/panel/editors/icon-editor';
import { ImageEditor } from '@/components/builder/panel/editors/image-editor';
import { NavbarEditor } from '@/components/builder/panel/editors/navbar-editor';
import { PersonalCardEditor } from '@/components/builder/panel/editors/personal-card-editor';
import { SeparatorEditor } from '@/components/builder/panel/editors/separator-editor';
import { TableEditor } from '@/components/builder/panel/editors/table-editor';
import { TextEditor } from '@/components/builder/panel/editors/text-editor';
import type {
  ButtonWidgetProps,
  CardWidgetProps,
  ContainerWidgetProps,
  CountdownWidgetProps,
  EmbedWidgetProps,
  GridWidgetProps,
  IconWidgetProps,
  EndDateWidgetProps,
  EndHourWidgetProps,
  ImageWidgetProps,
  NavbarWidgetProps,
  PersonalCardWidgetProps,
  RegisterWidgetProps,
  SeparatorWidgetProps,
  SubmitEntryWidgetProps,
  TableWidgetProps,
  TextWidgetProps,
  TimeZoneWidgetProps,
  WidgetBlock,
  WidgetPropsPatch,
} from '@/types/builder';

export type ContentSectionProps = {
  block: WidgetBlock;
  /** Receives a props patch for whichever widget type `block` happens to be. */
  onChange: (patch: WidgetPropsPatch) => void;
};

/** Chooses the content editor matching the selected block's widget type. */
export function WidgetContentEditor({ block, onChange }: ContentSectionProps) {
  switch (block.type) {
    case 'text':
      return <TextEditor props={block.props as TextWidgetProps} onChange={onChange} />;
    case 'image':
      return <ImageEditor props={block.props as ImageWidgetProps} onChange={onChange} />;
    case 'button':
      return <ButtonEditor props={block.props as ButtonWidgetProps} onChange={onChange} />;
    case 'container':
      return <ContainerEditor props={block.props as ContainerWidgetProps} onChange={onChange} />;
    case 'grid':
      return <GridEditor props={block.props as GridWidgetProps} onChange={onChange} />;
    case 'separator':
      return <SeparatorEditor props={block.props as SeparatorWidgetProps} onChange={onChange} />;
    case 'icon':
      return <IconEditor props={block.props as IconWidgetProps} onChange={onChange} />;
    case 'embed':
      return <EmbedEditor props={block.props as EmbedWidgetProps} onChange={onChange} />;
    case 'countdown':
      return <CountdownEditor props={block.props as CountdownWidgetProps} onChange={onChange} />;
    case 'table':
      return <TableEditor props={block.props as TableWidgetProps} onChange={onChange} />;
    case 'navbar':
      return <NavbarEditor props={block.props as NavbarWidgetProps} onChange={onChange} />;
    case 'card':
      return <CardEditor props={block.props as CardWidgetProps} onChange={onChange} />;
    case 'personalCard':
      return (
        <PersonalCardEditor props={block.props as PersonalCardWidgetProps} onChange={onChange} />
      );
    case 'submitEntry':
      return <SubmitEntryEditor props={block.props as SubmitEntryWidgetProps} onChange={onChange} />;
    case 'register':
      return <RegisterEditor props={block.props as RegisterWidgetProps} onChange={onChange} />;
    case 'endDate':
      return <EndDateEditor props={block.props as EndDateWidgetProps} onChange={onChange} />;
    case 'endHour':
      return <EndHourEditor props={block.props as EndHourWidgetProps} onChange={onChange} />;
    case 'timeZone':
      return <TimeZoneEditor props={block.props as TimeZoneWidgetProps} onChange={onChange} />;
    default:
      return null;
  }
}

export function ContentSection({ block, onChange }: ContentSectionProps) {
  return (
    <PanelSection title="Content">
      <WidgetContentEditor block={block} onChange={onChange} />
    </PanelSection>
  );
}
