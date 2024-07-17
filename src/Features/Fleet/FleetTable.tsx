import React, { useState } from 'react';
import { useGetFleetManagementQuery, useCreateFleetManagementMutation, useUpdateFleetManagementMutation, useDeleteFleetManagementMutation } from './fleetManagementAPI';
import { Toaster, toast } from 'sonner';
import './FleetTable.scss';

interface TFleetManagement {
    fleetId: number;
    vehicleId: number;
    acquisitionDate: string;
    depreciationRate: number;
    currentValue: number;
    maintenanceCost: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}

const FleetManagementTable: React.FC = () => {
    const { data: fleetManagementData, isLoading, isError } = useGetFleetManagementQuery();
    const [createFleetManagement] = useCreateFleetManagementMutation();
    const [updateFleetManagement] = useUpdateFleetManagementMutation();
    const [deleteFleetManagement] = useDeleteFleetManagementMutation();

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    // State to hold the current editable fleet item
    const [editableFleet, setEditableFleet] = useState<TFleetManagement | null>(null);
    // State to hold the new fleet item
    const [newFleet, setNewFleet] = useState<Partial<TFleetManagement> | null>(null);

    const handleDelete = async (fleetId: number) => {
        try {
            await deleteFleetManagement(fleetId).unwrap();
            toast.success(`Fleet Management record with id ${fleetId} deleted successfully`);
        } catch (error) {
            toast.error('Error deleting fleet management record');
        }
    };

    const handleUpdate = async (fleet: TFleetManagement) => {
        const { createdAt, updatedAt, acquisitionDate, ...updatePayload } = fleet;
        try {
            await updateFleetManagement(updatePayload).unwrap();
            toast.success(`Fleet Management record with id ${fleet.fleetId} updated successfully`);
            setEditableFleet(null); // Reset editable fleet state after update
        } catch (error) {
            toast.error('Error updating fleet management record');
        }
    };

    const handleCreate = async () => {
        if (newFleet) {
            const formattedFleet = {
                ...newFleet,
                vehicleId: Number(newFleet.vehicleId),
                acquisitionDate: new Date(newFleet.acquisitionDate || '').toISOString(),
                depreciationRate: Number(newFleet.depreciationRate),
                currentValue: Number(newFleet.currentValue),
                maintenanceCost: Number(newFleet.maintenanceCost),
            };
            try {
                await createFleetManagement(formattedFleet).unwrap();
                toast.success('Fleet Management record created successfully');
                setNewFleet(null); // Reset new fleet state after creation
            } catch (error) {
                toast.error('Error creating fleet management record');
            }
        }
    };

    const handleEditClick = (fleet: TFleetManagement) => {
        setEditableFleet(fleet); // Set the fleet item to be edited
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof TFleetManagement) => {
        if (editableFleet) {
            const updatedFleet: TFleetManagement = { ...editableFleet, [key]: e.target.value };
            setEditableFleet(updatedFleet);
        } else if (newFleet) {
            const updatedFleet: Partial<TFleetManagement> = { ...newFleet, [key]: e.target.value };
            setNewFleet(updatedFleet);
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

                <button className="btn btn-primary" onClick={() => setNewFleet({})}>Add New Fleet</button>

                {newFleet && (
                    <div className="fleet-form">
                        <h2>Add New Fleet</h2>
                        <input type="text" placeholder="Vehicle ID" value={newFleet.vehicleId || ''} onChange={(e) => handleInputChange(e, 'vehicleId')} />
                        <input type="text" placeholder="Acquisition Date" value={newFleet.acquisitionDate || ''} onChange={(e) => handleInputChange(e, 'acquisitionDate')} />
                        <input type="text" placeholder="Depreciation Rate" value={newFleet.depreciationRate || ''} onChange={(e) => handleInputChange(e, 'depreciationRate')} />
                        <input type="text" placeholder="Current Value" value={newFleet.currentValue || ''} onChange={(e) => handleInputChange(e, 'currentValue')} />
                        <input type="text" placeholder="Maintenance Cost" value={newFleet.maintenanceCost || ''} onChange={(e) => handleInputChange(e, 'maintenanceCost')} />
                        <input type="text" placeholder="Status" value={newFleet.status || ''} onChange={(e) => handleInputChange(e, 'status')} />
                        <button className="btn btn-success" onClick={handleCreate}>Create</button>
                        <button className="btn btn-secondary" onClick={() => setNewFleet(null)}>Cancel</button>
                    </div>
                )}

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
