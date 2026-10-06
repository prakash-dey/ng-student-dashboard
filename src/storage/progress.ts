// Local progress in IndexedDB (one record). Failures are ignored: saving progress is a convenience, the app
// works without it (private mode, storage full, old browsers).
import type { AppState } from '../logic/state';

const DB = 'navgurukul-admission', STORE = 'kv', KEY = 'progress', VERSION = 1;
const SAVE_DELAY_MS = 400;

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, VERSION);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function run<T>(mode: IDBTransactionMode, fn: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return open().then((db) => new Promise<T>((resolve, reject) => {
    const req = fn(db.transaction(STORE, mode).objectStore(STORE));
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  }));
}

/** Saved progress, or null (nothing saved, or storage unavailable). Gives up after `timeoutMs`. */
export function loadProgress(timeoutMs = 500): Promise<Partial<AppState> | null> {
  const load = run<Partial<AppState> | undefined>('readonly', (s) => s.get(KEY)).then((v) => v ?? null).catch(() => null);
  return Promise.race([load, new Promise<null>((r) => setTimeout(() => r(null), timeoutMs))]);
}

let timer: ReturnType<typeof setTimeout> | undefined;
/** Save after changes settle (debounced). */
export function saveProgress(progress: Partial<AppState>) {
  clearTimeout(timer);
  timer = setTimeout(() => { run('readwrite', (s) => s.put(progress, KEY)).catch(() => {}); }, SAVE_DELAY_MS);
}

export function clearProgress() {
  return run('readwrite', (s) => s.delete(KEY)).catch(() => {});
}
