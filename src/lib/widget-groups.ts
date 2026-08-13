/** Palette organisation — which widgets appear under which heading. */

import type { WidgetType } from '@/types/builder';

export type WidgetGroup = {
  title: string;
  types: WidgetType[];
};

/** Always-visible groups, in palette order. */
export const WIDGET_GROUPS: WidgetGroup[] = [
  { title: 'Containers', types: ['container', 'grid'] },
  { title: 'Contents', types: ['text', 'image', 'button', 'table'] },
  {
    title: 'Event Widgets',
    types: ['submitEntry', 'register', 'endDate', 'endHour', 'timeZone'],
  },
];

/** Collapsed by default — less-used widgets, kept out of the initial scan. */
export const ADVANCED_WIDGET_GROUPS: WidgetGroup[] = [
  { title: 'Layout', types: ['separator'] },
  { title: 'Countdown', types: ['countdown'] },
  { title: 'Embeds', types: ['embed'] },
  { title: 'Image widgets', types: ['icon', 'card', 'personalCard', 'navbar'] },
];
