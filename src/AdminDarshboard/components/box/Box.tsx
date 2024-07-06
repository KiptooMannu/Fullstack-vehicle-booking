import React, { ReactNode } from 'react';

interface BoxProps {
    purple?: boolean;
    fullheight?: boolean;
    children?: ReactNode;
}

const Box: React.FC<BoxProps> = (props) => {
    const className = {
        box: 'box',
        purple: props.purple && 'box-purple',
        fullheight: props.fullheight && 'box-fullheight'
    };

    return (
        <div className={Object.values(className).filter(Boolean).join(' ')}>
            {props.children}
        </div>
    );
}

export default Box;
