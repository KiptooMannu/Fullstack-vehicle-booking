import { useGetUsersQuery, } from "./UsersAPI"
import { useDeleteUserMutation } from './UsersAPI'
import { Toaster, toast } from 'sonner'
function UserTable() {

    const { data: usersData, error, isLoading, isError } = useGetUsersQuery({ pollingInterval: 3000, skipPollingIfUnfocused: true, })

    const [deleteUser, { isLoading: isDeleting, data: deletemsg }] = useDeleteUserMutation()

    const handleDelete = async (id: number) => {
        await deleteUser(id)
        toast.success(deletemsg.msg)

    }
    console.log(deletemsg)

    return (
        <>
            <Toaster
                toastOptions={{
                    classNames: {
                        error: 'bg-red-400',
                        success: 'text-green-400',
                        warning: 'text-yellow-400',
                        info: 'bg-blue-400',
                    },
                }} />
            <div className="overflow-x-auto text-base-content bg-gray-800 rounded-lg p-4">
                <h1 className='text-xl my-4'>Users Data</h1>

                <table className="table table-xs">
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
                        {
                            isLoading ? (<tr><td colSpan={6}>Loading...</td></tr>) : (
                                isError ? (
                                    error.data.length == 0 && (
                                        <tr><td colSpan={6}>No Data</td></tr>
                                    )
                                ) : (

                                    usersData && usersData.map((user, index) => (
                                        <tr key={index}>
                                            <th>{user.id}</th>
                                            <td>{user.fullname}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.address}</td>
                                            <td className='flex gap-2'>
                                                <button className='btn btn-sm btn-outline btn-info'>update</button>
                                                <button className='btn btn-sm btn-outline btn-warning' onClick={() => handleDelete(user.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                )

                            )
                        }
                    </tbody>
                    <tfoot>
                        <tr><td colSpan={6}>{usersData ? `${usersData.length} records` : '0 records'}</td></tr> {/* Dynamic record count */}
                    </tfoot>
                </table>
            </div>
        </>

    )
}

export default UserTable