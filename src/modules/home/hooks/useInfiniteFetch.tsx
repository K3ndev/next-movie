import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

// https://pokeapi.co/api/v2/pokemon?offset=0&limit=20

export const useInfiniteFetch = (entry: IntersectionObserverEntry, url: string) => {
  const delayRef = useRef<NodeJS.Timeout | null>(null);

  const fetchPokemons = async ({ pageParam = url }) => {
    const res = await fetch(pageParam);
    const { results, next } = await res.json() as { results: {name: string, url: string}[], next: string };

    return { response: results, nextPage: next };
  };

  const { data: DATA, fetchNextPage } = useInfiniteQuery(
    ['pokemons'],
    fetchPokemons,
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
};
