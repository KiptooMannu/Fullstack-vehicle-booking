// src/Darsh.tsx
import './assets/libs/boxicons-2.1.1/css/boxicons.min.css';
import './scss/App.scss';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Darshboard';
import MainLayout from './layout/MainLayout';
import Bookings from './pages/Bookings';
import CarList from './components/UserCars/Car';
// import CarDetails from './components/UserCars/CarDetails';

function UserDarshboard() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="bookings" element={<CarList />}>
                    {/* <Route index element={<CarDetails />} />
                    <Route path="/:id" element={<CarDetails />} /> */}
                </Route>
                <Route path="Available Cars" element={<Bookings />} />
                <Route path="customers" element={<Bookings />} />
                <Route path="settings" element={<Bookings />} />
                <Route path="stats" element={<Bookings />} />
            </Route>
        </Routes>
    );
}

export default UserDarshboard;
