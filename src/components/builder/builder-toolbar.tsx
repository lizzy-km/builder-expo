import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/ui/app-button';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type BuilderToolbarProps = {
  title: string;
  isDirty: boolean;
  isSaving: boolean;
  canDelete: boolean;
  isPublished: boolean;
  onSave: () => void;
  onDeleteSelected: () => void;
  onReplayAnimations: () => void;
  onTogglePublished: () => void;
};

export function BuilderToolbar({
  title,
  isDirty,
  isSaving,
  canDelete,
  isPublished,
  onSave,
  onDeleteSelected,
  onReplayAnimations,
  onTogglePublished,
}: BuilderToolbarProps) {
  const theme = useTheme();

  return (
    <View style={[styles.bar, { borderBottomColor: theme.border }]}>
      <View style={styles.titleGroup}>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
          {title}
        </Text>
        <Text style={[styles.dirty, { color: theme.textSecondary }]}>
          {isPublished ? 'Shared · ' : ''}
          {isDirty ? 'Unsaved' : 'Saved'}
        </Text>
      </View>

      <View style={styles.actions}>
        <AppButton
          label={isPublished ? 'Unshare' : 'Share'}
          variant="secondary"
          size="small"
          onPress={onTogglePublished}
        />
        <AppButton
          label="Replay"
          variant="secondary"
          size="small"
          onPress={onReplayAnimations}
        />
        {canDelete && (
          <AppButton
            label="Delete"
            variant="danger"
            size="small"
            onPress={onDeleteSelected}
          />
        )}
        <AppButton
          label={isSaving ? 'Saving…' : 'Save'}
          size="small"
          onPress={onSave}
          disabled={isSaving || !isDirty}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderBottomWidth: 1,
  },
  titleGroup: {
    flex: 1,
    gap: Spacing.half,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  dirty: {
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.two,
    alignItems: 'center',
  },
});
