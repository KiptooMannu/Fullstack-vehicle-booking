import React from 'react';
import { useGetTransactionsQuery, TTransaction } from '../../../Features/Transactions/transactionsAPI'; // Adjust import path as needed
import styles from '../scss/TransactionsTable.module.scss';

const TransactionsTable: React.FC = () => {
  // Retrieve the current user from local storage
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user.user.userId;
  // console.log(userId);

  // Fetch transactions from the API
  const { data: transactions, error, isLoading } = useGetTransactionsQuery(undefined, {
    pollingInterval: 1000,
  });

  // Filter transactions based on the user ID
  const filteredTransactions = transactions?.filter((transaction: TTransaction) => {
    // console.log('User from',transaction.booking?.user?.userId)
    return transaction.booking?.user?.userId === userId;
  });

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
              <tr key={transaction.paymentId}>
                <td>{transaction.transactionId}</td>
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
