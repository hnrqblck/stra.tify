import React from 'react';
import '../styles/button.scss';

const RoundButton = (props) => {
    return (
        <button className={`button ${props.class}`} style={{ backgroundColor: props.bgColor, color: props.color }}>
           {props.text} 
        </button>
    );
};

export default RoundButton;
