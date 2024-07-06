import React, { ReactNode } from 'react';
import './dashboard-wrapper.scss';

interface DashboardWrapperProps {
    children?: ReactNode;
}

const DashboardWrapper: React.FC<DashboardWrapperProps> = (props) => {
    return (
        <div className='dashboard-wrapper'>
            {props.children}
        </div>
    );
}

export default DashboardWrapper;

export const DashboardWrapperMain: React.FC<DashboardWrapperProps> = (props) => {
    return (
        <div className='dashboard-wrapper__main'>
            {props.children}
        </div>
    );
}

export const DashboardWrapperRight: React.FC<DashboardWrapperProps> = (props) => {
    return (
        <div className='dashboard-wrapper__right'>
            {props.children}
        </div>
    );
}
