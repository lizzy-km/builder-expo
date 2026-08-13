import { useCallback, useState } from 'react';

import { describeAuthError, signInWithEmail, signUpWithEmail } from '@/lib/auth-service';

export type AuthMode = 'signIn' | 'signUp';

/** Owns the sign-in form's fields, mode, and submission state. */
export function useAuthForm() {
  const [mode, setMode] = useState<AuthMode>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = email.trim().length > 0 && password.length > 0 && !isSubmitting;

  const submit = useCallback(async () => {
    if (!canSubmit) return;

    setIsSubmitting(true);
    setError(null);
    try {
      if (mode === 'signUp') {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
    } catch (cause) {
      setError(describeAuthError(cause));
    } finally {
      setIsSubmitting(false);
    }
  }, [canSubmit, mode, email, password]);

  const toggleMode = useCallback(() => {
    setMode((current) => (current === 'signIn' ? 'signUp' : 'signIn'));
    setError(null);
  }, []);

  return {
    mode,
    email,
    password,
    error,
    isSubmitting,
    canSubmit,
    setEmail,
    setPassword,
    submit,
    toggleMode,
  };
}
