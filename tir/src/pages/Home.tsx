import React from 'react';
import Header from '../components/Header';
import CarDisplay from '../components/CarDisplay';

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <h1>Welcome to the Car Rental Service</h1>
      <CarDisplay />
    </div>
  );
};

export default Home;
