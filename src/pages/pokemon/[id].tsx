import { useRouter } from 'next/router';

const Pokemon = () => {
  const router = useRouter();
  const { id } = router.query;

  return <p>Pokemon Id: {id}</p>;
};

export default Pokemon;
