import React, { Component } from 'react';

import './TodoCategoryListCard.css';
import Card from '../../UI/Card/Card';
import TaskSummary from '../../TaskSummary/TaskSummary';

class TodoCategoryListCard extends Component{
  state={
    showTodayTasks: false,
    showTomorrowTasks: false,
    showUpcomingTasks: false,
    showSomedayTasks: false,
    showTodoTask: null,
    quickTaskInput: ""
  };

  showTodoHandler = (taskType) => {
    switch (taskType) {
      case "today":
        this.setState({
          ...this.state,
          showTodayTasks: !this.state.showTodayTasks
        });
        break;
      case "tomorrow":
        this.setState({
          ...this.state,
          showTomorrowTasks: !this.state.showTomorrowTasks
        });
        break;
      case "upComing":
        this.setState({
          ...this.state,
          showUpcomingTasks: !this.state.showUpcomingTasks
        });
        break;
      case "someday":
        this.setState({
          ...this.state,
          showSomedayTasks: !this.state.showSomedayTasks
        });
        break;
      default:
        break;
    }
  };

  getTasks = (taskType) => {
    let taskList = null;
    console.log("tasks",this.props.tasks);
    if(this.props.category === "All Tasks"){
      taskList =
          (<ul>
            {Object.keys(this.props.tasks).map((taskCat) => {
              return [...Array(this.props.tasks[taskCat][taskType])].map((taskArray) => {
                if (taskArray.length !== 0) {
                  return taskArray.map((eachTask, index) => {
                    console.log("each Task",eachTask);
                    return <li key={eachTask.id} onClick={() => this.taskSelected(eachTask)}>
                                <div className="CheckBox"> &nbsp; </div>
                                <span className="TaskName">{eachTask.name}</span>
                              </li>
                  })
                }
                return null;
              })
            })
            }
          </ul>);
    }else{
        taskList = (
            <ul>
              {
                [...Array(this.props.tasks[taskType])].map((taskArray, index) => {
                  console.log(taskArray);
                  if(taskArray !== null && taskArray.length !== 0) {
                    return taskArray.map((eachTask) => {
                      console.log(eachTask);
                      return <li key={eachTask.id} onClick={() => this.taskSelected(eachTask)}>
                                <div className="CheckBox"> &nbsp; </div>
                                <span className="TaskName">{eachTask.name}</span>
                              </li>
                        })
                      }
                  return null;
                })
              }
            </ul>
        )
    }
    return taskList;
  };

  taskSelected = (task) => {
    console.log(task, this.props);
    this.setState({showTodoTask: task});
  };

  assignClickedTask = () => {
    return <TaskSummary
        task={this.state.showTodoTask}
        notes={this.state.showTodoTask.notes}
    />
  };

  quickTaskInputHandler = (event) => {
    this.setState({quickTaskInput: event.target.value});
  };

  quickTaskSubmitHandler = () => {
    if(this.state.quickTaskInput !== ""){
      this.props.addQuickTask(this.state.quickTaskInput);
    }
  };

  render() {
    let todayTask=null;
    let tomorrowTask=null;
    let upComingTask=null;
    let somedayTask=null;
    let todoTask = null;

    console.log(this.props.tasks);
    if(this.state.showTodayTasks === true){
      todayTask = this.getTasks("today");
    }if(this.state.showTomorrowTasks === true){
      tomorrowTask = this.getTasks("tomorrow");
    }if(this.state.showUpcomingTasks === true){
      upComingTask = this.getTasks("upComing");
    }if(this.state.showSomedayTasks === true){
      somedayTask = this.getTasks("someday");
    }

    if(this.state.showTodoTask !== null){
      todoTask= this.assignClickedTask();
    }

    return (
        <div className="Content CatCard">
          <p className="TodoCat">{this.props.category}</p>
            <Card>
              <div>
                <ul className="CardList">
                  <li onClick={() => this.showTodoHandler("today")}>
                    Today
                  </li>
                  {todayTask}
                  <li onClick={() => this.showTodoHandler("tomorrow")}>
                    Tomorrow
                  </li>
                  {tomorrowTask}
                  <li onClick={() => this.showTodoHandler("upComing")}>
                    Upcoming
                  </li>
                  {upComingTask}
                  <li onClick={() => this.showTodoHandler("someday")}>
                    Someday
                  </li>
                  {somedayTask}
                </ul>
              </div>
              <div className="TodoInput">
                <input
                    type="text"
                    placeholder="Click to quickly add to task"
                    onKeyUp={(event) => this.quickTaskInputHandler(event)}
                />
                <button onClick={this.quickTaskSubmitHandler}>&#8607;</button>
              </div>
            </Card>
            {todoTask}
        </div>
    );
  }
}

export default TodoCategoryListCard;