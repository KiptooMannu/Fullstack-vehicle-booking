import AppStore from '../images/download/appstore.svg';
import PlayStore from '../images/download/googleapp.svg';

const Download: React.FC = () => {
  return (
    <section className='download-section'>
      <div className='container'>
        <div className='download-text'>
          <h2>Download the app to unlock exclusive offers!</h2>
          <p>
            Our app offers a simple and convenient way to book your vehicle. With an intuitive interface
            and flexible payment options, you can secure your rental car in just a few clicks.
          </p>
          <div className='download-text__btns'>
            <img alt='Download the app on the AppStore' src={AppStore} />
            <img alt='Download the app on the PlayStore' src={PlayStore} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Download;
