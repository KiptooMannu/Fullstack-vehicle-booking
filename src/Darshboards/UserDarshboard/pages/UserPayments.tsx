import React from 'react';
import { useGetTransactionsQuery, TTransaction } from '../../../Features/Transactions/transactionsAPI'; // Adjust import path as needed
import styles from '../scss/TransactionsTable.module.scss';

const TransactionsTable: React.FC = () => {
  const bookingIds = JSON.parse(localStorage.getItem('bookingIds') || '[]');
  const { data: transactions, error, isLoading } = useGetTransactionsQuery(); // Fetch all transactions

  // Filter transactions to only include those that match the booking IDs in local storage
  const filteredTransactions = transactions?.filter(transaction => bookingIds.includes(transaction.id));

  return (
    <div className={styles.transactionsContainer}>
      <h2>My Transactions</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading transactions.</p>}
      {!isLoading && !error && filteredTransactions?.length === 0 && <p>No transactions found.</p>}
      {!isLoading && !error && filteredTransactions && (
        <table className={styles.transactionsTable}>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Transaction Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction: TTransaction) => (
              <tr key={transaction.id} className={styles.transactionRow}>
                <td>{transaction.id}</td>
                <td>${transaction.amount}</td>
                <td>{new Date(transaction.transactionDate).toLocaleString()}</td>
                <td>{transaction.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionsTable;
