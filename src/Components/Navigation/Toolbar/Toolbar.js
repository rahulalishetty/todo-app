import React from 'react';

import './Toolbar.css';
import DrawerToggle from '../DrawerToggle/DrawerToggle';
import NewButton from '../../UI/NewButton/NewButton';

const toolbar = (props) => {
  return(
      <header className="Toolbar">
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <NewButton clicked={props.addNewButtonClicked}/>
      </header>
  );
};

export default toolbar;