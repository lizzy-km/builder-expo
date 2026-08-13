/** Per-widget content props. Style/sizing lives separately in `StyleProps`. */

export type TextWidgetProps = {
  content: string;
  variant: 'heading' | 'subheading' | 'paragraph';
  color?: string;
  align?: 'left' | 'center' | 'right';
};

export type ImageWidgetProps = {
  uri: string;
  /** Mirrors expo-image's `contentFit` values. */
  resizeMode: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
};

export type ButtonWidgetProps = {
  label: string;
  href?: string;
  backgroundColor?: string;
  textColor?: string;
};

/** Flex container: lays children out in a row or column. */
export type ContainerWidgetProps = {
  direction: 'column' | 'row';
  gap: number;
  justify: 'flex-start' | 'center' | 'flex-end' | 'space-between';
  align: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  wrap: boolean;
};

/** Grid container: children flow into a fixed number of equal-width columns. */
export type GridWidgetProps = {
  columns: number;
  gap: number;
};

export type SeparatorWidgetProps = {
  thickness: number;
  color?: string;
};

export type IconWidgetProps = {
  /** Emoji or short glyph — avoids bundling an icon font. */
  glyph: string;
  size: number;
  color?: string;
  align: 'left' | 'center' | 'right';
};

export type EmbedWidgetProps = {
  url: string;
  height: number;
};

export type CountdownWidgetProps = {
  /** Target instant as an epoch milliseconds value. */
  targetAt: number;
  expiredLabel: string;
  color?: string;
};

export type TableWidgetProps = {
  headers: string[];
  rows: string[][];
  showHeader: boolean;
};

export type NavbarWidgetProps = {
  brand: string;
  links: string[];
  backgroundColor?: string;
  textColor?: string;
};

export type CardWidgetProps = {
  title: string;
  body: string;
  imageUri?: string;
  backgroundColor?: string;
};

export type PersonalCardWidgetProps = {
  name: string;
  role: string;
  bio: string;
  avatarUri?: string;
  backgroundColor?: string;
};
