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
        text: 'Bookings'
    },
    {
        link: '/admin/products',
        section: 'products',
        icon: <i className='bx bx-cube'></i>,
        text: 'Products'
    },
    {
        link: '/admin/customers',
        section: 'customers',
        icon: <i className='bx bx-user'></i>,
        text: 'Customers'
    },
    {
        link: '/admin/settings',
        section: 'settings',
        icon: <i className='bx bx-cog'></i>,
        text: 'Settings'
    },
    {
        link: '/admin/stats',
        section: 'stats',
        icon: <i className='bx bx-chart'></i>,
        text: 'Stats'
    }
];

export default sidebarNav;
