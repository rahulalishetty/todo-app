import React, {Component} from 'react';

class ListItem extends Component{
  render() {
    return (
        <li key={this.props.eachTask.id} onClick={() => this.props.taskSelected(this.props.eachTask)}>
          <div className="CheckBox"> &nbsp; </div>
          <span className="TaskName">{this.props.eachTask.name}</span>
        </li>
    );
  }
}

export default ListItem;
