import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './sidebar.scss';
import { images } from '../../constants';
import sidebarNav from '../../configs/sidebarNav';

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const curPath = window.location.pathname.split('/')[2];
        if (curPath) {
            const activeItem = sidebarNav.findIndex(item => item.section === curPath);
            setActiveIndex(activeItem !== -1 ? activeItem : 0);
        } else {
            setActiveIndex(0);
        }
    }, [location]);

    const closeSidebar = () => {
        const mainContent = document.querySelector('.main__content') as HTMLElement;
        if (mainContent) {
            mainContent.style.transform = 'scale(1) translateX(0)';
            setTimeout(() => {
                document.body.classList.remove('sidebar-open');
                mainContent.style.transform = '';
                mainContent.style.transition = '';
            }, 500);
        }
    };

    const handleLogout = () => {
        // Clear authentication tokens or session information
        localStorage.removeItem('authToken');
        // Add any other logout logic here

        // Redirect to home page
        navigate('/');
    };

    return (
        <div className='sidebar'>
            <div className="sidebar__logo">
                <img src={images.logo} alt="Logo" />
                <div className="sidebar-close" onClick={closeSidebar}>
                    <i className='bx bx-x'></i>
                </div>
            </div>
            <div className="sidebar__menu">
                {sidebarNav.map((nav, index) => (
                    <Link 
                        to={nav.link} 
                        key={`nav-${index}`} 
                        className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`} 
                        onClick={closeSidebar}
                    >
                        <div className="sidebar__menu__item__icon">
                            {nav.icon}
                        </div>
                        <div className="sidebar__menu__item__txt">
                            {nav.text}
                        </div>
                    </Link>
                ))}
                <div className="sidebar__menu__item" onClick={handleLogout}>
                    <div className="sidebar__menu__item__icon">
                        <i className='bx bx-log-out'></i>
                    </div>
                    <div className="sidebar__menu__item__txt">
                        Logout
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
