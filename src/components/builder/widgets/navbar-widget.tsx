import { StyleSheet, Text, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { NavbarWidgetProps } from '@/types/builder';

export function NavbarWidget({ brand, links, backgroundColor, textColor }: NavbarWidgetProps) {
  const theme = useTheme();
  const foreground = textColor ?? theme.text;

  return (
    <View
      style={[styles.bar, { backgroundColor: backgroundColor ?? theme.backgroundElement }]}
    >
      <Text style={[styles.brand, { color: foreground }]} numberOfLines={1}>
        {brand}
      </Text>
      <View style={styles.links}>
        {links.map((link, index) => (
          <Text key={`${link}-${index}`} style={[styles.link, { color: foreground }]}>
            {link}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
  },
  brand: {
    fontSize: 16,
    fontWeight: '700',
    flexShrink: 1,
  },
  links: {
    flexDirection: 'row',
    gap: Spacing.three,
    flexShrink: 0,
  },
  link: {
    fontSize: 14,
    fontWeight: '500',
  },
});
