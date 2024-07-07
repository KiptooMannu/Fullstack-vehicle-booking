import { HeroPages, Footer, Navbar } from '../components';

import { IconMail, IconMailOpened, IconPhone, IconLocation } from '@tabler/icons-react';

const Contact: React.FC = () => {
  return (
    <>
    <Navbar />
    <section className='contact-page'>
      <HeroPages name='Contact' />
      <div className='container'>
        <div className='contact-div'>
          <div className='contact-div__text'>
            <h2>Contact Us</h2>
            <p>
              We are here to make your car rental easy and convenient. Contact us for reservations,
              assistance, or any questions you may have. Our dedicated team is ready to help!
            </p>
            <a href='/'>
              <IconPhone /> &nbsp; (123) 456-7869
            </a>
            <a href='/'>
              <IconMail /> &nbsp; email@example.com
            </a>
            <a href='/'>
              <IconLocation />
              &nbsp; São Paulo, SP
            </a>
          </div>
          <div className='contact-div__form'>
            <form>
              <label>
                Full Name <b>*</b>
              </label>
              <input type='text' placeholder='Full Name'></input>

              <label>
                Email Address <b>*</b>
              </label>
              <input type='email' placeholder='youremail@example.com'></input>

              <label>
                Your Message <b>*</b>
              </label>
              <textarea placeholder='Write your question here...'></textarea>

              <button type='submit'>
                <IconMailOpened />
                &nbsp; Send
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* footer */}
      <Footer />
    </section>
    </>
  );
};

export default Contact;
