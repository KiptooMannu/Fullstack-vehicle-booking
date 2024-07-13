import React, { useState } from 'react';
import { useGetFleetManagementQuery, useUpdateFleetManagementMutation, useDeleteFleetManagementMutation } from './fleetManagementAPI';
import { Toaster, toast } from 'sonner';
import './FleetTable.scss';

interface TFleetManagement {
    fleetId: number;
    vehicleId: number;
    acquisitionDate: string;
    depreciationRate: string;
    currentValue: string;
    maintenanceCost: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

const FleetManagementTable: React.FC = () => {
    const { data: fleetManagementData, isLoading, isError } = useGetFleetManagementQuery();
    const [updateFleetManagement] = useUpdateFleetManagementMutation();
    const [deleteFleetManagement] = useDeleteFleetManagementMutation();

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    // State to hold the current editable fleet item
    const [editableFleet, setEditableFleet] = useState<TFleetManagement | null>(null);

    const handleDelete = async (fleetId: number) => {
        await deleteFleetManagement(fleetId);
        toast.success(`Fleet Management record with id ${fleetId} deleted successfully`);
    };

    const handleUpdate = async (fleet: TFleetManagement) => {
        await updateFleetManagement(fleet);
        toast.success(`Fleet Management record with id ${fleet.fleetId} updated successfully`);
        setEditableFleet(null); // Reset editable fleet state after update
    };

    const handleEditClick = (fleet: TFleetManagement) => {
        setEditableFleet(fleet); // Set the fleet item to be edited
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof TFleetManagement) => {
        if (editableFleet) {
            const updatedFleet: TFleetManagement = { ...editableFleet, [key]: e.target.value };
            setEditableFleet(updatedFleet);
        }
    };

    const totalPages = fleetManagementData ? Math.ceil(fleetManagementData.length / recordsPerPage) : 0;
    const paginatedData = fleetManagementData ? fleetManagementData.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage) : [];

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
            <div className="fleet-management-table-container">
                <h1 className='title'>Fleet Management Data</h1>

                <table className="fleet-management-table">
                    <thead>
                        <tr>
                            <th>Vehicle ID</th>
                            <th>Acquisition Date</th>
                            <th>Depreciation Rate</th>
                            <th>Current Value</th>
                            <th>Maintenance Cost</th>
                            <th>Status</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan={7}>Loading...</td></tr>
                        ) : isError ? (
                            <tr><td colSpan={7}>Error loading data</td></tr>
                        ) : (
                            paginatedData && paginatedData.map((fleet: TFleetManagement) => (
                                <tr key={fleet.fleetId}>
                                    <td>{fleet.vehicleId}</td>
                                    <td>{new Date(fleet.acquisitionDate).toLocaleDateString()}</td>
                                    <td>
                                        {editableFleet?.fleetId === fleet.fleetId ? (
                                            <input
                                                type="text"
                                                value={editableFleet.depreciationRate}
                                                onChange={(e) => handleInputChange(e, 'depreciationRate')}
                                            />
                                        ) : (
                                            fleet.depreciationRate
                                        )}
                                    </td>
                                    <td>
                                        {editableFleet?.fleetId === fleet.fleetId ? (
                                            <input
                                                type="text"
                                                value={editableFleet.currentValue}
                                                onChange={(e) => handleInputChange(e, 'currentValue')}
                                            />
                                        ) : (
                                            fleet.currentValue
                                        )}
                                    </td>
                                    <td>
                                        {editableFleet?.fleetId === fleet.fleetId ? (
                                            <input
                                                type="text"
                                                value={editableFleet.maintenanceCost}
                                                onChange={(e) => handleInputChange(e, 'maintenanceCost')}
                                            />
                                        ) : (
                                            fleet.maintenanceCost
                                        )}
                                    </td>
                                    <td>
                                        {editableFleet?.fleetId === fleet.fleetId ? (
                                            <input
                                                type="text"
                                                value={editableFleet.status}
                                                onChange={(e) => handleInputChange(e, 'status')}
                                            />
                                        ) : (
                                            fleet.status
                                        )}
                                    </td>
                                    <td className='options'>
                                        {editableFleet?.fleetId === fleet.fleetId ? (
                                            <>
                                                <button className='btn btn-success' onClick={() => handleUpdate(editableFleet)}>Save</button>
                                                <button className='btn btn-secondary' onClick={() => setEditableFleet(null)}>Cancel</button>
                                            </>
                                        ) : (
                                            <button className='btn btn-info' onClick={() => handleEditClick(fleet)}>Edit</button>
                                        )}
                                        <button className='btn btn-warning' onClick={() => handleDelete(fleet.fleetId)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                    <tfoot>
                        <tr><td colSpan={7}>{fleetManagementData ? `${fleetManagementData.length} records` : '0 records'}</td></tr>
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

export default FleetManagementTable;
