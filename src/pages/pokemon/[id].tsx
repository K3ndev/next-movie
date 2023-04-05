import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

const Pokemon = () => {
  const router = useRouter();
  const { id } = router.query;

  // eslint-disable-next-line consistent-return
  const fetchPokemon = async () => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();

      return data;
    } catch (error) {
      console.error(error);
    }
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
