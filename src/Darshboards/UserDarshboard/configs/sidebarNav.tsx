const sidebarNav = [
    {
        link: '/users',
        section: 'dashboard',
        icon: <i className='bx bx-home-alt'></i>,
        text: 'Dashboard'
    },
    {
        link: '/users/bookings', 
        section: 'bookings', 
        icon: <i className='bx bx-receipt'></i>,
        text: 'My Bookings'
    },
    {
        link: '/users/vehicles',
        section: 'vehicles',
        icon: <i className='bx bx-cube'></i>,
        text: 'Explore Vehicles'
    },
    {
        link: '/users/customers',
        section: 'customers',
        icon: <i className='bx bx-user'></i>,
        text: 'Customers'
    },
    {
        link: '/users/settings',
        section: 'settings',
        icon: <i className='bx bx-cog'></i>,
        text: 'Settings'
    },
    {
        link: '/users/stats',
        section: 'stats',
        icon: <i className='bx bx-chart'></i>,
        text: 'Stats'
    }
];

export default sidebarNav;
