/**
 * Native auth initialization. Sessions are persisted through AsyncStorage so a signed-in
 * user survives app restarts; the `.web.ts` sibling relies on browser storage instead.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { FirebaseApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth, type Auth } from 'firebase/auth';

export function createAuth(app: FirebaseApp): Auth {
  return initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}
