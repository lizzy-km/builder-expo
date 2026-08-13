import { StyleSheet, Text } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import type { IconWidgetProps } from '@/types/builder';

/** Renders an emoji or glyph so no icon font needs bundling. */
export function IconWidget({ glyph, size, color, align }: IconWidgetProps) {
  const theme = useTheme();

  return (
    <Text
      style={[
        styles.glyph,
        { fontSize: size, lineHeight: size * 1.2, color: color ?? theme.text, textAlign: align },
      ]}
    >
      {glyph}
    </Text>
  );
}

const styles = StyleSheet.create({
  glyph: {
    width: '100%',
  },
});
