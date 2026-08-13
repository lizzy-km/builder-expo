import { Pressable, StyleSheet, Text, type PressableProps } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type AppButtonProps = Omit<PressableProps, 'children'> & {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium';
};

export function AppButton({
  label,
  variant = 'primary',
  size = 'medium',
  style,
  disabled,
  ...rest
}: AppButtonProps) {
  const theme = useTheme();

  const background =
    variant === 'primary'
      ? theme.primary
      : variant === 'danger'
        ? theme.danger
        : theme.backgroundElement;
  const textColor = variant === 'secondary' ? theme.text : theme.onPrimary;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={(state) => [
        styles.base,
        size === 'small' ? styles.small : styles.medium,
        { backgroundColor: background },
        state.pressed && styles.pressed,
        disabled && styles.disabled,
        typeof style === 'function' ? style(state) : style,
      ]}
      {...rest}
    >
      <Text style={[size === 'small' ? styles.labelSmall : styles.label, { color: textColor }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Spacing.two,
  },
  medium: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
  },
  small: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  labelSmall: {
    fontSize: 14,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
});
