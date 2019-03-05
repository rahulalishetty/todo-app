import React from 'react';
import './NewButton.css'

const newButton = (props) => {
  return (
      <button className="NewButton" onClick={props.clicked}> <span className="Plus">+</span>  New</button>
  );
};

export default newButton;