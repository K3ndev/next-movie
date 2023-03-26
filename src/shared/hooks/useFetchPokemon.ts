import { useEffect, useState } from 'react';

// i don't think we need to do some catching here
function useFetchPokemon(pokemonURL: string) {
  const [pokemonDATA, setPokemonDATA] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchPokemon = async () => {
    const res = await fetch(pokemonURL);
    const data = await res.json();

    return data;
  };

  useEffect(() => {
    fetchPokemon().then((data: any) => {
      setPokemonDATA(data);
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { pokemonDATA, isLoading };
}

export default useFetchPokemon;
