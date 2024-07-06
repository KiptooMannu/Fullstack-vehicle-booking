import { IconQuote } from '@tabler/icons-react';

import User1 from '../images/testimonials/user-1.webp';
import User2 from '../images/testimonials/user-2.webp';

const Testimonials: React.FC = () => {
  return (
    <section className='testimonials-section'>
      <div className='container'>
        <div className='testimonials-content'>
          <div className='testimonials-content__title'>
            <span>100% Satisfaction</span>
            <h2>Customer Reviews</h2>
            <p>
              Discover the positive impact we've made on our clients by reading their testimonials.
              Our clients have experienced our services and results, and are eager to share their positive experiences with you.
            </p>
          </div>

          <div className='all-testimonials'>
            <div className='all-testimonials__box'>
              <span className='quotes-icon'>
                <IconQuote width={60} height={60} />
              </span>
              <p>
                "We rented a car from this site and had an amazing experience! The booking was simple and the rental rates were very affordable."
              </p>
              <div className='all-testimonials__box__name'>
                <div className='all-testimonials__box__name__profile'>
                  <img src={User1} alt='' />
                  <span>
                    <h1>João Pedro</h1>
                    <p>Recife</p>
                  </span>
                </div>
              </div>
            </div>

            <div className='all-testimonials__box box-2'>
              <span className='quotes-icon'>
                <IconQuote width={60} height={60} />
              </span>
              <p>
                "The car was in great condition and made our trip even better. Highly recommend this car rental site!"
              </p>
              <div className='all-testimonials__box__name'>
                <div className='all-testimonials__box__name__profile'>
                  <img src={User2} alt='' />
                  <span>
                    <h1>Maria Joana</h1>
                    <p>São Paulo</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
