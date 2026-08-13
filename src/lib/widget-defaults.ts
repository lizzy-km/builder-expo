/**
 * Factory for fresh widget blocks. Each widget type's default props live here so the
 * palette, store, and canvas all agree on what a "new" widget looks like.
 */

import { nanoid } from 'nanoid/non-secure';

import type { StyleProps, WidgetBlock, WidgetPropsByType, WidgetType } from '@/types/builder';

const DEFAULT_STYLE: StyleProps = {
  paddingHorizontal: 16,
  paddingVertical: 12,
  marginBottom: 8,
};

/** One week out, so a fresh countdown always shows a running clock. */
const DEFAULT_COUNTDOWN_OFFSET_MS = 7 * 24 * 60 * 60 * 1000;

const DEFAULT_PROPS: { [K in WidgetType]: () => WidgetPropsByType[K] } = {
  text: () => ({ content: 'Your headline here', variant: 'heading', align: 'left' }),
  image: () => ({ uri: '', resizeMode: 'cover' }),
  button: () => ({ label: 'Get started', href: '' }),
  container: () => ({
    direction: 'column',
    gap: 8,
    justify: 'flex-start',
    align: 'stretch',
    wrap: false,
  }),
  grid: () => ({ columns: 2, gap: 8 }),
  separator: () => ({ thickness: 1 }),
  icon: () => ({ glyph: '★', size: 32, align: 'left' }),
  embed: () => ({ url: '', height: 220 }),
  countdown: () => ({
    targetAt: Date.now() + DEFAULT_COUNTDOWN_OFFSET_MS,
    expiredLabel: "We're live!",
  }),
  table: () => ({
    headers: ['Plan', 'Price'],
    rows: [
      ['Starter', '$0'],
      ['Pro', '$29'],
    ],
    showHeader: true,
  }),
  navbar: () => ({ brand: 'Your brand', links: ['Home', 'Pricing', 'Contact'] }),
  card: () => ({ title: 'Card title', body: 'Supporting copy goes here.' }),
  personalCard: () => ({
    name: 'Ada Lovelace',
    role: 'Founder',
    bio: 'Short bio goes here.',
  }),
};

/** Human-facing labels for the palette. */
export const WIDGET_LABELS: Record<WidgetType, string> = {
  text: 'Text',
  image: 'Image',
  button: 'Button',
  container: 'Flex',
  grid: 'Grid',
  separator: 'Divider',
  icon: 'Icon',
  embed: 'Embed',
  countdown: 'Countdown',
  table: 'Table',
  navbar: 'Navbar',
  card: 'Card',
  personalCard: 'Profile',
};

export const WIDGET_TYPES = Object.keys(WIDGET_LABELS) as WidgetType[];

export function createWidgetBlock(
  type: WidgetType,
  order: number,
  parentId: string | null = null,
): WidgetBlock {
  return {
    id: nanoid(10),
    type,
    order,
    props: DEFAULT_PROPS[type](),
    style: { ...DEFAULT_STYLE },
    parentId,
  };
}
