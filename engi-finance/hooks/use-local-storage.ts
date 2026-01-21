'use client';

import { useSyncExternalStore, useCallback } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const getSnapshot = (): T => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  };

  const subscribe = (onStoreChange: () => void): (() => void) => {
    const handler = (e: StorageEvent) => {
      if (e.key === key || e.key === null) {
        onStoreChange();
      }
    };
    window.addEventListener('storage', handler);
    const customHandler = () => onStoreChange();
    window.addEventListener(`localStorage-${key}`, customHandler);
    return () => {
      window.removeEventListener('storage', handler);
      window.removeEventListener(`localStorage-${key}`, customHandler);
    };
  };

  const storedValue = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => initialValue
  );

  const setValue = useCallback((value: T) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      window.dispatchEvent(new CustomEvent(`localStorage-${key}`));
    } catch (error) {
      console.error(error);
    }
  }, [key]);

  return [storedValue, setValue];
}
