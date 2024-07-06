import { Footer, HeroPages, PlanTrip, BookBanner } from '../components';

import AboutMain from '../images/about/about-main.webp';
import Box1 from '../images/about/icon1.png';
import Box2 from '../images/about/icon2.png';
import Box3 from '../images/about/icon3.png';

const About: React.FC = () => {
  return (
    <>
    <h1>kavatha about</h1>
      <section className='about-page'>
        <HeroPages name='About Us' />
        <div className='container'>
          <div className='about-main'>
            <img className='about-main__img' src={AboutMain} alt='' />
            <div className='about-main__text'>
              <span>About Our Company</span>
              <h2>Reliable Cars</h2>
              <p>
                We offer a hassle-free travel experience. With a variety of well-maintained vehicles
                and affordable rates, we are here to make your next adventure memorable and
                stress-free. Book with us and start your journey today!
              </p>
              <div className='about-main__text__icons'>
                <div className='about-main__text__icons__box'>
                  <img src={Box1} alt='' />
                  <div>
                    <span>10</span>
                    <p>Models</p>
                  </div>
                </div>
                <div className='about-main__text__icons__box'>
                  <img src={Box2} alt='' />
                  <div>
                    <span>12</span>
                    <p>Rental Locations</p>
                  </div>
                </div>
                <div className='about-main__text__icons__box'>
                  <img src={Box3} alt='' />
                  <div>
                    <span>25</span>
                    <p>Workshops</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <PlanTrip />
        </div>
      </section>
      {/* book banner */}
      <BookBanner />
      {/* footer */}
      <Footer />
    </>
  );
};

export default About;
