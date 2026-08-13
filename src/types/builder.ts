import type { AnimationProps } from '@/types/animation';
import type {
  ButtonWidgetProps,
  CardWidgetProps,
  ContainerWidgetProps,
  CountdownWidgetProps,
  EmbedWidgetProps,
  GridWidgetProps,
  IconWidgetProps,
  ImageWidgetProps,
  NavbarWidgetProps,
  PersonalCardWidgetProps,
  SeparatorWidgetProps,
  TableWidgetProps,
  TextWidgetProps,
} from '@/types/widget-props';

export type * from '@/types/widget-props';
export type * from '@/types/animation';

/** Every widget kind the builder can place on a page. */
export type WidgetType =
  | 'text'
  | 'image'
  | 'button'
  | 'container'
  | 'grid'
  | 'separator'
  | 'icon'
  | 'embed'
  | 'countdown'
  | 'table'
  | 'navbar'
  | 'card'
  | 'personalCard';

/** Widget types that accept nested children. */
export const LAYOUT_WIDGET_TYPES = ['container', 'grid'] as const;

export type LayoutWidgetType = (typeof LAYOUT_WIDGET_TYPES)[number];

/** A dimension: raw pixels or a percentage string. */
export type Dimension = number | `${number}%`;

/** CSS-like sizing controls, shared by every widget's style panel. */
export type SizeProps = {
  width?: Dimension;
  minWidth?: Dimension;
  height?: Dimension;
  minHeight?: Dimension;
  maxWidth?: Dimension;
  maxHeight?: Dimension;
};

/** Per-widget spacing + appearance controls, shared across widget types. */
export type StyleProps = SizeProps & {
  backgroundColor?: string;
  paddingHorizontal?: number;
  paddingVertical?: number;
  marginTop?: number;
  marginBottom?: number;
  borderRadius?: number;
};

export type WidgetPropsByType = {
  text: TextWidgetProps;
  image: ImageWidgetProps;
  button: ButtonWidgetProps;
  container: ContainerWidgetProps;
  grid: GridWidgetProps;
  separator: SeparatorWidgetProps;
  icon: IconWidgetProps;
  embed: EmbedWidgetProps;
  countdown: CountdownWidgetProps;
  table: TableWidgetProps;
  navbar: NavbarWidgetProps;
  card: CardWidgetProps;
  personalCard: PersonalCardWidgetProps;
};

/** A props patch for one single widget type — never a mix of fields across types. */
export type WidgetPropsPatch = {
  [K in WidgetType]: Partial<WidgetPropsByType[K]>;
}[WidgetType];

/** One block on the canvas: a widget instance with its own props, style, and order. */
export type WidgetBlock<T extends WidgetType = WidgetType> = {
  id: string;
  type: T;
  /** Position within its sibling group, not within the whole page. */
  order: number;
  props: WidgetPropsByType[T];
  style: StyleProps;
  parentId: string | null;
  /** Absent on blocks saved before animations existed. */
  animation?: AnimationProps;
};

/** A landing page document as stored in Firestore. */
export type LandingPage = {
  id: string;
  title: string;
  blocks: WidgetBlock[];
  /** uid of the signed-in user who owns this page; enforced by security rules. */
  ownerId: string;
  /** When true, anyone with the link may read this page. Rules enforce this. */
  published: boolean;
  createdAt: number;
  updatedAt: number;
};

/** Payload for creating a new landing page (server assigns id/timestamps). */
export type CreateLandingPageInput = {
  title: string;
  ownerId: string;
};
