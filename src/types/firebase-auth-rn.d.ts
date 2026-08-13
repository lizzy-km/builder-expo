/**
 * `getReactNativePersistence` is a real named export of `@firebase/auth`'s React Native
 * build (`dist/rn/index.js` → `exports.getReactNativePersistence`), but the shipped
 * `firebase/auth` types describe the browser build and omit it.
 *
 * This *augments* the existing module (note the `import` above the declaration, which
 * makes TypeScript merge rather than replace) so the native auth setup stays type-safe
 * without casting through `any`. Remove once Firebase ships RN types including it.
 */

import 'firebase/auth';

declare module 'firebase/auth' {
  /** Minimal slice of AsyncStorage that Firebase Auth actually uses. */
  export type ReactNativeAsyncStorage = {
    setItem(key: string, value: string): Promise<void>;
    getItem(key: string): Promise<string | null>;
    removeItem(key: string): Promise<void>;
  };

  export function getReactNativePersistence(
    storage: ReactNativeAsyncStorage,
  ): import('firebase/auth').Persistence;
}
