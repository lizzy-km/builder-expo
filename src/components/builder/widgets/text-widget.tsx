import { Text } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import type { TextWidgetProps } from '@/types/builder';

const VARIANT_STYLE = {
  heading: { fontSize: 28, lineHeight: 34, fontWeight: '700' },
  subheading: { fontSize: 20, lineHeight: 26, fontWeight: '600' },
  paragraph: { fontSize: 16, lineHeight: 24, fontWeight: '400' },
} as const;

export function TextWidget({ content, variant, color, align = 'left' }: TextWidgetProps) {
  const theme = useTheme();

  return (
    <Text style={[VARIANT_STYLE[variant], { color: color ?? theme.text, textAlign: align }]}>
      {content}
    </Text>
  );
}
