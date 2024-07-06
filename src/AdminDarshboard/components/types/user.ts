
export interface User {
    img: string;
    name: string;
}

export interface Item {
    title: string;
    subtitle: string;
    value: string;
    percent: number;
    chartData: {
        labels: string[];
        data: number[];
    };
}
