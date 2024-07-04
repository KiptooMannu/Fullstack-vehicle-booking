import React from 'react';

interface Car {
  id: number;
  model: string;
  manufacturer: string;
  year: number;
  price: number;
}

const cars: Car[] = [
  { id: 1, model: 'Model S', manufacturer: 'Tesla', year: 2020, price: 70000 },
  { id: 2, model: 'Mustang', manufacturer: 'Ford', year: 2021, price: 55000 },
];

const CarDisplay: React.FC = () => {
  return (
    <div>
      <h2>Cars Available</h2>
      <ul>
        {cars.map(car => (
          <li key={car.id}>
            {car.manufacturer} {car.model} ({car.year}) - ${car.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarDisplay;
