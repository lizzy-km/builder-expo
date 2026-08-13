import { onAuthStateChanged, type User } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { auth } from '@/lib/firebase';

export type AuthState = {
  userId: string | null;
  email: string | null;
  /** False until Firebase has restored any persisted session. */
  isReady: boolean;
};

/**
 * Tracks the signed-in user. Sign-in itself is explicit (see `auth-service`), so this
 * only reports state — it never creates an account on its own.
 */
export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(() => auth.currentUser);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (next) => {
      setUser(next);
      setIsReady(true);
    });

    return unsubscribe;
  }, []);

  return { userId: user?.uid ?? null, email: user?.email ?? null, isReady };
}
