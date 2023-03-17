import { useEffect, useState } from 'react';
import Image from 'next/image';

type PokemonType = {
  pokemonURL: string;
};

// eslint-disable-next-line import/prefer-default-export
export function Pokemon(props: PokemonType) {
  const { pokemonURL } = props;
  const [pokemonDATA, setPokemonDATA] = useState<any>();

  const fetchPokemon = async () => {
    const res = await fetch(pokemonURL);
    const data = await res.json();

    return data;
  };

  useEffect(() => {
    fetchPokemon().then((data: any) => {
      setPokemonDATA(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   put a loading state so that fetching doesnt show
  return (
    <div className="flex h-full w-full items-center justify-center border ">
      {pokemonDATA ? (
        <Image
          src={pokemonDATA.sprites.other.dream_world.front_default}
          alt="pokemon"
          width={200}
          height={200}
        />
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}
