import MainImg from '../images/chooseUs/main.webp';
import Box1 from '../images/chooseUs/icon1.png';
import Box2 from '../images/chooseUs/icon2.png';
import Box3 from '../images/chooseUs/icon3.png';

import { IconChevronRight } from '@tabler/icons-react';

const ChooseUs: React.FC = () => {
  return (
    <section className='choose-section'>
      <div className='container'>
        <div className='choose-container'>
          <img className='choose-container__img' src={MainImg} alt='three cars' />
          <div className='text-container'>
            <div className='text-container__left'>
              <span>Why We Are the Best</span>
              <h2>The best cars at the best price you've ever seen!</h2>
              <p>
                Explore incredible opportunities with our irresistible offers. Our commitment is to
                ensure the best value for you, allowing you to enjoy high-quality products and
                services without compromising your finances. Don't miss the chance to save while
                experiencing exceptional rental service.
              </p>
              <a href='#home'>
                Learn More &nbsp;
                <IconChevronRight />
              </a>
            </div>
            {/* advantages list */}
            <div className='text-container__right'>
              <div className='text-container__right__box'>
                <div className='text-container__right__box__img-container'>
                  <img src={Box1} alt='' />
                </div>
                <div className='text-container__right__box__text'>
                  <span>Car Adventure Across Brazil</span>
                  <p>
                    Elevate your driving journey to a new level with our quality vehicles for your
                    adventures across the country.
                  </p>
                </div>
              </div>
              <div className='text-container__right__box'>
                <div className='text-container__right__box__img-container'>
                  <img src={Box2} alt='' />
                </div>
                <div className='text-container__right__box__text'>
                  <span>Transparent Prices</span>
                  <p>
                    Have everything you need in one place, with our transparent pricing policy and
                    no surprises.
                  </p>
                </div>
              </div>
              <div className='text-container__right__box'>
                <div className='text-container__right__box__img-container'>
                  <img src={Box3} alt='' />
                </div>
                <div className='text-container__right__box__text'>
                  <span>No Hidden Costs</span>
                  <p>
                    Enjoy the peace of mind knowing there are no hidden costs. Here, we value
                    transparency and honesty at every stage of your journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;
