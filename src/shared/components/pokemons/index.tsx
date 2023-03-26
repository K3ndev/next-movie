import Image from 'next/image';
import Link from 'next/link';
import useFetchPokemon from '@/shared/hooks/useFetchPokemon';

type PokemonType = {
  pokemonURL: string;
};

// eslint-disable-next-line import/prefer-default-export
export function Pokemons(props: PokemonType) {
  const { pokemonURL } = props;
  const { pokemonDATA, isLoading } = useFetchPokemon(pokemonURL);

  // loading state
  if (isLoading) {
    return (
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
    );
  }
  return (
    <div className="flex h-full w-full border ">
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
    </div>
  );
}

// todo: use the data from ssr
// todo: use react.lazy on pokemon dynamic route
