import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BuilderCanvas } from '@/components/builder/builder-canvas';
import { BuilderDrawer } from '@/components/builder/builder-drawer';
import { BuilderToolbar } from '@/components/builder/builder-toolbar';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { usePageEditor } from '@/hooks/use-page-editor';
import { useTheme } from '@/hooks/use-theme';
import { useBuilderStore } from '@/lib/builder-store';

export default function BuilderScreen() {
  const theme = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isLoading, isSaving, error, save, togglePublished } = usePageEditor(id);
  const [replayKey, setReplayKey] = useState(0);

  const title = useBuilderStore((state) => state.title);
  const blocks = useBuilderStore((state) => state.blocks);
  const selectedId = useBuilderStore((state) => state.selectedId);
  const isDirty = useBuilderStore((state) => state.isDirty);
  const isPublished = useBuilderStore((state) => state.isPublished);
  const removeWidget = useBuilderStore((state) => state.removeWidget);
  const moveWidget = useBuilderStore((state) => state.moveWidget);
  const selectWidget = useBuilderStore((state) => state.selectWidget);

  if (isLoading) {
    return (
      <ThemedView style={styles.centered}>
        <ActivityIndicator color={theme.primary} />
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.centered}>
        <Text style={[styles.error, { color: theme.danger }]}>{error}</Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <BuilderToolbar
          title={title}
          isDirty={isDirty}
          isSaving={isSaving}
          canDelete={selectedId !== null}
          isPublished={isPublished}
          onSave={() => void save()}
          onDeleteSelected={() => selectedId && removeWidget(selectedId)}
          onReplayAnimations={() => setReplayKey((key) => key + 1)}
          onTogglePublished={() => void togglePublished(!isPublished)}
        />

        <BuilderCanvas
          blocks={blocks}
          selectedId={selectedId}
          replayKey={replayKey}
          onSelect={selectWidget}
          onReorder={moveWidget}
        />

        <BuilderDrawer />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingBottom: BottomTabInset,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.four,
  },
  error: {
    fontSize: 15,
    textAlign: 'center',
  },
});
