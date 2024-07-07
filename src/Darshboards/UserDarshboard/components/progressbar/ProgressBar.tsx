import React, { useEffect, useRef } from 'react';
import './progress-bar.scss';

interface ProgressBarProps {
    value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
    const barInnerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (barInnerRef.current) {
            barInnerRef.current.style.width = `${value}%`;
        }
    }, [value]); // Add value as a dependency

    return (
        <div className='progress-bar'>
            <div ref={barInnerRef} className="progress-bar__inner"></div>
        </div>
    );
};

export default ProgressBar;
