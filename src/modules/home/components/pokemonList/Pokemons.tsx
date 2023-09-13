import Image from 'next/image';
import Link from 'next/link';
import { useFetchPokemon } from '../../hooks/index';

type PokemonType = {
  pokemonURL: string;
};

// eslint-disable-next-line import/prefer-default-export
export const Pokemons = (props: PokemonType) => {
  const { pokemonURL } = props;
  const { pokemonDATA, isLoading } = useFetchPokemon(pokemonURL);

  // loading state
  if (isLoading || !pokemonDATA) {
    return (
      <div className="flex h-full w-full rounded-lg border bg-white shadow-lg duration-500 ease-in-out hover:scale-95 hover:bg-slate-100">
        <div className="w-full cursor-pointer">
          <div className="max-h-80 w-full overflow-hidden p-6">
            <div className="rounded-md bg-slate-700">
              <div className="aspect-square max-w-[254px]"></div>
            </div>
          </div>
          <div className="px-6 pb-6">
            <div className="">
              <h3 className="text-lg font-bold text-slate-700">Loading</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      className="flex h-full w-full rounded-lg border bg-white shadow-lg duration-500 ease-in-out hover:scale-95 hover:bg-slate-100

"
    >
      <Link
        className="w-full cursor-pointer"
        href={`/pokemon/${pokemonDATA.id}`}
      >
        <div className="max-h-80 w-full overflow-hidden p-6">
          <div className="rounded-md bg-slate-700">
            <Image
              src={
                pokemonDATA.sprites.other['official-artwork'].front_default ||
                ''
              }
              alt="pokemon"
              width={150}
              height={150}
              quality={20}
              className="aspect-square w-full scale-75"
              priority
            />
          </div>
        </div>
        <div className="px-6 pb-6">
          <div className="">
            <h3 className="text-lg  font-bold text-slate-700">
              {pokemonDATA.name.charAt(0).toUpperCase() +
                pokemonDATA.name.slice(1) || ''}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
}