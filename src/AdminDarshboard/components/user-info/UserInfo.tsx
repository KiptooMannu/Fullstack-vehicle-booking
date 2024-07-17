import React, { useState } from 'react';
import './user-info.scss';
import { User } from '../types/user';
import Upload from '../../../components/Upload'; // Make sure to import the Upload component

interface UserInfoProps {
  user: User;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const [userImage, setUserImage] = useState(user.img);

  const handleOnUpload = (error: any, result: any) => {
    if (error) {
      console.error(error.message);
      return;
    }
    setUserImage(result?.info?.secure_url);
  };

  return (
    <div className='user-info'>
      <div className="user-info__img">
        <img src={userImage} alt={user.name} />
        <Upload onUpload={handleOnUpload}>
          {({ open }) => (
            <button className="btn btn-primary" onClick={open}>Add</button>
          )}
        </Upload>
      </div>
      <div className="user-info__name">
        <span>{user.name}</span>
      </div>
    </div>
  );
}

export default UserInfo;
