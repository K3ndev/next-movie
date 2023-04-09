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
      <div className="flex h-full w-full border bg-white rounded-lg shadow-lg hover:scale-95 hover:bg-slate-100 duration-500 ease-in-out">
        <div className="w-full cursor-pointer">
          <div className="max-h-80 w-full overflow-hidden p-6">
            <div className="bg-slate-700 rounded-md">
              <div className="max-w-[254px] aspect-square"></div>
            </div>
          </div>
          <div className="px-6 pb-6">
            <div className="">
              <h3 className="text-slate-700 text-lg font-bold">Loading</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      className="flex h-full w-full border bg-white rounded-lg shadow-lg hover:scale-95 hover:bg-slate-100 duration-500 ease-in-out

"
    >
      <Link
        className="w-full cursor-pointer"
        href={`/pokemon/${pokemonDATA.id}`}
      >
        <div className="max-h-80 w-full overflow-hidden p-6">
          <div className="bg-slate-700 rounded-md">
            <Image
              src={
                pokemonDATA.sprites.other['official-artwork'].front_default ||
                ''
              }
              alt="pokemon"
              width={200}
              height={200}
              quality={60}
              className="aspect-square w-full scale-75"
            />
          </div>
        </div>
        <div className="px-6 pb-6">
          <div className="">
            <h3 className="text-slate-700  text-lg font-bold">
              {pokemonDATA.name.charAt(0).toUpperCase() +
                pokemonDATA.name.slice(1) || ''}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
}
