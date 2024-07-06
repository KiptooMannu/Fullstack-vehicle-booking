import React from 'react';
import './user-info.scss';
import { User } from '../types/user';

interface UserInfoProps {
    user: User;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
    return (
        <div className='user-info'>
            <div className="user-info__img">
                <img src={user.img} alt={user.name} />
            </div>
            <div className="user-info__name">
                <span>{user.name}</span>
            </div>
        </div>
    );
}

export default UserInfo;
