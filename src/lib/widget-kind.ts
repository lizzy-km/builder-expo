/** Classification helpers for widget types. */

import { LAYOUT_WIDGET_TYPES, type LayoutWidgetType, type WidgetType } from '@/types/builder';

/** True when a widget accepts nested children. */
export function isLayoutType(type: WidgetType): type is LayoutWidgetType {
  return (LAYOUT_WIDGET_TYPES as readonly WidgetType[]).includes(type);
}
