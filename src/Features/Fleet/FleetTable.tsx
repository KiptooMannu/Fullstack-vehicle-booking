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
    const { data: fleetManagementData,  isLoading, isError } = useGetFleetManagementQuery();
    const [updateFleetManagement] = useUpdateFleetManagementMutation();
    const [deleteFleetManagement] = useDeleteFleetManagementMutation();

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    const handleDelete = async (fleetId: number) => {
        await deleteFleetManagement(fleetId);
        toast.success(`Fleet Management record with id ${fleetId} deleted successfully`);
    };

    const handleUpdate = async (fleet: TFleetManagement) => {
        await updateFleetManagement(fleet);
        toast.success(`Fleet Management record with id ${fleet.fleetId} updated successfully`);
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
                                        <input type="text" value={fleet.depreciationRate} onChange={(e) => handleUpdate({ ...fleet, depreciationRate: e.target.value })} />
                                    </td>
                                    <td>
                                        <input type="text" value={fleet.currentValue} onChange={(e) => handleUpdate({ ...fleet, currentValue: e.target.value })} />
                                    </td>
                                    <td>
                                        <input type="text" value={fleet.maintenanceCost} onChange={(e) => handleUpdate({ ...fleet, maintenanceCost: e.target.value })} />
                                    </td>
                                    <td>
                                        <input type="text" value={fleet.status} onChange={(e) => handleUpdate({ ...fleet, status: e.target.value })} />
                                    </td>
                                    <td className='options'>
                                        <button className='btn btn-info' onClick={() => handleUpdate(fleet)}>Update</button>
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
