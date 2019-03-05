import React, {Component} from 'react';

import './ListItem.css';

class ListItem extends Component{
  state={
    taskChecked : false
  };

  taskCheckedHandler = () => {
    this.setState({taskChecked: !this.state.taskChecked});
  };

  render() {

    let checkBoxStyles = "CheckBox";
    let check = null;
    let nameStyle = "TaskName";
    let cross = null;
    let crossStyles="CheckBox Checked CrossEx";

    if(this.state.taskChecked === true){
      nameStyle += " NameCrossed";
      checkBoxStyles += " Checked";
      check= (<span className="Check" onClick={this.taskCheckedHandler}>&#10003;</span>);
      cross= (<span
                    className={crossStyles}
                    style={{marginLeft: "240px"}}
                    onClick={() => this.props.removeTask(this.props.eachTask)}
                    >
                <span
                    className="Check"
                    onClick={() => this.props.removeTask(this.props.eachTask)}
                >
                  X
                </span>
              </span>);
    }

    return (
        <li
            onClick={() => this.props.taskSelected(this.props.eachTask)}
        >
          <div className={checkBoxStyles} onClick={this.taskCheckedHandler}> &nbsp; </div>
          {check}
          <span className={nameStyle}>{this.props.eachTask.name}</span>
          {cross}
        </li>
    );
  }
}

export default ListItem;
