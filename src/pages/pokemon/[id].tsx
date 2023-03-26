import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

const Pokemon = () => {
  const router = useRouter();
  const { id } = router.query;

  const fetchPokemon = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();

    return data;
  };

  const { data, isLoading, refetch, isFetching } = useQuery(
    ['pokemon'],
    fetchPokemon
  );

  useEffect(() => {
    if (data) {
      if (Number(id) !== Number(data.id)) {
        refetch();
      }
    }
  }, []);

  // loading state
  if (isLoading || isFetching) {
    return (
      <>
        <p className="">loading</p>
      </>
    );
  }

  return (
    <>
      <p>Pokemon Id: {data?.id}</p>
      <p>Pokemon Name: {data?.name}</p>
    </>
  );
};

export default Pokemon;
