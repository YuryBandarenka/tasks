import React from 'react';

const CustomButton = props => {

    const {
        handleClick,
        isDisabled,
        className,
        text
    } = props;

    return (
        <button
            onClick={handleClick}
            disabled={isDisabled}
            className={className}
        >
            { text }
        </button>
    );
};

export default CustomButton;