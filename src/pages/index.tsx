import React from 'react';

const AsyncHome = React.lazy(() => import('../modules/home/index'));

const HomePage: React.FC = (props: any) => {
  return <AsyncHome data={props.data} />;
};

export default HomePage;

export async function getServerSideProps() {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon`);
  const data = await res.json();
  return { props: { data } };
}
