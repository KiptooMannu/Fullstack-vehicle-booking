// src/Darsh.tsx
import './assets/libs/boxicons-2.1.1/css/boxicons.min.css'
import './scss/App.scss'
import {  Routes, Route } from 'react-router-dom'
// import Blank from './pages/Blank'
import Dashboard from './pages/Darshboard'
import MainLayout from './layout/MainLayout'
import Bookings from './pages/Bookings'

function UserDarshboard() {
    return (
        // <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="orders" element={<Bookings />} />
                    <Route path="products" element={<Bookings />} />
                    <Route path="customers" element={<Bookings />} />
                    <Route path="settings" element={<Bookings />} />
                    <Route path="stats" element={<Bookings />} />
                </Route>
            </Routes>
        // </BrowserRouter>
    )
}

export default UserDarshboard;
