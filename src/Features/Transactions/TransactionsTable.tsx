import React, { useState } from 'react';
import { useGetTransactionsQuery, useUpdateTransactionMutation, useDeleteTransactionMutation } from './transactionsAPI';
import { Toaster, toast } from 'sonner';
import './TransactionsTable.scss';

interface TTransaction {
    paymentId: number;
    bookingId: number;
    amount: string;
    paymentStatus: string;
    paymentDate: string;
    paymentMethod: string | null;
    transactionId: string;
    createdAt: string;
    updatedAt: string;
}

const TransactionTable: React.FC = () => {
    const { data: transactionsData, isLoading, isError } = useGetTransactionsQuery();
    const [updateTransaction] = useUpdateTransactionMutation();
    const [deleteTransaction] = useDeleteTransactionMutation();

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    const handleDelete = async (paymentId: number) => {
        await deleteTransaction(paymentId);
        toast.success(`Transaction with id ${paymentId} deleted successfully`);
    };

    const handleUpdate = async (transaction: TTransaction) => {
        await updateTransaction(transaction);
        toast.success(`Transaction with id ${transaction.paymentId} updated successfully`);
    };

    const totalPages = transactionsData ? Math.ceil(transactionsData.length / recordsPerPage) : 0;
    const paginatedData = transactionsData ? transactionsData.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage) : [];

    return (
        <>
            <Toaster
                toastOptions={{
                    classNames: {
                        error: 'error-toast',
                        success: 'success-toast',
                        warning: 'warning-toast',
                        info: 'info-toast',
                    },
                }}
            />
            <div className="transaction-table-container">
                <h1 className='title'>Transactions Data</h1>

                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th>Payment Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Payment Method</th>
                            <th>Transaction ID</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan={6}>Loading...</td></tr>
                        ) : isError ? (
                            <tr><td colSpan={6}>Error loading data</td></tr>
                        ) : (
                            paginatedData && paginatedData.map((transaction: TTransaction) => (
                                <tr key={transaction.paymentId}>
                                    <td>{new Date(transaction.paymentDate).toLocaleDateString()}</td>
                                    <td>{transaction.amount}</td>
                                    <td>
                                        <input type="text" value={transaction.paymentStatus} onChange={(e) => handleUpdate({ ...transaction, paymentStatus: e.target.value })} />
                                    </td>
                                    <td>
                                        <input type="text" value={transaction.paymentMethod || ''} onChange={(e) => handleUpdate({ ...transaction, paymentMethod: e.target.value })} />
                                    </td>
                                    <td>{transaction.transactionId}</td>
                                    <td className='options'>
                                        <button className='btn btn-info' onClick={() => handleUpdate(transaction)}>Update</button>
                                        <button className='btn btn-warning' onClick={() => handleDelete(transaction.paymentId)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                    <tfoot>
                        <tr><td colSpan={6}>{transactionsData ? `${transactionsData.length} records` : '0 records'}</td></tr>
                    </tfoot>
                </table>
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button key={page} className={`page-btn ${page === currentPage ? 'active' : ''}`} onClick={() => setCurrentPage(page)}>
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}

export default TransactionTable;
