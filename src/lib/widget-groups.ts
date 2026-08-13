/** Palette organisation — which widgets appear under which heading. */

import type { WidgetType } from '@/types/builder';

export type WidgetGroup = {
  title: string;
  types: WidgetType[];
};

export const WIDGET_GROUPS: WidgetGroup[] = [
  { title: 'Layout', types: ['container', 'grid', 'separator'] },
  { title: 'Content', types: ['text', 'image', 'icon', 'button'] },
  { title: 'Blocks', types: ['navbar', 'card', 'personalCard', 'table'] },
  { title: 'Dynamic', types: ['countdown', 'embed'] },
];
