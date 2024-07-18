// src/types/data.ts

export interface User {
    name: string;
    img: string;
}

export interface SummaryItem {
    title: string;
    subtitle: string;
    value: string | number;
    percent: number;
}

export interface ChartData {
    labels: string[];
    data: number[];
}

export interface RevenueSummary {
    title: string;
    value: string;
    chartData: ChartData;
}

export interface OverallItem {
    value: string;
    title: string;
}

export interface RevenueByChannelItem {
    title: string;
    value: number;
}

export interface RevenueByMonths {
    labels: string[];
    data: number[];
}

export interface Data {
    user: User;
    summary: SummaryItem[];
    revenueSummary: RevenueSummary;
    overall: OverallItem[];
    revenueByChannel: RevenueByChannelItem[];
    revenueByMonths: RevenueByMonths;
}


// src/constants.ts
import images from './images';

const user = JSON.parse(localStorage.getItem('user') || '{}');
const userName = user?.user?.fullName || 'Kavatha';

const data: Data = {
    user: {
        name: userName,
        img: images.avt
    },
    summary: [
        {
            title: 'Bookings',
            subtitle: 'Total Bookings today',
            value: '$1.000',
            percent: 70
        },
        {
            title: 'Orders',
            subtitle: 'Total orders today',
            value: '3000',
            percent: 49
        },
        {
            title: 'Total Spent',
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
            value: '30',
            title: 'Bookings'
        },
        {
            value: '900+',
            title: 'Cars Available'
        },
        {
            value: '1.234K',
            title: 'Pending Payments'
        },
        {
            value: '$5678',
            title: 'Balance'
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
};

export default data;



// import images from "./images"
// const user = JSON.parse(localStorage.getItem('user') || '{}');
//     const userName = user?.user?.fullName || 'Kavatha';

// const data = {
//     user: {
//         name: userName,
//         img: images.avt
//     },
//     summary: [
//         {
//             title: 'Bookings',
//             subtitle: 'Total Bookings today',
//             value: '$1.000',
//             percent: 70
//         },
//         {
//             title: 'Orders',
//             subtitle: 'Total orders today',
//             value: '3000',
//             percent: 49
//         },
//         {
//             title: 'Total Spent',
//             subtitle: 'Total revenue today',
//             value: '$678',
//             percent: 38
//         },
//         {
//             title: 'Visits',
//             subtitle: 'Total visits today',
//             value: '2345',
//             percent: 55
//         }
//     ],
//     revenueSummary: {
//         title: 'Revenue',
//         value: '$678',
//         chartData: {
//             labels: ['May', 'Jun', 'July', 'Aug', 'May', 'Jun', 'July', 'Aug'],
//             data: [300, 300, 280, 380, 200, 300, 280, 350]
//         }
//     },
//     overall: [
//         {
//             value: '30',
//             title: 'Bookings'
//         },
//         {
//             value: '900+',
//             title: 'Cars Available'
//         },
//         {
//             value: '1.234K',
//             title: 'Pending Payments'
//         },
//         {
//             value: '$5678',
//             title: 'Balance'
//         }
//     ],
//     revenueByChannel: [
//         {
//             title: 'Direct',
//             value: 70
//         },
//         {
//             title: 'External search',
//             value: 40
//         },
//         {
//             title: 'Referal',
//             value: 60
//         },
//         {
//             title: 'Social',
//             value: 30
//         }
//     ],
//     revenueByMonths: {
//         labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
//         data: [250, 200, 300, 280, 100, 220, 310, 190, 200, 120, 250, 350]
//     }
// }

// export default data