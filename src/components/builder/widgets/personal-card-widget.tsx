import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { PersonalCardWidgetProps } from '@/types/builder';

/** First letter of each of the first two words, used when no avatar is set. */
function initialsOf(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('');
}

export function PersonalCardWidget({
  name,
  role,
  bio,
  avatarUri,
  backgroundColor,
}: PersonalCardWidgetProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: backgroundColor ?? theme.backgroundElement, borderColor: theme.border },
      ]}
    >
      <View style={styles.header}>
        {avatarUri ? (
          <Image source={{ uri: avatarUri }} style={styles.avatar} contentFit="cover" />
        ) : (
          <View style={[styles.avatar, styles.fallback, { backgroundColor: theme.primary }]}>
            <Text style={[styles.initials, { color: theme.onPrimary }]}>{initialsOf(name)}</Text>
          </View>
        )}

        <View style={styles.identity}>
          <Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>
            {name}
          </Text>
          <Text style={[styles.role, { color: theme.primary }]} numberOfLines={1}>
            {role}
          </Text>
        </View>
      </View>

      <Text style={[styles.bio, { color: theme.textSecondary }]}>{bio}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderWidth: 1,
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontSize: 20,
    fontWeight: '700',
  },
  identity: {
    flex: 1,
    gap: Spacing.half,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
  },
  role: {
    fontSize: 13,
    fontWeight: '600',
  },
  bio: {
    fontSize: 14,
    lineHeight: 20,
  },
});
