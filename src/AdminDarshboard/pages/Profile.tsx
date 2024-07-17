import React, { useState } from 'react';
import "../scss/Profile.scss";
import { useUpdateUserMutation } from '../../Features/users/UsersAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
  const [formData, setFormData] = useState({
    fullName: '',
    contactPhone: '',
    email: '',
    location: '',
    street: '',
    dateOfBirth: '',
    gender: ''
  });

  const [updateUser] = useUpdateUserMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');

    console.log('Form submitted:', formData);
    console.log('User ID:', userId);

    if (userId) {
      try {
        await updateUser({
          userId: parseInt(userId),
          ...formData,
          address: formData.location // Use location as address
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

  return (
    <div className="settings">
      <ToastContainer />
      <div className="settings__wrapper">
        <h2 className="settings__title">Settings</h2>

        <div className="settings__top">
          <button className="setting__btn">My Details</button>
          <button className="setting__btn active__btn">Profile</button>
          <button className="setting__btn">Password</button>
          <button className="setting__btn">Email</button>
          <button className="setting__btn">Notification</button>
        </div>

        <div className="details__form">
          <h2 className="profile__title">Profile</h2>
          <p className="profile__desc">
            Update your photo and personal details here
          </p>
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
                <p className="profile-img__desc">
                  This will be displayed in your profile
                </p>
                <input type="file" placeholder="choose file" />
              </div>

              <div className="profile__img-btns">
                <button type="button" className="dlt__btn">Delete</button>
                <button type="submit" className="update__btn">Update</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
