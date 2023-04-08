import React from 'react';

const AsyncHome = React.lazy(() => import('../modules/home/index'));

const HomePage: React.FC = () => {
  return <AsyncHome />;
};

export default HomePage;
