import { Layout, GenericPanel } from "@/shared/components/custom/index";
import { FormEvent, useState, useEffect } from 'react';
import { useIntersection } from '@mantine/hooks';
import { useInfiniteFetch } from './hooks/index';
import localData from '@/shared/data/pokemon.json';
import { Search } from './components/icons/search';
import { Pokemons } from "./components/index"

type PokemonResultType = {
  name: string;
  url: string;
};

type dataPokemonType = {
  count: number;
  next: null;
  previous: null;
  results: PokemonResultType[];
};

export default function Home() {

  const { ref: interactionRef, entry } = useIntersection();
  const [searchInput, setSearchInput] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);
  const [filteredData, setFilteredData] = useState<PokemonResultType[] | undefined>();
  const pokemonsUrl = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20';
  const { DATA: pokemonsData } = useInfiniteFetch(entry, pokemonsUrl);

  const filterPokemon = (dataPokemon: dataPokemonType, pokemonName: string) => {

    return dataPokemon.results.filter((item: { name: string }) => {
      return item.name.includes(pokemonName.toLowerCase());
    });
  };

  const fetchPokemon = async () => {
    return localData;
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSearching(true);

    if (searchInput === '') {
      setIsSearching(false);
    }

    fetchPokemon()
      .then((dataPokemon) => {
        setFilteredData(filterPokemon(dataPokemon, searchInput));
      })
      .catch((_) => {
      });

    const url = new URL(window.location.href);
    url.searchParams.set('q', searchInput);
    window.history.pushState({}, '', url);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('q');

    if (searchParam) {
      setIsSearching(true);
      setSearchInput(searchParam);
      fetchPokemon()
        .then((dataPokemon) => {
          setFilteredData(filterPokemon(dataPokemon, searchParam));
        })
        .catch((_) => {
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <Layout>
      <GenericPanel className="mt-10 md:mt-12 px-5 py-5 md:py-7">
        <div className="mb-3 flex justify-center">
          <form
            onSubmit={(e) => {
              onSubmitHandler(e);
            }}
            className="relative"
          >
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="search pokemon"
                className="w-full rounded-md p-2 sm:w-96"
                name="q"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.currentTarget.value);
                }}
              />
              <button type="submit" className="rounded-md bg-slate-700 p-2">
                <Search className="text-white" />
              </button>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {!isSearching &&
            pokemonsData?.pages.map((group) =>
              group.response.map((pokemon) => {
                return (
                  <div key={pokemon.name}>
                    <Pokemons pokemonURL={pokemon.url} />
                  </div>
                );
              })
            )}

          {isSearching &&
            filteredData?.map((pokemon: {name: string, url:string}) => {
              return (
                <div key={pokemon.name}>
                  <Pokemons pokemonURL={pokemon.url} />
                </div>
              );
            })}
        </div>
      </GenericPanel>
      {pokemonsData && !isSearching && (
        <GenericPanel className="mx-auto max-w-7xl">
          <div className="flex justify-center bg-red-300 ">
            <div  ref={interactionRef} className="text-red-900">
              Fetching
            </div>
          </div>
        </GenericPanel>
      )}
    </Layout>
  );
}

// todo! after the user search, it should divided into 40 pokemon so that it will not fetch everything 
// todo! fix the image (was detected as the Largest Contentful)