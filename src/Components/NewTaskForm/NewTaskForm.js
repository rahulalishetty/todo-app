import React, {Component} from 'react';

import './NewTaskForm.css';

class newTaskForm extends Component {
  state={
    inputForTaskName: "",
    inputNotes: "",
    disableAddButton: true,
    newAddedTask: null,
    taskFor: "today"
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextState.inputForTaskName !== this.state.inputForTaskName ||
        nextState.inputNotes !== this.state.inputNotes ||
        nextState.disableAddButton !== this.state.disableAddButton||
        nextProps.currentCategory !== this.props.currentCategory;
  }

  componentWillUpdate(){
    console.log("form updated");
  }

  updateInputForTaskName = (event) => {
    this.setState({inputForTaskName: event.target.value});
  };

  textAreaAdjust = (event) => {
    if(event.which === 13) {
        event.target.style.height = (10 + event.target.scrollHeight) + "px";
      console.log(event.target.scrollHeight, event.target.style.height);
    }
    this.setState({inputNotes: event.target.value});
  };

  enableAddButton = () => {
    this.setState({disableAddButton: false});
  };

  disableAddButton = () => {
    this.setState({disableAddButton: true});
  };

  addTask = () => {
    let taskCategory ="";

    if(this.props.currentCategory === "All Tasks"){
      taskCategory = "personal";
    }else{
      taskCategory = this.props.currentCategory;
    }

    let newTask= {
      name: this.state.inputForTaskName,
      notes: this.state.inputNotes,
      category: taskCategory,
      taskFor: this.state.taskFor
    };
    this.props.addNewTask(newTask);
    this.props.closeModal();
    console.log("task added", newTask);
  };

  setTaskFor = (taskFor) => {
    this.setState({taskFor: taskFor});
  };

  render() {

    if(this.state.inputForTaskName !== ""){
      this.enableAddButton()
    }

    if(this.state.inputForTaskName === ""){
      this.disableAddButton()
    }

    console.log(this.state.disableAddButton, "current category", this.props.currentCategory);
    return (
        <div className="Form">
          <div className="LeftForm">
            <input
                className="TaskNameInput"
                type="text"
                value={this.state.taskNameInput}
                onChange={(event) => this.updateInputForTaskName(event)}
                placeholder="I want to ..."
            />
            <p className="Notes">Notes</p>
            <textarea
            className="TextAreaForNotes"
            placeholder="insert some notes here"
            onKeyUp={(event) => this.textAreaAdjust(event)}>
            </textarea>
          </div>
          <div className="VerticalLine"></div>
          <div className="RightForm">
            <p className="ListType">List</p>
            <p className="CategoryButton">{this.props.currentCategory}</p>
            <p className="RemindMe">Remind Me:</p>
            <button
                className="RemindButton"
                onClick={() => this.setTaskFor("today")}
            >
              Today
            </button>
            <button
                className="RemindButton"
                onClick={() => this.setTaskFor("tomorrow")}
            >
              Tomorrow
            </button>
            <button
                className="RemindButton"
                onClick={() => this.setTaskFor("upComing")}
            >
              UpComing
            </button>
            <button
                className="RemindButton"
                onClick={() => this.setTaskFor("someday")}>
              Someday
            </button>
          </div>
          <button
              className="AddTaskButton"
              onClick={this.addTask}
              disabled={this.state.disableAddButton}
          >
              Add Task
          </button>
        </div>
    );
  }
}

export default newTaskForm;