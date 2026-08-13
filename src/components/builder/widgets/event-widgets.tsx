/**
 * The five event widgets. Each is a thin mapping from stored props to the shared
 * `ActionButtonWidget` / `EventFactWidget` presentations.
 */

import { ActionButtonWidget } from '@/components/builder/widgets/action-button-widget';
import { EventFactWidget } from '@/components/builder/widgets/event-fact-widget';
import {
  formatEventDate,
  formatEventTime,
  resolvedTimeZone,
  timeZoneOffsetLabel,
} from '@/lib/event-format';
import type {
  EndDateWidgetProps,
  EndHourWidgetProps,
  RegisterWidgetProps,
  SubmitEntryWidgetProps,
  TimeZoneWidgetProps,
} from '@/types/builder';

export function SubmitEntryWidget({
  label,
  successMessage,
  backgroundColor,
  textColor,
}: SubmitEntryWidgetProps) {
  return (
    <ActionButtonWidget
      label={label}
      backgroundColor={backgroundColor}
      textColor={textColor}
      note={successMessage ? `On success: ${successMessage}` : undefined}
    />
  );
}

export function RegisterWidget({
  label,
  href,
  backgroundColor,
  textColor,
}: RegisterWidgetProps) {
  return (
    <ActionButtonWidget
      label={label}
      backgroundColor={backgroundColor}
      textColor={textColor}
      note={href ? `Opens ${href}` : undefined}
    />
  );
}

export function EndDateWidget({ endsAt, caption, dateStyle }: EndDateWidgetProps) {
  return <EventFactWidget caption={caption} value={formatEventDate(endsAt, dateStyle)} />;
}

export function EndHourWidget({ endsAt, caption, use24Hour }: EndHourWidgetProps) {
  return <EventFactWidget caption={caption} value={formatEventTime(endsAt, use24Hour)} />;
}

export function TimeZoneWidget({ timeZone, caption, showOffset }: TimeZoneWidgetProps) {
  const zone = resolvedTimeZone(timeZone);
  const offset = showOffset ? timeZoneOffsetLabel(zone) : '';

  return <EventFactWidget caption={caption} value={zone} detail={offset || undefined} />;
}
