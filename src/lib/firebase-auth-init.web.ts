/**
 * Web auth initialization. `getAuth` picks browser-local persistence automatically, so
 * no explicit storage wiring is needed here.
 */

import type { FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';

export function createAuth(app: FirebaseApp): Auth {
  return getAuth(app);
}
