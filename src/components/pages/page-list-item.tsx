import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/ui/app-button';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { LandingPage } from '@/types/builder';

export type PageListItemProps = {
  page: LandingPage;
  onOpen: () => void;
  onDelete: () => void;
};

function formatUpdatedAt(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function PageListItem({ page, onOpen, onDelete }: PageListItemProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onOpen}
      style={({ pressed }) => [
        styles.row,
        { backgroundColor: theme.backgroundElement, borderColor: theme.border },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.info}>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
          {page.title}
        </Text>
        <Text style={[styles.meta, { color: theme.textSecondary }]}>
          {page.blocks.length} {page.blocks.length === 1 ? 'widget' : 'widgets'} ·{' '}
          {formatUpdatedAt(page.updatedAt)}
        </Text>
      </View>
      <AppButton label="Delete" variant="danger" size="small" onPress={onDelete} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Spacing.two,
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.7,
  },
  info: {
    flex: 1,
    gap: Spacing.one,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  meta: {
    fontSize: 13,
  },
});
