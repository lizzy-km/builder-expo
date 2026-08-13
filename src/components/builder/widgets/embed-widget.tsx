import { StyleSheet, Text, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { EmbedWidgetProps } from '@/types/builder';

/**
 * Native placeholder. Rendering arbitrary third-party HTML needs a WebView, which this
 * project doesn't depend on; the web build (`.web.tsx`) renders a real iframe.
 */
export function EmbedWidget({ url, height }: EmbedWidgetProps) {
  const theme = useTheme();

  return (
    <View
      style={[styles.frame, { height, borderColor: theme.border, backgroundColor: theme.backgroundElement }]}
    >
      <Text style={[styles.label, { color: theme.textSecondary }]} numberOfLines={2}>
        {url ? `Embed preview (web only)\n${url}` : 'Set an embed URL'}
      </Text>
    </View>
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
    padding: Spacing.three,
  },
  label: {
    fontSize: 13,
    textAlign: 'center',
  },
});
