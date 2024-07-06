import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { IconChevronRight, IconCircleCheck } from '@tabler/icons-react';

import BgShape from '../images/hero/hero-bg.png';
import HeroCar from '../images/hero/hero-image.webp';

const Hero: React.FC = () => {
  const [goUp, setGoUp] = useState<boolean>(false);

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const bookBtn = (): void => {
    const bookingSection = document.querySelector<HTMLElement>('#booking-section');

    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const onPageScroll = () => {
      if (window.pageYOffset > 600) {
        setGoUp(true);
      } else {
        setGoUp(false);
      }
    };
    window.addEventListener('scroll', onPageScroll);

    return () => {
      window.removeEventListener('scroll', onPageScroll);
    };
  }, []);

  return (
    <section id='home' className='hero-section'>
      <div className='container'>
        <img className='bg-shape' src={BgShape} alt='' />
        <div className='hero-content'>
          <div className='hero-content__text'>
            <h4>The best prices and conditions</h4>
            <h1>
              Book your car at <span>Rent Easy</span>.
            </h1>
            <p>
              We offer a diverse fleet, from economy to luxury SUVs. Your journey starts here - book now and explore the world at your own pace.
            </p>
            <div className='hero-content__text__btns'>
              <Link onClick={bookBtn} className='hero-content__text__btns__book-ride' to='/'>
                Rent Now &nbsp; <IconCircleCheck />
              </Link>
              <Link className='hero-content__text__btns__learn-more' to='/about'>
                Learn More &nbsp; <IconChevronRight />
              </Link>
            </div>
          </div>

          {/* right side img */}
          <img
            src={HeroCar}
            alt='blue Fiat Onix car'
            className='hero-content__car-img'
          />
        </div>
      </div>

      {/* page up */}
      <div onClick={scrollToTop} className={`scroll-up ${goUp ? 'show-scroll' : ''}`}>
        ^
      </div>
    </section>
  );
};

export default Hero;
