import SelectCar from '../images/plan/select-car.png';
import Contact from '../images/plan/contact.png';
import Drive from '../images/plan/drive.png';

const PlanTrip: React.FC = () => {
  return (
    <section className='plan-section'>
      <div className='container'>
        <div className='plan-container'>
          <div className='plan-container__title'>
            <h3>Rent quickly and hassle-free</h3>
            <h2>How does it work?</h2>
          </div>

          <div className='plan-container__boxes'>
            <div className='plan-container__boxes__box'>
              <img src={SelectCar} alt='' width='117' />
              <h3>Choose a car</h3>
              <p>
                We offer a wide variety of vehicles for all your driving needs. We have the perfect car to meet your needs.
              </p>
            </div>

            <div className='plan-container__boxes__box'>
              <img src={Contact} alt='' width='52' />
              <h3>Fill out the form</h3>
              <p>Our team will contact you to confirm your order.</p>
            </div>

            <div className='plan-container__boxes__box'>
              <img src={Drive} alt='' width='44' />
              <h3>Drive away!</h3>
              <p>
                Now you can set off and enjoy the comfort of your trip. We have what you need with our wide variety of cars.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanTrip;
