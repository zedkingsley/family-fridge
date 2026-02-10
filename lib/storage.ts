// ============================================================
// Family Fridge — localStorage Persistence Layer
// ============================================================

const STORAGE_PREFIX = 'family-fridge';
const SCHEMA_VERSION = 1;

function storageKey(key: string): string {
  return `${STORAGE_PREFIX}:${key}`;
}

export function saveState<T>(key: string, data: T): void {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(storageKey(key), serialized);
  } catch (e) {
    console.warn(`Failed to save state for key "${key}":`, e);
  }
}

export function loadState<T>(key: string): T | null {
  try {
    const serialized = localStorage.getItem(storageKey(key));
    if (serialized === null) return null;
    return JSON.parse(serialized) as T;
  } catch (e) {
    console.warn(`Failed to load state for key "${key}":`, e);
    return null;
  }
}

export function removeState(key: string): void {
  try {
    localStorage.removeItem(storageKey(key));
  } catch (e) {
    console.warn(`Failed to remove state for key "${key}":`, e);
  }
}

export function clearAllState(): void {
  try {
    const keys = Object.keys(localStorage).filter(k => k.startsWith(STORAGE_PREFIX));
    keys.forEach(k => localStorage.removeItem(k));
  } catch (e) {
    console.warn('Failed to clear state:', e);
  }
}

export function getSchemaVersion(): number {
  return loadState<number>('schema-version') ?? 0;
}

export function setSchemaVersion(): void {
  saveState('schema-version', SCHEMA_VERSION);
}

export function isFirstRun(): boolean {
  return getSchemaVersion() === 0 && loadState('family') === null;
}

export function generateId(prefix: string = 'id'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
}
