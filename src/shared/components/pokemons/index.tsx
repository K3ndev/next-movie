import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type PokemonType = {
  pokemonURL: string;
};

// eslint-disable-next-line import/prefer-default-export
export function Pokemons(props: PokemonType) {
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
    <div className="flex h-full w-full border ">
      {pokemonDATA ? (
        <Link
          className="w-full cursor-pointer"
          href={`/pokemon/${pokemonDATA.id}`}
        >
          <div className="max-h-80 w-full overflow-hidden bg-black	">
            <Image
              src={pokemonDATA.sprites.other.dream_world.front_default || ''}
              alt="pokemon"
              width={200}
              height={200}
              quality={60}
              className="aspect-square w-full scale-75 hover:scale-90"
            />
          </div>
          <div>
            <h3>{pokemonDATA.name || ''}</h3>
          </div>
        </Link>
      ) : (
        <div className="w-full cursor-pointer">
          <div className="max-h-80 w-full overflow-hidden bg-black	">
            <div
              className="aspect-square w-full scale-75 hover:scale-90"
              style={{ width: '200', height: '200' }}
            />
          </div>
          <div>
            <h3>loading</h3>
          </div>
        </div>
      )}
    </div>
  );
}

// todo: use the data from ssr
// todo: use react.lazy on pokemon dynamic route
