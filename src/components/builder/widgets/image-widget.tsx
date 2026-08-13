import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { ImageWidgetProps } from '@/types/builder';

export function ImageWidget({ uri, resizeMode }: ImageWidgetProps) {
  const theme = useTheme();

  if (!uri) {
    return (
      <View style={[styles.placeholder, { borderColor: theme.border }]}>
        <Text style={[styles.placeholderText, { color: theme.textSecondary }]}>
          Tap to set an image URL
        </Text>
      </View>
    );
  }

  return <Image source={{ uri }} style={styles.image} contentFit={resizeMode} transition={150} />;
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 180,
    borderRadius: Spacing.two,
  },
  placeholder: {
    width: '100%',
    height: 120,
    borderRadius: Spacing.two,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 14,
  },
});
