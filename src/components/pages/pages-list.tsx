import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

import { PageListItem } from '@/components/pages/page-list-item';
import { AppButton } from '@/components/ui/app-button';
import { Spacing } from '@/constants/theme';
import { usePages } from '@/hooks/use-pages';
import { useTheme } from '@/hooks/use-theme';

export type PagesListProps = {
  ownerId: string;
};

/** Create field plus the signed-in user's page list. */
export function PagesList({ ownerId }: PagesListProps) {
  const theme = useTheme();
  const router = useRouter();
  const { pages, isLoading, error, addPage, removePage } = usePages(ownerId);
  const [title, setTitle] = useState('');

  const handleCreate = async () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    setTitle('');
    const page = await addPage(trimmed);
    router.push(`/builder/${page.id}`);
  };

  return (
    <>
      <View style={styles.createRow}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="New page title"
          placeholderTextColor={theme.textSecondary}
          style={[styles.input, { color: theme.text, borderColor: theme.border }]}
          onSubmitEditing={() => void handleCreate()}
          returnKeyType="done"
        />
        <AppButton
          label="Create"
          onPress={() => void handleCreate()}
          disabled={!title.trim()}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator color={theme.primary} style={styles.loader} />
      ) : (
        <FlatList
          data={pages}
          keyExtractor={(page) => page.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={[styles.empty, { color: theme.textSecondary }]}>
              {error ?? 'No pages yet — create your first one above.'}
            </Text>
          }
          renderItem={({ item }) => (
            <PageListItem
              page={item}
              onOpen={() => router.push(`/builder/${item.id}`)}
              onDelete={() => void removePage(item.id)}
            />
          )}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  createRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    fontSize: 16,
  },
  list: {
    gap: Spacing.two,
    paddingBottom: Spacing.four,
  },
  loader: {
    marginTop: Spacing.four,
  },
  empty: {
    textAlign: 'center',
    marginTop: Spacing.four,
    fontSize: 14,
  },
});
