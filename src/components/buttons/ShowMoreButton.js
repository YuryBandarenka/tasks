import React from 'react';

import CustomButton from './CustomButton';

const ShowMoreButton = props => {

    const {
        tasksQty,
        shownQty,
        changeShownQty
    } = props;

    const handleShowMoreClick = () => {
        switch(true) {
        case shownQty + 5 <= tasksQty:
            changeShownQty(shownQty + 5); break;
        default:
            changeShownQty(tasksQty);
        }
    };

    const isDisabled = shownQty >= tasksQty;

    return (
        <CustomButton
            { ...{
                isDisabled,
                handleClick: handleShowMoreClick,
                text: 'Show more',
                className: 'button-show-more',
            }}
        />
    );

};

export default ShowMoreButton;