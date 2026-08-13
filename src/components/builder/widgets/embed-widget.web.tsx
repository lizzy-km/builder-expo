import { StyleSheet, Text, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { EmbedWidgetProps } from '@/types/builder';

/** Web build renders a sandboxed iframe; `.tsx` sibling handles native. */
export function EmbedWidget({ url, height }: EmbedWidgetProps) {
  const theme = useTheme();

  if (!url) {
    return (
      <View style={[styles.frame, { height, borderColor: theme.border }]}>
        <Text style={[styles.label, { color: theme.textSecondary }]}>Set an embed URL</Text>
      </View>
    );
  }

  return (
    <iframe
      src={url}
      title="Embedded content"
      sandbox="allow-scripts allow-same-origin allow-popups"
      referrerPolicy="no-referrer"
      style={{
        width: '100%',
        height,
        border: `1px solid ${theme.border}`,
        borderRadius: Spacing.two,
      }}
    />
  );
}

const styles = StyleSheet.create({
  frame: {
    width: '100%',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 13,
  },
});
