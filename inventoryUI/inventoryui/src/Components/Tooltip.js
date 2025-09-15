import React from 'react';
import './Tooltip.css'; // Add styles for the tooltip

const Tooltip = ({ message, type }) => {
    const getTooltipClass = () => {
        switch (type) {
            case 'error':
                return 'tooltip error';
            case 'success':
                return 'tooltip success';
            case 'alert':
                return 'tooltip alert';
            default:
                return 'tooltip';
        }
    };

    return (
        <div className={getTooltipClass()}>
            {message}
        </div>
    );
};

export default Tooltip;