import React from 'react';

import s from './Heading.module.scss';

const PrimaryHeading = ({
    text = 'Heading'
}) => {

    return (
        <h1 className = {s.primaryheading}>{text}</h1>
    )
};

export default PrimaryHeading;