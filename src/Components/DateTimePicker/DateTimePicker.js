import React, {Component} from 'react';

import './DateTimePicker.css';

class dateTimePicker extends Component{
  state={
    inputSetTime: null
  };

  setDateTime = (event) => {
    this.setState({inputSetTime: event.target.value});
    console.log(event.target.value);
  };

  render() {
    return (
        <div className="DateTimeDiv">
          <p>Pick a time to get Reminded</p>
          <input
              type="datetime-local"
              onChange= {(event) => this.setDateTime(event)}
          />
          <button className="SetReminder" onClick={() => this.props.closeDateTimeModal(this.state.inputSetTime)}>Set Reminder</button>
        </div>
    );
  }
}

export default dateTimePicker;