import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useInfiniteFetchType, RecipeResultType } from "./types";

/**
 * Custom hook for fetching infinite data.
 *
 * @example
 * ```javascript
 * const { DATA } = useInfiniteFetch({ entry, url });
 * ```
 *
 * @param {Object} options - The options for fetching infinite data.
 * @param {Object} options.entry - The entry parameter for the intersection observer.
 * @param {string} options.url - The URL parameter for fetching data.
 * @returns {Object} - An object containing the fetched data.
 * @property {DATA} DATA - The result value.
 */
export function useInfiniteFetch({ entry, url }: useInfiniteFetchType) {
  const delayRef = useRef<NodeJS.Timeout | null>(null);

  const fetchRecipe = async ({ pageParam = url }) => {
    const res = await fetch(pageParam);

    const {
      hits: results,
      _links: { next },
    } = (await res.json()) as RecipeResultType;

    return { response: results, nextPage: next.href };
  };

  const { data: DATA, fetchNextPage } = useInfiniteQuery(
    ["recipe"],
    fetchRecipe,
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextPage;
      },
    }
  );

  useEffect(() => {
    if (entry?.isIntersecting) {
      delayRef.current = setTimeout(fetchNextPage, 1000);
    }
    return () => {
      clearTimeout(delayRef.current!);
    };
  }, [entry?.isIntersecting, fetchNextPage]);
  return { DATA };
}
