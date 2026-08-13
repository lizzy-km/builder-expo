import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type PanelHeaderProps = {
  widgetLabel: string;
  onDelete: () => void;
};

/** Identifies the widget being edited and offers the one destructive action. */
export function PanelHeader({ widgetLabel, onDelete }: PanelHeaderProps) {
  const theme = useTheme();

  return (
    <View style={styles.header}>
      <View style={styles.identity}>
        <Text style={[styles.eyebrow, { color: theme.textSecondary }]}>Editing</Text>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
          {widgetLabel}
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Delete ${widgetLabel}`}
        onPress={onDelete}
        style={({ pressed }) => [
          styles.deleteButton,
          { borderColor: theme.danger },
          pressed && styles.pressed,
        ]}
      >
        <Text style={[styles.deleteLabel, { color: theme.danger }]}>Delete</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.three,
  },
  identity: {
    flex: 1,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
  },
  deleteButton: {
    borderWidth: 1,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  deleteLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.6,
  },
});
