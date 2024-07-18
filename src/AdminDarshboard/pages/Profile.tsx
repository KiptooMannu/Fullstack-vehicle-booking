import React, { useState, useEffect } from 'react';
import "../scss/Profile.scss";
import { useUpdateUserMutation, useGetUserByIdQuery } from '../../Features/users/UsersAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
  fullName: string;
  contactPhone: string;
  email: string;
  location: string;
  street: string;
  dateOfBirth: string;
  gender: string;
}

function Profile() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    contactPhone: '',
    email: '',
    location: '',
    street: '',
    dateOfBirth: '',
    gender: ''
  });

  const [activeTab, setActiveTab] = useState('profile');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user?.user?.userId;
  const { data: userDetails, error, isLoading } = useGetUserByIdQuery(userId ? parseInt(userId) : 0, {
    skip: !userId || activeTab !== 'details'
  });

  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    if (userDetails) {
      setFormData({
        fullName: userDetails.fullName || '',
        contactPhone: userDetails.contactPhone || '',
        email: userDetails.email || '',
        location: userDetails.location || '',
        street: userDetails.street || '',
        dateOfBirth: userDetails.dateOfBirth || '',
        gender: userDetails.gender || ''
      });
    }
  }, [userDetails]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userId) {
      try {
        const updatedData: Partial<FormData> = Object.entries(formData)
          .filter(([_, value]) => value !== '')
          .reduce((acc, [key, value]) => {
            acc[key as keyof FormData] = value;
            return acc;
          }, {} as Partial<FormData>);

        await updateUser({
          userId: parseInt(userId),
          ...updatedData,
          address: updatedData.location // Use location as address
        }).unwrap();
        toast.success('Profile updated successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
        });
      } catch (error) {
        console.error('Failed to update profile:', error);
        toast.error('Failed to update profile', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
        });
      }
    } else {
      console.error('User ID not found in local storage');
      toast.error('User ID not found in local storage', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    }
  };

  const renderUserDetails = () => (
    <div className="user-details">
      <h2 className="profile__title">User Details</h2>
      <p className="profile__desc">Your personal details</p>
      <div className="details__form">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading user details</p>
        ) : (
          <div className="card-grid">
            <div className="card">
              <h3>Full Name</h3>
              <p>{userDetails?.fullName || 'N/A'}</p>
            </div>
            <div className="card">
              <h3>Email</h3>
              <p>{userDetails?.email || 'N/A'}</p>
            </div>
            <div className="card">
              <h3>Phone Number</h3>
              <p>{userDetails?.contactPhone || 'N/A'}</p>
            </div>
            <div className="card">
              <h3>Live in</h3>
              <p>{userDetails?.location || 'N/A'}</p>
            </div>
            <div className="card">
              <h3>Street</h3>
              <p>{userDetails?.street || 'N/A'}</p>
            </div>
            <div className="card">
              <h3>Date of Birth</h3>
              <p>{userDetails?.dateOfBirth || 'N/A'}</p>
            </div>
            <div className="card">
              <h3>Gender</h3>
              <p>{userDetails?.gender || 'N/A'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderProfileForm = () => (
    <div className="details__form">
      <h2 className="profile__title">Profile</h2>
      <p className="profile__desc">Update your photo and personal details here</p>
      <form onSubmit={handleSubmit}>
        <div className="form__group">
          <div>
            <label>Live in</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Nairobi, Kenya"
            />
          </div>
          <div>
            <label>Street</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              placeholder="Nrb 3108"
            />
          </div>
        </div>
        <div className="form__group">
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="example@gmail.com"
            />
          </div>
          <div>
            <label>Phone Number</label>
            <input
              type="number"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleInputChange}
              placeholder="+254 77*******"
            />
          </div>
        </div>
        <div className="form__group">
          <div>
            <label>Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              placeholder="dd/mm/yyyy"
            />
          </div>
          <div>
            <label>Gender</label>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              placeholder="Male"
            />
          </div>
        </div>
        <div className="form__group">
          <div>
            <label>Your Photo</label>
            <p className="profile-img__desc">This will be displayed in your profile</p>
            <input type="file" placeholder="choose file" />
          </div>
          <div className="profile__img-btns">
            <button type="button" className="dlt__btn">Delete</button>
            <button type="submit" className="update__btn">Update</button>
          </div>
        </div>
      </form>
    </div>
  );

  return (
    <div className="settings">
      <ToastContainer />
      <div className="settings__wrapper">
        <h2 className="settings__title">Settings</h2>

        <div className="settings__top">
          <button className={`setting__btn ${activeTab === 'details' ? 'active__btn' : ''}`} onClick={() => setActiveTab('details')}>My Details</button>
          <button className={`setting__btn ${activeTab === 'profile' ? 'active__btn' : ''}`} onClick={() => setActiveTab('profile')}>Profile</button>
          <button className="setting__btn">Password</button>
          <button className="setting__btn">Email</button>
          <button className="setting__btn">Notification</button>
        </div>

        {activeTab === 'details' ? renderUserDetails() : renderProfileForm()}
      </div>
    </div>
  );
}

export default Profile;
