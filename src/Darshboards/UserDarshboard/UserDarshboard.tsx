// src/Darsh.tsx
import './assets/libs/boxicons-2.1.1/css/boxicons.min.css';
import './scss/App.scss';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Darshboard';
import MainLayout from './layout/MainLayout';
// import Bookings from './pages/Bookings';
import CarList from './components/UserCars/Car';
import MyBookings from './pages/Mybookings';
import TransactionsTable from './pages/UserPayments';
import Profile from '../../AdminDarshboard/pages/Profile';
import UserSupportTickets from './pages/UserSupportTickets';
// import CarDetails from './components/UserCars/CarDetails';

function UserDarshboard() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="vehicles" element={<CarList />}/>
                <Route path="bookings" element={<MyBookings />} />
                <Route path="transactions" element={<TransactionsTable />} />
                <Route path="profile" element={<Profile />} />
                <Route path="tickets" element={<UserSupportTickets />} />
            </Route>
        </Routes>
    );
}

export default UserDarshboard;
