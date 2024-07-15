import React, { useEffect, useState } from 'react';
import { useGetTransactionsQuery, TTransaction } from '../../../Features/Transactions/transactionsAPI'; // Adjust import path as needed
import styles from '../scss/TransactionsTable.module.scss';
import { TBooking } from '../../../Features/bookings/bookingAPI';

const TransactionsTable: React.FC = () => {

  const { data: transactions, error, isLoading } = useGetTransactionsQuery(undefined, {
    pollingInterval: 5000,
  });

  const [filteredTransactions, setFilteredTransactions] = useState<TTransaction[]>([]);

   useEffect(() => {
    if (transactions) {
      const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      // console.log(storedBookings);
      const bookingIds = storedBookings.map((booking: TBooking) => booking.bookingId);
      console.log(bookingIds);
      const filtered = transactions.filter((transaction: TTransaction) => bookingIds.includes(transaction.bookingId));
      setFilteredTransactions(filtered);
      console.log(filtered);
    }
  }, [transactions]);

  return (
    <div className={styles.transactionsTableContainer}>
      <h2>My Transactions</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading transactions.</p>}
      {!isLoading && !error && filteredTransactions?.length === 0 && <p>No transactions found.</p>}
      {!isLoading && !error && filteredTransactions && (
        <table className={styles.transactionsTable}>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Booking ID</th>
              <th>Amount</th>
              <th>Transaction Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction: TTransaction) => (
              <tr key={transaction.id}>
                <td>{transaction.paymentId}</td>
                <td>{transaction.bookingId}</td>
                <td>${transaction.amount}</td>
                <td>{new Date(transaction.paymentDate).toLocaleString()}</td>
                <td>{transaction.paymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionsTable;
