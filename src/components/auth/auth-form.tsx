import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { AppButton } from '@/components/ui/app-button';
import { Spacing } from '@/constants/theme';
import { useAuthForm } from '@/hooks/use-auth-form';
import { useTheme } from '@/hooks/use-theme';

/** Email + password sign-in / sign-up form. */
export function AuthForm() {
  const theme = useTheme();
  const form = useAuthForm();
  const isSignUp = form.mode === 'signUp';

  return (
    <View style={styles.form}>
      <Text style={[styles.heading, { color: theme.text }]}>
        {isSignUp ? 'Create an account' : 'Sign in'}
      </Text>
      <Text style={[styles.subheading, { color: theme.textSecondary }]}>
        {isSignUp
          ? 'Your pages sync to this account across devices.'
          : 'Sign in to reach your landing pages.'}
      </Text>

      <TextInput
        value={form.email}
        onChangeText={form.setEmail}
        placeholder="Email"
        placeholderTextColor={theme.textSecondary}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        textContentType="emailAddress"
        style={[styles.input, { color: theme.text, borderColor: theme.border }]}
      />

      <TextInput
        value={form.password}
        onChangeText={form.setPassword}
        placeholder="Password"
        placeholderTextColor={theme.textSecondary}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        textContentType={isSignUp ? 'newPassword' : 'password'}
        onSubmitEditing={() => void form.submit()}
        returnKeyType="go"
        style={[styles.input, { color: theme.text, borderColor: theme.border }]}
      />

      {form.error ? (
        <Text style={[styles.error, { color: theme.danger }]}>{form.error}</Text>
      ) : null}

      <AppButton
        label={form.isSubmitting ? 'Please wait…' : isSignUp ? 'Create account' : 'Sign in'}
        onPress={() => void form.submit()}
        disabled={!form.canSubmit}
      />

      <Pressable accessibilityRole="button" onPress={form.toggleMode} style={styles.switch}>
        <Text style={[styles.switchText, { color: theme.primary }]}>
          {isSignUp ? 'Already have an account? Sign in' : 'New here? Create an account'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: Spacing.three,
    width: '100%',
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
  },
  subheading: {
    fontSize: 14,
    marginTop: -Spacing.two,
  },
  input: {
    borderWidth: 1,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    fontSize: 16,
  },
  error: {
    fontSize: 14,
  },
  switch: {
    alignItems: 'center',
    paddingVertical: Spacing.two,
  },
  switchText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
