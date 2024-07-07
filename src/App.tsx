import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Models, TestimonialsPage, Team, Contact, Home, About } from './pages';
// import { Navbar } from './components';
import Register from './pages/Register';
import Darshboard from './AdminDarshboard/Darshboard';

import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

import '@fontsource/rubik/300.css';
import '@fontsource/rubik/400.css';
import '@fontsource/rubik/500.css';
import '@fontsource/rubik/600.css';
import '@fontsource/rubik/700.css';

import '../src/dist/styles.css';
import Login from './pages/Login';
import Blank from './AdminDarshboard/pages/Blank';
// import MainLayout from './AdminDarshboard/layout/MainLayout';
import Dashboard from './AdminDarshboard/pages/Darshboard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='models' element={<Models />} />
        <Route path='testimonials' element={<TestimonialsPage />} />
        <Route path='team' element={<Team />} />
        <Route path='contact' element={<Contact />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />

        {/* Admin Routes */}
        <Route path="admin/*" element={<Darshboard />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Blank />} />
          <Route path="products" element={<Blank />} />
          <Route path="customers" element={<Blank />} />
          <Route path="settings" element={<Blank />} />
          <Route path="stats" element={<Blank />} />
        </Route>

        {/* User Routes */}
        <Route path="users/*" element={<Darshboard />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Blank />} />
          <Route path="products" element={<Blank />} />
          <Route path="customers" element={<Blank />} />
          <Route path="settings" element={<Blank />} />
          <Route path="stats" element={<Blank />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
