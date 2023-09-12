import { useEffect, useState } from 'react';

interface pokemonDATAType {
  id: number;
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}

// i don't think we need to do some catching here
export const useFetchPokemon = (pokemonURL: string) => {
  const [pokemonDATA, setPokemonDATA] = useState<pokemonDATAType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchPokemon = async () => {
    const res = await fetch(pokemonURL);
    const data = await res.json() as pokemonDATAType;

    return data;
  };

  useEffect(() => {
    fetchPokemon().then((data) => {
      setPokemonDATA(data);
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { pokemonDATA, isLoading };
}
