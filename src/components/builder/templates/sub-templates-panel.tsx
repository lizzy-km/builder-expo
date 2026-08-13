import { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { AppButton } from '@/components/ui/app-button';
import { FieldCard } from '@/components/ui/field-card';
import { Spacing } from '@/constants/theme';
import { useAuth } from '@/hooks/use-auth';
import { useSubTemplates } from '@/hooks/use-sub-templates';
import { useTheme } from '@/hooks/use-theme';
import { extractSubtree } from '@/lib/block-clone';
import { useBuilderStore } from '@/lib/builder-store';
import { WIDGET_LABELS } from '@/lib/widget-defaults';
import type { SubTemplate } from '@/types/builder';

export type SubTemplatesPanelProps = {
  fillHeight?: boolean;
};

function TemplateRow({
  template,
  onInsert,
  onDelete,
}: {
  template: SubTemplate;
  onInsert: () => void;
  onDelete: () => void;
}) {
  const theme = useTheme();

  return (
    <View style={[styles.row, { borderColor: theme.border }]}>
      <View style={styles.rowText}>
        <Text style={[styles.rowName, { color: theme.text }]} numberOfLines={1}>
          {template.name}
        </Text>
        <Text style={[styles.rowMeta, { color: theme.textSecondary }]}>
          {template.blocks.length} {template.blocks.length === 1 ? 'element' : 'elements'}
        </Text>
      </View>
      <AppButton label="Insert" size="small" onPress={onInsert} />
      <AppButton label="Delete" variant="danger" size="small" onPress={onDelete} />
    </View>
  );
}

/** Save the selected element (with its children) for reuse, and insert saved groups. */
export function SubTemplatesPanel({ fillHeight = false }: SubTemplatesPanelProps) {
  const theme = useTheme();
  const { userId } = useAuth();
  const { templates, isLoading, error, save, remove } = useSubTemplates(userId);
  const [name, setName] = useState('');

  const blocks = useBuilderStore((state) => state.blocks);
  const selectedId = useBuilderStore((state) => state.selectedId);
  const insertBlocks = useBuilderStore((state) => state.insertBlocks);
  const selected = blocks.find((block) => block.id === selectedId);

  const handleSave = async () => {
    const trimmed = name.trim();
    if (!trimmed || !selectedId) return;
    setName('');
    await save(trimmed, extractSubtree(blocks, selectedId));
  };

  return (
    <ScrollView
      style={fillHeight ? styles.scrollFill : styles.scroll}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.heading, { color: theme.text }]}>Sub Templates</Text>

      <FieldCard label="Save selection">
        {selected ? (
          <>
            <Text style={[styles.hint, { color: theme.textSecondary }]}>
              Saves {WIDGET_LABELS[selected.type]} and everything inside it.
            </Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Template name"
              placeholderTextColor={theme.textSecondary}
              style={[
                styles.input,
                {
                  color: theme.text,
                  backgroundColor: theme.fieldInput,
                  borderColor: theme.fieldCardBorder,
                },
              ]}
            />
            <AppButton
              label="Save as template"
              size="small"
              onPress={() => void handleSave()}
              disabled={!name.trim()}
            />
          </>
        ) : (
          <Text style={[styles.hint, { color: theme.textSecondary }]}>
            Select an element on the canvas to save it as a template.
          </Text>
        )}
      </FieldCard>

      {isLoading ? (
        <ActivityIndicator color={theme.primary} style={styles.loader} />
      ) : templates.length === 0 ? (
        <Text style={[styles.hint, { color: theme.textSecondary }]}>
          {error ?? 'No saved templates yet.'}
        </Text>
      ) : (
        templates.map((template) => (
          <TemplateRow
            key={template.id}
            template={template}
            onInsert={() => insertBlocks(template.blocks)}
            onDelete={() => void remove(template.id)}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 0,
    maxHeight: 340,
  },
  scrollFill: {
    flex: 1,
  },
  content: {
    padding: Spacing.three,
    paddingBottom: Spacing.five,
    gap: Spacing.three,
  },
  heading: {
    fontSize: 15,
    fontWeight: '700',
  },
  hint: {
    fontSize: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: Spacing.one,
    paddingHorizontal: Spacing.two,
    minHeight: 38,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    borderWidth: 1,
    borderRadius: Spacing.two,
    padding: Spacing.two,
  },
  rowText: {
    flex: 1,
  },
  rowName: {
    fontSize: 13,
    fontWeight: '600',
  },
  rowMeta: {
    fontSize: 11,
  },
  loader: {
    marginTop: Spacing.three,
  },
});
