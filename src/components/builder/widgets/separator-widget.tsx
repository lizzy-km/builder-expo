import { View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import type { SeparatorWidgetProps } from '@/types/builder';

export function SeparatorWidget({ thickness, color }: SeparatorWidgetProps) {
  const theme = useTheme();

  return (
    <View
      style={{
        width: '100%',
        height: Math.max(1, thickness),
        backgroundColor: color ?? theme.border,
      }}
    />
  );
}
