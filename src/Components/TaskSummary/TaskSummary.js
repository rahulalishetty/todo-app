import React from 'react';

import Card from '../UI/Card/Card';
import './TaskSummary.css';

const taskSummary = (props) => {
  console.log(props.task);
  return(
      <Card>
        <p className="TaskNameInSummary">{props.task.name}</p>
        <div className="TaskButtonDiv">
          <div>
            <p onClick={props.openDateTimeModal}>Add Reminder</p>
          </div>
          <div>
            <p>Share Task</p>
          </div>
          <div>
            <p>{props.task.category}</p>
          </div>
        </div>
        <div className="NotesDiv">
          <p>NOTES</p>
          <input
              className=""
              value={props.task.notes}
              onChange={(event) => props.updateNotes(event, props.task)}
          />
        </div>
      </Card>
  );
};

export default taskSummary;