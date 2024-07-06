import { IconMail, IconPhoneCall } from '@tabler/icons-react';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className='container'>
        <div className='footer-content'>
          <ul className='footer-content__1'>
            <li>
              <span>Easy Rent</span>
            </li>
            <li>
              We have a wide variety of vehicles to meet all your needs.
            </li>
            <li>
              <a href='tel:123456789'>
                <IconPhoneCall /> &nbsp; (123) 456-789
              </a>
            </li>

            <li>
              <a href='mailto:email@example.com'>
                <IconMail />
                &nbsp; email@example.com
              </a>
            </li>
          </ul>

          <ul className='footer-content__2'>
            <li>Company</li>
            <li>
              <a href='#home'>About Us</a>
            </li>
            <li>
              <a href='#home'>Careers</a>
            </li>
            <li>
              <a href='#home'>Accessibility</a>
            </li>
            <li>
              <a href='#home'>Blog</a>
            </li>
          </ul>

          <ul className='footer-content__2'>
            <li>Opening Hours</li>
            <li>Mon - Fri: 8:00 - 18:00</li>
            <li>Sat: 9:00 - 12:00</li>
            <li>Sun: Closed</li>
          </ul>

          <ul className='footer-content__2'>
            <li>Receive Updates</li>
            <li>
              <p>Enter your email to receive updates and promotions.</p>
            </li>
            <li>
              <input type='email' placeholder='Email Address'></input>
            </li>
            <li>
              <button className='submit-email'>Subscribe</button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
