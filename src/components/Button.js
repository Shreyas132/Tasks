import PropTypes from 'prop-types';
import React from 'react';

export const Button = ({color,text,onClick}) => {
  return (
    <button onClick={onClick} style={{background:color}}className="btn">
      {text}
    </button>
    
    )
}
Button.defaultProps = {
  color : "red",
}
Button.propTypes = {
  text : PropTypes.string,
  color : PropTypes.string,
  onClick : PropTypes.func,
}
