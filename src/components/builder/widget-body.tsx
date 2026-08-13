import type { ReactNode } from 'react';

import { ButtonWidget } from '@/components/builder/widgets/button-widget';
import { CardWidget } from '@/components/builder/widgets/card-widget';
import { ContainerWidget } from '@/components/builder/widgets/container-widget';
import { CountdownWidget } from '@/components/builder/widgets/countdown-widget';
import { EmbedWidget } from '@/components/builder/widgets/embed-widget';
import {
  EndDateWidget,
  EndHourWidget,
  RegisterWidget,
  SubmitEntryWidget,
  TimeZoneWidget,
} from '@/components/builder/widgets/event-widgets';
import { GridWidget } from '@/components/builder/widgets/grid-widget';
import { IconWidget } from '@/components/builder/widgets/icon-widget';
import { ImageWidget } from '@/components/builder/widgets/image-widget';
import { NavbarWidget } from '@/components/builder/widgets/navbar-widget';
import { PersonalCardWidget } from '@/components/builder/widgets/personal-card-widget';
import { SeparatorWidget } from '@/components/builder/widgets/separator-widget';
import { TableWidget } from '@/components/builder/widgets/table-widget';
import { TextWidget } from '@/components/builder/widgets/text-widget';
import type {
  ButtonWidgetProps,
  CardWidgetProps,
  ContainerWidgetProps,
  CountdownWidgetProps,
  EmbedWidgetProps,
  EndDateWidgetProps,
  EndHourWidgetProps,
  GridWidgetProps,
  IconWidgetProps,
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
} from '@/types/builder';

export type WidgetBodyProps = {
  block: WidgetBlock;
  /** Rendered children, supplied by the canvas for layout widgets. */
  children?: ReactNode;
};

/** Dispatches a block to its widget component. Layout types receive `children`. */
export function WidgetBody({ block, children }: WidgetBodyProps) {
  switch (block.type) {
    case 'text':
      return <TextWidget {...(block.props as TextWidgetProps)} />;
    case 'image':
      return <ImageWidget {...(block.props as ImageWidgetProps)} />;
    case 'button':
      return <ButtonWidget {...(block.props as ButtonWidgetProps)} />;
    case 'container':
      return (
        <ContainerWidget {...(block.props as ContainerWidgetProps)}>{children}</ContainerWidget>
      );
    case 'grid':
      return <GridWidget {...(block.props as GridWidgetProps)}>{children}</GridWidget>;
    case 'separator':
      return <SeparatorWidget {...(block.props as SeparatorWidgetProps)} />;
    case 'icon':
      return <IconWidget {...(block.props as IconWidgetProps)} />;
    case 'embed':
      return <EmbedWidget {...(block.props as EmbedWidgetProps)} />;
    case 'countdown':
      return <CountdownWidget {...(block.props as CountdownWidgetProps)} />;
    case 'table':
      return <TableWidget {...(block.props as TableWidgetProps)} />;
    case 'navbar':
      return <NavbarWidget {...(block.props as NavbarWidgetProps)} />;
    case 'card':
      return <CardWidget {...(block.props as CardWidgetProps)} />;
    case 'personalCard':
      return <PersonalCardWidget {...(block.props as PersonalCardWidgetProps)} />;
    case 'submitEntry':
      return <SubmitEntryWidget {...(block.props as SubmitEntryWidgetProps)} />;
    case 'register':
      return <RegisterWidget {...(block.props as RegisterWidgetProps)} />;
    case 'endDate':
      return <EndDateWidget {...(block.props as EndDateWidgetProps)} />;
    case 'endHour':
      return <EndHourWidget {...(block.props as EndHourWidgetProps)} />;
    case 'timeZone':
      return <TimeZoneWidget {...(block.props as TimeZoneWidgetProps)} />;
    default:
      return null;
  }
}
