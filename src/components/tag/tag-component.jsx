import React from 'react';
import './tag-styles.scss';

const Tag = ({ children, selected, ...otherProps }) => {
    const selectedClass = selected ? 'selected' : '';

    return (
        <span className={`tag ${selectedClass}`} {...otherProps}>{children}</span>
    )
}
Tag.defaultProps = {
    selected: false,
    
}

export default Tag;