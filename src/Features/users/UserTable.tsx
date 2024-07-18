import React, { useState } from 'react';
import { useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation } from './UsersAPI';
import { Toaster, toast } from 'sonner';
import './UserTable.scss';

interface TUser {
    userId: number;
    fullName: string;
    email: string;
    contactPhone: string;
    address: string;
    role: string;
    createdAt?: string;
    updatedAt?: string;
}

const UserTable: React.FC = () => {
    const { data: usersData, isLoading, isError } = useGetUsersQuery();
    const [updateUser] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    const [editMode, setEditMode] = useState<number | null>(null);
    const [updatedUser, setUpdatedUser] = useState<TUser | null>(null);

    const handleDelete = async (userId: number) => {
        try {
            await deleteUser(userId);
            toast.success(`User with id ${userId} deleted successfully`);
        } catch (error) {
            toast.error(`Failed to delete user with id ${userId}`);
        }
    };

    const handleEdit = (user: TUser) => {
        setEditMode(user.userId);
        setUpdatedUser(user);
    };

    const handleCancel = () => {
        setEditMode(null);
        setUpdatedUser(null);
    };

    const handleUpdate = async () => {
        if (updatedUser) {
            const { fullName, contactPhone, address, userId, email } = updatedUser;
            const userUpdateData = { fullName, contactPhone, address, email, userId };

            try {
                await updateUser(userUpdateData).unwrap();
                toast.success(`User with id ${updatedUser.userId} updated successfully`);
                setEditMode(null);
                setUpdatedUser(null);
            } catch (error) {
                toast.error(`Failed to update user with id ${updatedUser.userId}`);
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (updatedUser) {
            const { name, value } = e.target;
            setUpdatedUser({ ...updatedUser, [name]: value });
        }
    };

    const totalPages = usersData ? Math.ceil(usersData.length / recordsPerPage) : 0;
    const paginatedData = usersData ? usersData.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage) : [];

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
            <div className="user-table-container">
                <h1 className="title">Users Data</h1>
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan={6}>Loading...</td></tr>
                        ) : isError ? (
                            <tr><td colSpan={6}>Error loading data</td></tr>
                        ) : (
                            paginatedData.map((user: TUser) => (
                                <tr key={user.userId}>
                                    <td>{user.userId}</td>
                                    <td>
                                        {editMode === user.userId ? (
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={updatedUser?.fullName || ''}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            user.fullName
                                        )}
                                    </td>
                                    <td>{user.email}</td>
                                    <td>
                                        {editMode === user.userId ? (
                                            <input
                                                type="text"
                                                name="contactPhone"
                                                value={updatedUser?.contactPhone || ''}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            user.contactPhone
                                        )}
                                    </td>
                                    <td>
                                        {editMode === user.userId ? (
                                            <input
                                                type="text"
                                                name="address"
                                                value={updatedUser?.address || ''}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            user.address
                                        )}
                                    </td>
                                    <td className="options">
                                        {editMode === user.userId ? (
                                            <>
                                                <button className="btn btn-success" onClick={handleUpdate}>Save</button>
                                                <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                                            </>
                                        ) : (
                                            <>
                                                <button className="btn btn-info" onClick={() => handleEdit(user)}>Edit</button>
                                                <button className="btn btn-warning" onClick={() => handleDelete(user.userId)}>Delete</button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                    <tfoot>
                        <tr><td colSpan={6}>{usersData ? `${usersData.length} records` : '0 records'}</td></tr>
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
};

export default UserTable;
