import React, { useState } from 'react';
import { useGetTransactionsQuery, useUpdateTransactionMutation, useDeleteTransactionMutation } from './transactionsAPI';
import { Toaster, toast } from 'sonner';
import './TransactionsTable.scss';

interface TTransaction {
    paymentId: number;
    bookingId: number;
    amount: number;
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

    const [editMode, setEditMode] = useState<number | null>(null);
    const [updatedTransaction, setUpdatedTransaction] = useState<TTransaction | null>(null);

    const handleDelete = async (paymentId: number) => {
        await deleteTransaction(paymentId);
        toast.success(`Transaction with id ${paymentId} deleted successfully`);
    };

    const handleEdit = (transaction: TTransaction) => {
        setEditMode(transaction.paymentId);
        setUpdatedTransaction(transaction);
    };

    const handleCancel = () => {
        setEditMode(null);
        setUpdatedTransaction(null);
    };

    const handleUpdate = async () => {
        if (updatedTransaction) {
            const { paymentId, bookingId, amount, paymentStatus, paymentDate, paymentMethod, transactionId } = updatedTransaction;
            const transactionUpdateData = { paymentId, bookingId, amount: Number(amount), paymentStatus, paymentDate, paymentMethod, transactionId };

            await updateTransaction(transactionUpdateData);
            toast.success(`Transaction with id ${paymentId} updated successfully`);
            setEditMode(null);
            setUpdatedTransaction(null);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (updatedTransaction) {
            const { name, value } = e.target;
            setUpdatedTransaction({ ...updatedTransaction, [name]: name === "amount" ? Number(value) : value });
        }
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
                                    <td>
                                        {editMode === transaction.paymentId ? (
                                            <input
                                                type="number"
                                                name="amount"
                                                value={updatedTransaction?.amount || 0}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            transaction.amount
                                        )}
                                    </td>
                                    <td>
                                        {editMode === transaction.paymentId ? (
                                            <input
                                                type="text"
                                                name="paymentStatus"
                                                value={updatedTransaction?.paymentStatus || ''}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            transaction.paymentStatus
                                        )}
                                    </td>
                                    <td>
                                        {editMode === transaction.paymentId ? (
                                            <input
                                                type="text"
                                                name="paymentMethod"
                                                value={updatedTransaction?.paymentMethod || ''}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            transaction.paymentMethod
                                        )}
                                    </td>
                                    <td>{transaction.transactionId}</td>
                                    <td className='options'>
                                        {editMode === transaction.paymentId ? (
                                            <>
                                                <button className='btn btn-success' onClick={handleUpdate}>Save</button>
                                                <button className='btn btn-secondary' onClick={handleCancel}>Cancel</button>
                                            </>
                                        ) : (
                                            <>
                                                <button className='btn btn-info' onClick={() => handleEdit(transaction)}>Edit</button>
                                                <button className='btn btn-warning' onClick={() => handleDelete(transaction.paymentId)}>Delete</button>
                                            </>
                                        )}
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
