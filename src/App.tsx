import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Models, TestimonialsPage, Team, Contact, Home, About } from './pages';
import { Navbar } from './components';
import Login from './Features/login/Login';
import Error from './pages/Error';

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

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <Error />,
    },
    {
      path: 'about',
      element: <About />,
      errorElement: <Error />,
    },
    {
      path: 'models',
      element: <Models />,
      errorElement: <Error />,
    },
    {
      path: 'testimonials',
      element: <TestimonialsPage />,
      errorElement: <Error />,
    },
    {
      path: 'team',
      element: <Team />,
      errorElement: <Error />,
    },
    {
      path: 'contact',
      element: <Contact />,
      errorElement: <Error />,
    },
    {
      path: 'login',
      element: <Login />,
      errorElement: <Error />,
    }
  ]);

  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
