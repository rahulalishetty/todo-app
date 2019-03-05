import React from 'react';

import './SideDrawer.css';
import Aux from '../../../hoc/Aux';

const sideDrawer =(props) => {
    let attachedClasses = ["SideDrawer", "Close"];
    if (props.open) {
      attachedClasses = ["SideDrawer", "Open"];
    }
    console.log(props.category);
    let ActiveStyle = "ActiveCat";
    let allTasksActive = "";
    let personalActive = "";
    let workActive = "";
    let groceryListActive = "";

    if(props.category === "All Tasks"){
      allTasksActive = ActiveStyle;
    }
    if(props.category === "personal"){
      personalActive = ActiveStyle;
    }
    if(props.category === "work"){
      workActive = ActiveStyle;
    }
    if(props.category === "groceryList"){
      groceryListActive = ActiveStyle;
    }

    return (
        <Aux>
          <div className={attachedClasses.join(' ')}>
            <ul>
              <li className="FirstChild">
                  MY LISTS
              </li>
              <li className={allTasksActive} onClick={() => props.currentCategory("All Tasks")}>
                All Tasks
              </li>
              <li className={personalActive} onClick={() => props.currentCategory("personal")}>
                Personal
              </li>
              <li className={workActive} onClick={() => props.currentCategory("work")}>
                Work
              </li>
              <li className={groceryListActive} onClick={() => props.currentCategory("groceryList")}>
                Grocery List
              </li>
              <li className="Last"></li>
            </ul>
          </div>
        </Aux>
    );
};



export default sideDrawer;