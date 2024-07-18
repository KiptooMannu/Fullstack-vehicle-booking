import React, { useState } from 'react';
import { 
  useGetBranchesQuery, 
  useCreateBranchMutation, 
  useUpdateBranchMutation, 
  useDeleteBranchMutation, 
  TBranch 
} from './BranchesAPI';
import { Toaster, toast } from 'sonner';
import styles from './BranchesTable.module.scss';

const BranchesTable: React.FC = () => {
  const { data: branches, error, isLoading } = useGetBranchesQuery();
  const [createBranch] = useCreateBranchMutation();
  const [updateBranch] = useUpdateBranchMutation();
  const [deleteBranch] = useDeleteBranchMutation();

  const [newBranch, setNewBranch] = useState<Partial<TBranch> | null>(null);
  const [editingBranch, setEditingBranch] = useState<Partial<TBranch> | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const branchesPerPage = 5;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editingBranch) {
      setEditingBranch(prevState => ({ ...prevState, [name]: value }));
    } else if (newBranch) {
      setNewBranch(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleCreateBranch = async () => {
    if (newBranch) {
      try {
        await createBranch(newBranch).unwrap();
        setNewBranch(null);
        toast.success('Branch created successfully', { style: { background: 'green', color: 'white' } });
      } catch (error) {
        console.error('Error creating branch:', error);
        toast.error('Error creating branch', { style: { background: 'red', color: 'white' } });
      }
    }
  };

  const handleUpdateBranch = async (branch: Partial<TBranch>) => {
    const { createdAt, updatedAt, ...branchToUpdate } = branch; // Exclude dates
    try {
      await updateBranch(branchToUpdate).unwrap();
      setEditingBranch(null);
      toast.success('Branch updated successfully', { style: { background: 'green', color: 'white' } });
    } catch (error) {
      console.error('Error updating branch:', error);
      toast.error('Error updating branch', { style: { background: 'red', color: 'white' } });
    }
  };

  const handleDeleteBranch = async (branchId: number) => {
    try {
      await deleteBranch(branchId).unwrap();
      toast.success('Branch deleted successfully', { style: { background: 'green', color: 'white' } });
    } catch (error) {
      console.error('Error deleting branch:', error);
      toast.error('Error deleting branch', { style: { background: 'red', color: 'white' } });
    }
  };

  // Pagination logic
  const indexOfLastBranch = currentPage * branchesPerPage;
  const indexOfFirstBranch = indexOfLastBranch - branchesPerPage;
  const currentBranches = branches?.slice(indexOfFirstBranch, indexOfLastBranch) || [];

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className={styles.branchesTableContainer}>
      <Toaster position="top-right" />
      <h2>Branches</h2>
      {(editingBranch || newBranch) && (
        <div className={styles.formContainer}>
          <h3>{editingBranch ? 'Edit Branch' : 'Create New Branch'}</h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={editingBranch ? editingBranch.name : newBranch?.name || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={editingBranch ? editingBranch.address : newBranch?.address || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="contactPhone"
            placeholder="Contact Phone"
            value={editingBranch ? editingBranch.contactPhone : newBranch?.contactPhone || ''}
            onChange={handleInputChange}
          />
          <button onClick={editingBranch ? () => handleUpdateBranch(editingBranch as TBranch) : handleCreateBranch}>
            {editingBranch ? 'Update Branch' : 'Create Branch'}
          </button>
          {editingBranch && <button onClick={() => setEditingBranch(null)}>Cancel</button>}
          {newBranch && <button onClick={() => setNewBranch(null)}>Cancel</button>}
        </div>
      )}
      {!isLoading && !error && !editingBranch && !newBranch && (
        <button className={styles.addButton} onClick={() => setNewBranch({})}>Add New Branch</button>
      )}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading branches.</p>}
      {!isLoading && !error && branches?.length === 0 && <p>No branches found.</p>}
      {!isLoading && !error && currentBranches.length > 0 && (
        <>
          <table className={styles.branchesTable}>
            <thead>
              <tr>
                <th>Branch ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Contact Phone</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBranches.map((branch: TBranch, index: number) => (
                <tr key={branch.branchId} className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                  <td>{branch.branchId}</td>
                  <td>{branch.name}</td>
                  <td>{branch.address}</td>
                  <td>{branch.contactPhone}</td>
                  <td>{new Date(branch.createdAt).toLocaleString()}</td>
                  <td>{new Date(branch.updatedAt).toLocaleString()}</td>
                  <td>
                    <button className={styles.editButton} onClick={() => setEditingBranch(branch)}>Edit</button>
                    <button className={styles.deleteButton} onClick={() => handleDeleteBranch(branch.branchId)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.pagination}>
            {Array.from({ length: Math.ceil((branches?.length || 0) / branchesPerPage) }, (_, index) => (
              <button key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? styles.activePage : ''}>
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BranchesTable;
