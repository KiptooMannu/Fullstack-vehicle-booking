// src/components/UserTable.tsx
import React, { useState } from 'react';
import { useGetUsersQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } from './UsersAPI';
import { Toaster, toast } from 'sonner';
import './UserTable.scss';

interface TUser {
    id: number;
    fullname: string;
    email: string;
    phone: string;
    address: string;
}

const UserTable: React.FC = () => {
    const { data: usersData, error, isLoading, isError } = useGetUsersQuery();
    console.log(usersData);
    const [createUser] = useCreateUserMutation();
    const [updateUser] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();

    const [newUser, setNewUser] = useState<Partial<TUser>>({ fullname: '', email: '', phone: '', address: '' });

    const handleDelete = async (id: number) => {
        await deleteUser(id);
        toast.success(`User with id ${id} deleted successfully`);
    };

    const handleCreate = async () => {
        await createUser(newUser);
        setNewUser({ fullname: '', email: '', phone: '', address: '' });
        toast.success('User created successfully');
    };

    const handleUpdate = async (user: TUser) => {
        await updateUser(user);
        toast.success(`User with id ${user.id} updated successfully`);
    };

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
                <h1 className='title'>Users Data</h1>

                <div className="new-user-form">
                    <input type="text" placeholder="Fullname" value={newUser.fullname} onChange={(e) => setNewUser({ ...newUser, fullname: e.target.value })} />
                    <input type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                    <input type="text" placeholder="Phone" value={newUser.phone} onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} />
                    <input type="text" placeholder="Address" value={newUser.address} onChange={(e) => setNewUser({ ...newUser, address: e.target.value })} />
                    <button className='btn btn-success' onClick={handleCreate}>Add User</button>
                </div>

                <table className="user-table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>fullname</th>
                            <th>email</th>
                            <th>phone</th>
                            <th>address</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan={6}>Loading...</td></tr>
                        ) : isError ? (
                            <tr><td colSpan={6}>Error loading data</td></tr>
                        ) : (
                            usersData && usersData.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.id}</td>
                                    <td>
                                        <input type="text" value={user.fullname} onChange={(e) => handleUpdate({ ...user, fullname: e.target.value })} />
                                    </td>
                                    <td>
                                        <input type="text" value={user.email} onChange={(e) => handleUpdate({ ...user, email: e.target.value })} />
                                    </td>
                                    <td>
                                        <input type="text" value={user.phone} onChange={(e) => handleUpdate({ ...user, phone: e.target.value })} />
                                    </td>
                                    <td>
                                        <input type="text" value={user.address} onChange={(e) => handleUpdate({ ...user, address: e.target.value })} />
                                    </td>
                                    <td className='options'>
                                        <button className='btn btn-info' onClick={() => handleUpdate(user)}>Update</button>
                                        <button className='btn btn-warning' onClick={() => handleDelete(user.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                    <tfoot>
                        <tr><td colSpan={6}>{usersData ? `${usersData.length} records` : '0 records'}</td></tr>
                    </tfoot>
                </table>
            </div>
        </>
    );
}

export default UserTable;
