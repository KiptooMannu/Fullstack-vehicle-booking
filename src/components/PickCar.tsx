import { useState } from 'react';
import { CarBox } from '../components';
import { CAR_DATA } from './CarData';

const PickCar: React.FC = () => {
  const [active, setActive] = useState<string>('FirstCar');
  const [colorBtn, setColorBtn] = useState<string>('btn1');

  const btnID = (id: any): void => {
    setColorBtn(colorBtn === id ? '' : id);
  };

  const coloringButton = (id: any) => {
    return colorBtn === id ? 'colored-button' : '';
  };

  return (
    <section className='pick-section'>
      <div className='container'>
        <div className='pick-container'>
          <div className='pick-container__title'>
            <h3>Check out the main models</h3>
            <h2>Modern and reliable</h2>
            <p>
              Choose from the variety of amazing vehicles we have available for rent on your next adventure or business trip.
            </p>
          </div>
          <div className='pick-container__car-content'>
            {/* pick car */}
            <div className='pick-box'>
              <button
                className={`${coloringButton('btn1')}`}
                id='btn1'
                onClick={() => {
                  setActive('FirstCar');
                  btnID('btn1');
                }}>
                Toyota Camry Hybrid
              </button>
              <button
                className={`${coloringButton('btn2')}`}
                id='btn2'
                onClick={() => {
                  setActive('SecondCar');
                  btnID('btn2');
                }}>
                Toyota Hilux
              </button>
              <button
                className={`${coloringButton('btn3')}`}
                id='btn3'
                onClick={() => {
                  setActive('ThirdCar');
                  btnID('btn3');
                }}>
                BMW X4 M40i
              </button>
              <button
                className={`${coloringButton('btn4')}`}
                id='btn4'
                onClick={() => {
                  setActive('FourthCar');
                  btnID('btn4');
                }}>
                BMW X5 Convertible
              </button>
              <button
                className={`${coloringButton('btn5')}`}
                id='btn5'
                onClick={() => {
                  setActive('FifthCar');
                  btnID('btn5');
                }}>
                Chevrolet Onix
              </button>
              <button
                className={`${coloringButton('btn6')}`}
                id='btn6'
                onClick={() => {
                  setActive('SixthCar');
                  btnID('btn6');
                }}>
                Chevrolet Spin
              </button>
            </div>

            {active === 'FirstCar' && <CarBox data={CAR_DATA} carID={0} />}
            {active === 'SecondCar' && <CarBox data={CAR_DATA} carID={1} />}
            {active === 'ThirdCar' && <CarBox data={CAR_DATA} carID={2} />}
            {active === 'FourthCar' && <CarBox data={CAR_DATA} carID={3} />}
            {active === 'FifthCar' && <CarBox data={CAR_DATA} carID={4} />}
            {active === 'SixthCar' && <CarBox data={CAR_DATA} carID={5} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PickCar;
