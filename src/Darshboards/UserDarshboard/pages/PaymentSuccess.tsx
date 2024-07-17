import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../scss/payment-success.scss';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/users/bookings'); // Redirect to the bookings page after a delay
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timeout); // Clear timeout if the component unmounts
  }, [navigate]);

  return (
    <div className="payment-success">
      <div className="animation">
        <div className="circle"></div>
        <div className="checkmark">
          <div className="stem"></div>
          <div className="kick"></div>
        </div>
      </div>
      <h2>Payment Successful!</h2>
      <p>Redirecting to your bookings...</p>
    </div>
  );
};

export default PaymentSuccess;
