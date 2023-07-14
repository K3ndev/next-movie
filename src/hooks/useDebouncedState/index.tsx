import { useEffect, useState } from "react";
import { DebouncedValue } from "./types";

/**
 * Custom hook that debounce value changes with minimal renders.

 * @example
 *
 * ```javascript
 * const debouncedValue = useDebounce<string>(valueState, 500)
 * ```
 *
 * @template T - The type of the value being debounced.
 * @param {T} value - The value to be debounced.
 * @param {number} [delay=500] - The delay in milliseconds before updating the debounced value.
 * @returns {T} - The debounced value.
 */

export function useDebounce<T>(value: T, delay?: number): DebouncedValue<T> {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
