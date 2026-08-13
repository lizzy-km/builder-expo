/**
 * Firestore rejects `undefined` field values outright, and the builder leaves optional
 * props (colors, links, unset sizing, animation) undefined until they're edited. This
 * drops those keys instead so writes succeed and absent stays absent.
 */

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

export function stripUndefined<T>(value: T): T {
  return strip(value as Json) as T;
}

function strip(value: Json): Json {
  if (Array.isArray(value)) {
    return value.map(strip);
  }

  if (value !== null && typeof value === 'object') {
    const result: { [key: string]: Json } = {};
    for (const [key, entry] of Object.entries(value)) {
      if (entry === undefined) continue;
      result[key] = strip(entry);
    }
    return result;
  }

  return value;
}
