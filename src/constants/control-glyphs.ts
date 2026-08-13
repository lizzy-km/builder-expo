/**
 * Glyphs for the editor's icon controls. Unicode box-drawing and geometric characters
 * keep the icon vocabulary dependency-free — the project bundles no icon font, and
 * expo-symbols is iOS/web only.
 */

/** Flex direction / layout type. */
export const LAYOUT_GLYPHS = {
  column: '⬍',
  row: '⬌',
  wrap: '⤸',
} as const;

/** Main-axis distribution. */
export const JUSTIFY_GLYPHS = {
  'flex-start': '⇤',
  center: '⇹',
  'flex-end': '⇥',
  'space-between': '⇿',
} as const;

/** Cross-axis alignment. */
export const ALIGN_GLYPHS = {
  'flex-start': '⤒',
  center: '⤗',
  'flex-end': '⤓',
  stretch: '⇕',
} as const;

/** Text alignment. */
export const TEXT_ALIGN_GLYPHS = {
  left: '⯇',
  center: '≡',
  right: '⯈',
} as const;

/** Palette entries, one per widget type. */
export const WIDGET_GLYPHS = {
  text: 'T',
  image: '🖼',
  button: '⬭',
  container: '▤',
  grid: '▦',
  separator: '―',
  icon: '★',
  embed: '◱',
  countdown: '◷',
  table: '▥',
  navbar: '☰',
  card: '❐',
  personalCard: '☺',
  submitEntry: '➤',
  register: '✎',
  endDate: '📅',
  endHour: '🕐',
  timeZone: '🌐',
} as const;
