// import React from 'react';
// import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
// import { Models, TestimonialsPage, Team, Contact, Home, About } from './pages';
// // import { Navbar } from './components';
// import Register from './pages/Register';
// import Darshboard from './AdminDarshboard/Darshboard';

// import '@fontsource/poppins/300.css';
// import '@fontsource/poppins/400.css';
// import '@fontsource/poppins/500.css';
// import '@fontsource/poppins/600.css';
// import '@fontsource/poppins/700.css';

// import '@fontsource/rubik/300.css';
// import '@fontsource/rubik/400.css';
// import '@fontsource/rubik/500.css';
// import '@fontsource/rubik/600.css';
// import '@fontsource/rubik/700.css';

// import '../src/dist/styles.css';
// import Login from './pages/Login';
// import Blank from './AdminDarshboard/pages/Blank';
// // import MainLayout from './AdminDarshboard/layout/MainLayout';
// import Dashboard from './AdminDarshboard/pages/Darshboard';
// import Bookings from './Darshboards/UserDarshboard/pages/UserSupportTickets';
// import UserDarshboard from './Darshboards/UserDarshboard/UserDarshboard';
// import UserTable from './Features/users/UserTable';
// import PaymentSuccess from './Darshboards/UserDarshboard/pages/PaymentSuccess';

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route index path='/' element={<Home />} />
//         <Route path='about' element={<About />} />
//         <Route path='models' element={<Models />} />
//         <Route path='testimonials' element={<TestimonialsPage />} />
//         <Route path='team' element={<Team />} />
//         <Route path='contact' element={<Contact />} />
//         <Route path='login' element={<Login />} />
//         <Route path="/booking-success" element={<PaymentSuccess/>} />
//         <Route path='register' element={<Register />} />

//         {/* Admin Routes */}
//         <Route path="admin/*" element={<Darshboard />}>
//           <Route index element={<Dashboard />} />
//           <Route path="bookings" element={<Bookings />} />
//           <Route path="vehicles" element={<Blank />} />
//           <Route path="customers" element={<UserTable />} />
//           <Route path="settings" element={<Blank />} />
//           <Route path="stats" element={<Blank />} />
//         </Route>

//         {/* User Routes */}
//         <Route path="users/*" element={<UserDarshboard />}>
//           <Route index element={<Dashboard />} />
//           <Route path="bookings" element={<Bookings />} />
//           <Route path="products" element={<Blank />} />
//           <Route path="customers" element={<Blank />} />
//           <Route path="settings" element={<Blank />} />
//           <Route path="stats" element={<Blank />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// };

// export default App;
import React, { useState, useEffect, useRef, ReactNode } from 'react';
import './App.css';

let cloudinary: any;

interface UploadWidgetProps {
  children: ({ cloudinary, widget, open }: { cloudinary: any; widget: React.MutableRefObject<any>; open: () => void }) => ReactNode;
  onUpload?: (error: any, result: any, widget: React.MutableRefObject<any>) => void;
}

const UploadWidget: React.FC<UploadWidgetProps> = ({ children, onUpload }) => {
  const widget = useRef<any>();

  useEffect(() => {
    if (!cloudinary) {
      cloudinary = (window as any).cloudinary;
    }

    function onIdle() {
      if (!widget.current) {
        widget.current = createWidget();
      }
    }

    'requestIdleCallback' in window ? requestIdleCallback(onIdle) : setTimeout(onIdle, 1);

    return () => {
      widget.current?.destroy();
      widget.current = undefined;
    };
  }, []);

  function createWidget() {
    const cloudName = 'dlqbpndde';
    const uploadPreset = 'daniel';

    if (!cloudName || !uploadPreset) {
      console.warn(`Kindly ensure you have the cloudName and UploadPreset 
      setup in your .env file at the root of your project.`);
    }

    const options = {
      cloudName,
      uploadPreset,
    };

    return cloudinary?.createUploadWidget(
      options,
      function (error: any, result: any) {
        if ((error || result.event === 'success') && typeof onUpload === 'function') {
          onUpload(error, result, widget);
        }
      }
    );
  }

  function open() {
    if (!widget.current) {
      widget.current = createWidget();
    }
    widget.current && widget.current.open();
  }

  return <>{children({ cloudinary, widget, open })}</>;
};

const App: React.FC = () => {
  const [url, updateUrl] = useState<string | undefined>(undefined);
  const [error, updateError] = useState<string | undefined>(undefined);

  const handleOnUpload = (error: any, result: any, widget: any) => {
    if (error) {
      updateError(error.message);
      widget.close({
        quiet: true,
      });
      return;
    }
    updateUrl(result?.info?.secure_url);
  };

  return (
    <main className="main">
      <div className="container">
        <h1 className="title">React &amp; Cloudinary Upload Widget</h1>
      </div>

      <div className="container">
        <h2>Unsigned with Upload Preset</h2>
        <UploadWidget onUpload={handleOnUpload}>
          {({ open }) => {
            const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              open();
            };
            return <button onClick={handleOnClick}>Upload an Image</button>;
          }}
        </UploadWidget>

        {error && <p>{error}</p>}

        {url && (
          <>
            <p>
              <img src={url} alt="Uploaded resource" />
            </p>
            <p>{url}</p>
          </>
        )}
      </div>

      <div className="container">
        <h2>Resources</h2>
        
      </div>
    </main>
  );
};

export default App;
