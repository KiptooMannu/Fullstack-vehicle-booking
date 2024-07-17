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
import PrivateRoute from '../../components/PrivateRoute';
// import CarDetails from './components/UserCars/CarDetails';

function UserDarshboard() {
    return (
        <Routes>
            <Route path="/" element={<PrivateRoute><MainLayout /></PrivateRoute>}>
                <Route index element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="vehicles" element={<PrivateRoute><CarList /></PrivateRoute>}/>
                <Route path="bookings" element={<PrivateRoute><MyBookings /></PrivateRoute> }/>
                <Route path="transactions" element={<PrivateRoute><TransactionsTable /></PrivateRoute>} />
                <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="tickets" element={<PrivateRoute><UserSupportTickets /></PrivateRoute>} />
            </Route>
        </Routes>
    );
}

export default UserDarshboard;
