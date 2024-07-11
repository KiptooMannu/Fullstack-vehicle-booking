
import { useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation } from './UsersAPI';
import { Toaster, toast } from 'sonner';
import './UserTable.scss';

interface TUser {
    userId: number;
    fullName: string;
    email: string;
    contactPhone: string;
    address: string;
}

const UserTable: React.FC = () => {
    const { data: usersData, isLoading, isError } = useGetUsersQuery();
    const [updateUser] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();

    const handleDelete = async (userId: number) => {
        await deleteUser(userId);
        toast.success(`User with id ${userId} deleted successfully`);
    };

    const handleUpdate = async (user: TUser) => {
        await updateUser(user);
        toast.success(`User with id ${user.userId} updated successfully`);
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
                            usersData && usersData.map((user: TUser) => (
                                <tr key={user.userId}>
                                    <td>{user.userId}</td>
                                    <td>
                                        <input type="text" value={user.fullName} onChange={(e) => handleUpdate({ ...user, fullName: e.target.value })} />
                                    </td>
                                    <td>
                                        <input type="text" value={user.email} onChange={(e) => handleUpdate({ ...user, email: e.target.value })} />
                                    </td>
                                    <td>
                                        <input type="text" value={user.contactPhone} onChange={(e) => handleUpdate({ ...user, contactPhone: e.target.value })} />
                                    </td>
                                    <td>
                                        <input type="text" value={user.address} onChange={(e) => handleUpdate({ ...user, address: e.target.value })} />
                                    </td>
                                    <td className='options'>
                                        <button className='btn btn-info' onClick={() => handleUpdate(user)}>Update</button>
                                        <button className='btn btn-warning' onClick={() => handleDelete(user.userId)}>Delete</button>
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
