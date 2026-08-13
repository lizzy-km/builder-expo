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

/* ---------- Event widgets ---------- */

/** Submits the visitor's entry to the event this page advertises. */
export type SubmitEntryWidgetProps = {
  label: string;
  successMessage: string;
  backgroundColor?: string;
  textColor?: string;
};

/** Opens registration for the event. */
export type RegisterWidgetProps = {
  label: string;
  href?: string;
  backgroundColor?: string;
  textColor?: string;
};

/** Displays the event's closing date. */
export type EndDateWidgetProps = {
  /** Epoch milliseconds for the event's end. */
  endsAt: number;
  caption: string;
  /** Intl date style used to render `endsAt`. */
  dateStyle: 'short' | 'medium' | 'long';
};

/** Displays the event's closing time of day. */
export type EndHourWidgetProps = {
  endsAt: number;
  caption: string;
  use24Hour: boolean;
};

/** Names the timezone the event's times are quoted in. */
export type TimeZoneWidgetProps = {
  /** IANA name, e.g. `Asia/Colombo`. Blank uses the viewer's own zone. */
  timeZone: string;
  caption: string;
  showOffset: boolean;
};
