import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { CardWidgetProps } from '@/types/builder';

export function CardWidget({ title, body, imageUri, backgroundColor }: CardWidgetProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: backgroundColor ?? theme.backgroundElement, borderColor: theme.border },
      ]}
    >
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} contentFit="cover" transition={150} />
      ) : null}
      <View style={styles.body}>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        <Text style={[styles.text, { color: theme.textSecondary }]}>{body}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderWidth: 1,
    borderRadius: Spacing.three,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 140,
  },
  body: {
    padding: Spacing.three,
    gap: Spacing.one,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
  },
});
