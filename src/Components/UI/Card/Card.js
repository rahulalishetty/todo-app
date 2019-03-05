import React from 'react';

const card = (props) => {
  return (
      <div className="Card">
        {props.children}
      </div>
  );
};

export default card;