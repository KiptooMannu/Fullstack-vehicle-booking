import images from "./images"

const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userName = user?.user?.fullName || 'Kavatha';
const data = {
    user: {

        name: userName,
        img: images.avt
    },
    summary: [
        {
            title: 'Sales',
            subtitle: 'Total sales today',
            value: '$1.000',
            percent: 84
        },
        {
            title: 'Booking',
            subtitle: 'Total bookings today',
            value: '3000',
            percent: 49
        },
        {
            title: 'Revenue',
            subtitle: 'Total revenue today',
            value: '$678',
            percent: 38
        },
        {
            title: 'Visits',
            subtitle: 'Total visits today',
            value: '2345',
            percent: 55
        }
    ],
    revenueSummary: {
        title: 'Revenue',
        value: '$678',
        chartData: {
            labels: ['May', 'Jun', 'July', 'Aug', 'May', 'Jun', 'July', 'Aug'],
            data: [300, 300, 280, 380, 200, 300, 280, 350]
        }
    },
    overall: [
        {
            value: '300K',
            title: 'Bookings'
        },
        {
            value: '9.876K',
            title: 'Customers'
        },
        {
            value: '1.234K',
            title: 'Vehicles'
        },
        {
            value: '$5678',
            title: 'Revenue'
        }
    ],
    revenueByChannel: [
        {
            title: 'Direct',
            value: 70
        },
        {
            title: 'External search',
            value: 40
        },
        {
            title: 'Referal',
            value: 60
        },
        {
            title: 'Social',
            value: 30
        }
    ],
    revenueByMonths: {
        labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
        data: [250, 200, 300, 280, 100, 220, 310, 190, 200, 120, 250, 350]
    }
}

export default data