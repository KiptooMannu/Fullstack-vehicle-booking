import React, { ChangeEvent, MouseEvent, SyntheticEvent, useState } from 'react';

import { IconInfoCircleFilled, IconX } from '@tabler/icons-react';
import { IconMapPinFilled } from '@tabler/icons-react';

import ToyotaCamry from '../images/cars/toyota-camry-hybrid.webp';
import ToyotaHilux from '../images/cars/toyota-hilux.webp';
import BmwX4 from '../images/cars/bmw-x4.webp';
import BmwX5 from '../images/cars/bmw-x5.webp';
import ChevroletOnix from '../images/cars/chevrolet-onix.webp';
import ChevroletSpin from '../images/cars/chevrolet-spin.webp';
import FiatMobi from '../images/cars/fiat-mobi.webp';
import FiatUno from '../images/cars/fiat-uno.webp';
import VolkswagenGolf from '../images/cars/volkswagen-golf.webp';
import VolkswagenBeetle from '../images/cars/volkswagen-new-beetle.webp';

interface BookCarProps {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  carType: string;
  pickUp: string;
  dropOff: string;
  pickTime: string;
  dropTime: string;
  carImg: string;
}

const BookCarModal: React.FC<BookCarProps> = ({
  modal,
  setModal,
  carType,
  pickUp,
  dropOff,
  pickTime,
  dropTime,
  carImg,
}) => {
  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [zipcode, setZipCode] = useState<string>('');

  // based on value name show car img
  let imgUrl: string;
  switch (carImg) {
    case 'Toyota Camry Hybrid':
      imgUrl = ToyotaCamry;
      break;
    case 'Toyota Hilux':
      imgUrl = ToyotaHilux;
      break;
    case 'BMW X4 M40i':
      imgUrl = BmwX4;
      break;
    case 'BMW X5 Conversivel':
      imgUrl = BmwX5;
      break;
    case 'Chevrolet Onix':
      imgUrl = ChevroletOnix;
      break;
    case 'Chevrolet Spin':
      imgUrl = ChevroletSpin;
      break;
    case 'Fiat Mobi':
      imgUrl = FiatMobi;
      break;
    case 'Fiat Uno':
      imgUrl = FiatUno;
      break;
    case 'Volkswagen Golf':
      imgUrl = VolkswagenGolf;
      break;
    case 'Volkswagen New Beetle':
      imgUrl = VolkswagenBeetle;
      break;
    default:
      imgUrl = '';
  }

  const handleName = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const handleLastName = (e: ChangeEvent<HTMLInputElement>): void => {
    setLastName(e.target.value);
  };

  const handlePhone = (e: ChangeEvent<HTMLInputElement>): void => {
    setPhone(e.target.value);
  };

  const handleAge = (e: ChangeEvent<HTMLInputElement>): void => {
    setAge(e.target.value);
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handleAddress = (e: ChangeEvent<HTMLInputElement>): void => {
    setAddress(e.target.value);
  };

  const handleCity = (e: ChangeEvent<HTMLInputElement>): void => {
    setCity(e.target.value);
  };

  const handleZip = (e: ChangeEvent<HTMLInputElement>): void => {
    setZipCode(e.target.value);
  };

  // confirm modal booking
  const confirmBooking = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setModal(!modal);

    const doneMsg = document.querySelector('.booking-done') as HTMLElement | null;
    if (doneMsg) {
      doneMsg.style.display = 'flex';
    }
  };

  const openModal = (e: SyntheticEvent): void => {
    e.preventDefault();

    const errorMsg = document.querySelector('.error-message') as HTMLElement | null;

    if (!pickUp || !dropOff || !pickTime || !dropTime || !carType) {
      if (errorMsg) {
        errorMsg.style.display = 'flex';
      }
    } else {
      setModal(!modal);

      const modalDiv = document.querySelector('.booking-modal') as HTMLElement | null;
      if (modalDiv) {
        modalDiv.scroll(0, 0);
      }

      if (errorMsg) {
        errorMsg.style.display = 'none';
      }
    }
  };

  return (
    <div className={'booking-modal active-modal'}>
      {/* title */}
      <div className='booking-modal__title'>
        <h2>Complete Booking</h2>
        <IconX onClick={openModal} />
      </div>
      {/* message */}
      <div className='booking-modal__message'>
        <h4>
          <IconInfoCircleFilled /> After completing your reservation, you will receive:
        </h4>
        <p>
          A voucher to compete for gift vouchers and cashback of up to 15% of the total value of the purchase
          rent.
        </p>
      </div>
      {/* car info */}
      <div className='booking-modal__car-info'>
        <div className='dates-div'>
          <div className='booking-modal__car-info__dates'>
            <h5>Location & Date</h5>
            <span>
              <IconMapPinFilled />
              <div>
                <h6>Booking Date & Time</h6>
                <p>
                  {pickTime} / <input type='time' className='input-time'></input>
                </p>
              </div>
            </span>
          </div>

          <div className='booking-modal__car-info__dates'>
            <span>
              <IconMapPinFilled />
              <div>
                <h6>Delivery Date & Time</h6>
                <p>
                  {dropTime} / <input type='time' className='input-time'></input>
                </p>
              </div>
            </span>
          </div>

          <div className='booking-modal__car-info__dates'>
            <span>
              <IconMapPinFilled />
              <div>
                <h6>Collection Location</h6>
                <p>{pickUp}</p>
              </div>
            </span>
          </div>

          <div className='booking-modal__car-info__dates'>
            <span>
              <IconMapPinFilled />
              <div>
                <h6>Delivery Location</h6>
                <p>{dropOff}</p>
              </div>
            </span>
          </div>
        </div>
        <div className='booking-modal__car-info__model'>
          <h5>
            <span>Car -</span> {carType}
          </h5>
          {imgUrl && <img src={imgUrl} alt='car_img' width='600' height='400' />}
        </div>
      </div>
      {/* personal info */}
      <div className='booking-modal__person-info'>
        <h4>Personal Information</h4>
        <form className='info-form'>
          <div className='info-form__2col'>
            <span>
              <label>
                First Name <b>*</b>
              </label>
              <input
                value={name}
                onChange={handleName}
                type='text'
                placeholder='Your first name'
              />
              <p className='error-modal'>Required field.</p>
            </span>

            <span>
              <label>
                Last Name <b>*</b>
              </label>
              <input
                value={lastName}
                onChange={handleLastName}
                type='text'
                placeholder='Your last name'
              />
              <p className='error-modal '>Required field.</p>
            </span>

            <span>
              <label>
                Phone <b>*</b>
              </label>
              <input
                value={phone}
                onChange={handlePhone}
                type='tel'
                placeholder='Enter your phone number'
              />
              <p className='error-modal'>Required field.</p>
            </span>

            <span>
              <label>
                Age <b>*</b>
              </label>
              <input
                value={age}
                onChange={handleAge}
                type='number'
                placeholder='18'
                min='18'
                max='100'
              />
              <p className='error-modal'>Required field.</p>
            </span>
          </div>

          <div className='info-form__1col'>
            <span>
              <label>
                Email <b>*</b>
              </label>
              <input
                value={email}
                onChange={handleEmail}
                type='email'
                placeholder='Your email address'
              />
              <p className='error-modal'>Required field.</p>
            </span>

            <span>
              <label>
                Address <b>*</b>
              </label>
              <input
                value={address}
                onChange={handleAddress}
                type='text'
                placeholder='Example street number 123'
              />
              <p className='error-modal'>Required field.</p>
            </span>
          </div>

          <div className='info-form__2col'>
            <span>
              <label>
                City <b>*</b>
              </label>
              <input value={city} onChange={handleCity} type='text' placeholder='City' />
              <p className='error-modal'>Required field.</p>
            </span>

            <span>
              <label>
                Zip Code <b>*</b>
              </label>
              <input
                value={zipcode}
                onChange={handleZip}
                type='text'
                placeholder='00000-000'
              />
              <p className='error-modal'>Required field.</p>
            </span>
          </div>

          <span className='info-form__checkbox'>
            <input type='checkbox' />
            <p>Send me promotions and news by email</p>
          </span>

          <div className='reserve-button'>
            <button onClick={confirmBooking}>Book Now</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookCarModal;
