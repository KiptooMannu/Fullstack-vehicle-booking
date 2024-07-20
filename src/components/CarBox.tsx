import { useState } from 'react';

interface Car {
  img: string;
  price: number;
  model: string;
  mark: string;
  year: number;
  doors: number;
  air: string;
  transmission: string;
  fuel: string;
}

interface CarBoxProps {
  data: any;
  carID: number;
}

const CarBox: React.FC<CarBoxProps> = ({ data, carID }) => {
  const [carLoad, setCarLoad] = useState<boolean>(true);

  return (
    <>
      {data[carID].map((car: Car, id: number) => (
        <div key={id} className='box-cars'>
          {/* car */}
          <div className='pick-car'>
            {carLoad && <span className='loader'></span>}
            <img
              style={{ display: carLoad ? 'none' : 'block' }}
              src={car.img}
              alt='car_img'
              width='600'
              height='400'
              onLoad={() => setCarLoad(false)}
            />
          </div>
          {/* description */}
          <div className='pick-description'>
            <div className='pick-description__price'>
              <span>$ {car.price}</span>/ per day
            </div>
            <div className='pick-description__table'>
              <div className='pick-description__table__col'>
                <span>Model</span>
                <span>{car.model}</span>
              </div>

              <div className='pick-description__table__col'>
                <span>Brand</span>
                <span>{car.mark}</span>
              </div>

              <div className='pick-description__table__col'>
                <span>Year</span>
                <span>{car.year}</span>
              </div>

              <div className='pick-description__table__col'>
                <span>Doors</span>
                <span>{car.doors}</span>
              </div>

              <div className='pick-description__table__col'>
                <span>Air Conditioning</span>
                <span>{car.air}</span>
              </div>

              <div className='pick-description__table__col'>
                <span>Transmission</span>
                <span>{car.transmission}</span>
              </div>

              <div className='pick-description__table__col'>
                <span>Fuel</span>
                <span>{car.fuel}</span>
              </div>
            </div>
            {/* call to action button */}
            <a className='cta-btn' href='#booking-section'>
              I Want This!
            </a>
          </div>
        </div>
      ))}
    </>
  );
};

export default CarBox;
