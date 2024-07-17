import React, { useState } from 'react';
import { useGetBranchesQuery, useCreateBranchMutation, useUpdateBranchMutation, useDeleteBranchMutation, TBranch } from './BranchesAPI';
import styles from './BranchesTable.module.scss';

const BranchesTable: React.FC = () => {
  const { data: branches, error, isLoading } = useGetBranchesQuery();
  const [createBranch] = useCreateBranchMutation();
  const [updateBranch] = useUpdateBranchMutation();
  const [deleteBranch] = useDeleteBranchMutation();

  const [newBranch, setNewBranch] = useState<Partial<TBranch>>({});
  const [editingBranch, setEditingBranch] = useState<Partial<TBranch> | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBranch(prevState => ({ ...prevState, [name]: value }));
  };

  const handleCreateBranch = async () => {
    try {
      await createBranch(newBranch).unwrap();
      setNewBranch({});
    } catch (error) {
      console.error('Error creating branch:', error);
    }
  };

  const handleUpdateBranch = async (branch: TBranch) => {
    try {
      await updateBranch(branch).unwrap();
      setEditingBranch(null);
    } catch (error) {
      console.error('Error updating branch:', error);
    }
  };

  const handleDeleteBranch = async (branchId: number) => {
    try {
      await deleteBranch(branchId).unwrap();
    } catch (error) {
      console.error('Error deleting branch:', error);
    }
  };

  return (
    <div className={styles.branchesTableContainer}>
      <h2>Branches</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading branches.</p>}
      {!isLoading && !error && branches?.length === 0 && <p>No branches found.</p>}
      {!isLoading && !error && branches && (
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
              {branches.map((branch, index) => (
                <tr key={branch.branchId} className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                  <td>{branch.branchId}</td>
                  <td>{branch.name}</td>
                  <td>{branch.address}</td>
                  <td>{branch.contactPhone}</td>
                  <td>{new Date(branch.createdAt).toLocaleString()}</td>
                  <td>{new Date(branch.updatedAt).toLocaleString()}</td>
                  <td>
                    <button onClick={() => setEditingBranch(branch)}>Edit</button>
                    <button onClick={() => handleDeleteBranch(branch.branchId)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.formContainer}>
            <h3>{editingBranch ? 'Edit Branch' : 'Create New Branch'}</h3>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={editingBranch ? editingBranch.name : newBranch.name || ''}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={editingBranch ? editingBranch.address : newBranch.address || ''}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="contactPhone"
              placeholder="Contact Phone"
              value={editingBranch ? editingBranch.contactPhone : newBranch.contactPhone || ''}
              onChange={handleInputChange}
            />
            <button onClick={editingBranch ? () => handleUpdateBranch(editingBranch as TBranch) : handleCreateBranch}>
              {editingBranch ? 'Update Branch' : 'Create Branch'}
            </button>
            {editingBranch && <button onClick={() => setEditingBranch(null)}>Cancel</button>}
          </div>
        </>
      )}
    </div>
  );
};

export default BranchesTable;
