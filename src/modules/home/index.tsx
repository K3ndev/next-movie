import { FormEvent, useRef, useState } from 'react';
import Head from 'next/head';
import { useIntersection } from '@mantine/hooks';
import { Header, Footer } from '../../shared/components/index';
import InfiniteFetch from '../../shared/hooks/InfiniteFetch';

// import Image from 'next/image';
// import { Inter } from 'next/font/google';

// const inter = Inter({ subsets: ['latin'] });

export default function Home(props: any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data } = props;
  // i dint not included this in ui, because it will cause a problem in styling, but i think its good in seo
  const { ref, entry } = useIntersection();
  // const delayRef = useRef<NodeJS.Timeout | null>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const [isSearching, setIsSearching] = useState(false);
  const url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20';
  const { DATA } = InfiniteFetch(entry, url);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSearching(true);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>Next Pokemon | Home page </title>
      </Head>
      <Header />
      <main className="bg-[#D9D9D9] ">
        <section className="my-3">
          <div className="mb-3 flex justify-center">
            <form
              onSubmit={(e) => {
                onSubmitHandler(e);
              }}
            >
              <input
                type="text"
                placeholder="search"
                className="w-96"
                ref={searchInput}
              />
            </form>
          </div>

          <div className="mx-auto grid max-w-7xl grid-cols-4 gap-2">
            {!isSearching &&
              DATA?.pages.map((group: any) =>
                group.response.map((pokemon: any) => (
                  <div key={pokemon.name} className=" ">
                    {/* we are going to fetch from pokemon.url */}
                    <div className="h-56 bg-slate-600 p-3">{pokemon.name}</div>
                    {/* {console.log(pokemon)} */}
                  </div>
                ))
              )}
          </div>
        </section>

        {DATA && !isSearching && (
          <section className="mx-auto max-w-7xl">
            <div className="flex justify-center bg-red-300 ">
              <div ref={ref} className="text-red-900">
                Fetching
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

// https://eya-recipes.netlify.app/
