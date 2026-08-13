import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthForm } from '@/components/auth/auth-form';
import { PagesList } from '@/components/pages/pages-list';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useAuth } from '@/hooks/use-auth';
import { useTheme } from '@/hooks/use-theme';
import { signOut } from '@/lib/auth-service';

export default function PagesScreen() {
  const theme = useTheme();
  const { userId, email, isReady } = useAuth();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {!isReady ? (
          <ActivityIndicator color={theme.primary} style={styles.loader} />
        ) : userId ? (
          <>
            <View style={styles.header}>
              <View style={styles.headerText}>
                <Text style={[styles.heading, { color: theme.text }]}>Landing pages</Text>
                {email ? (
                  <Text style={[styles.account, { color: theme.textSecondary }]} numberOfLines={1}>
                    {email}
                  </Text>
                ) : null}
              </View>
              <Pressable
                accessibilityRole="button"
                onPress={() => void signOut()}
                style={styles.signOut}
              >
                <Text style={[styles.signOutText, { color: theme.primary }]}>Sign out</Text>
              </Pressable>
            </View>

            <PagesList ownerId={userId} />
          </>
        ) : (
          <View style={styles.authWrapper}>
            <AuthForm />
          </View>
        )}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    gap: Spacing.three,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: Spacing.three,
    paddingTop: Spacing.three,
  },
  headerText: {
    flex: 1,
    gap: Spacing.half,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
  },
  account: {
    fontSize: 13,
  },
  signOut: {
    paddingVertical: Spacing.two,
  },
  signOutText: {
    fontSize: 14,
    fontWeight: '600',
  },
  authWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  loader: {
    marginTop: Spacing.five,
  },
});
