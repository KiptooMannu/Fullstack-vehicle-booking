import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/user/bookings'); // Redirect to the bookings page after a delay
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timeout); // Clear timeout if the component unmounts
  }, [navigate]);

  return (
    <div>
      <h2>Payment Successful!</h2>
      <p>Redirecting to your bookings...</p>
    </div>
  );
};

export default PaymentSuccess;
