import React, { ReactNode } from 'react';

interface BoxProps {
    purple?: boolean;
    fullheight?: boolean;
    children?: ReactNode;
}

const Box: React.FC<BoxProps> = ({ purple, fullheight, children }) => {
    const className = {
        box: 'box',
        purple: purple && 'box-purple',
        fullheight: fullheight && 'box-fullheight'
    };

    return (
        <div className={Object.values(className).filter(Boolean).join(' ')}>
            {children}
        </div>
    );
};

export default Box;
