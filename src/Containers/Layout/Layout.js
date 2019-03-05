import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import './Layout.css';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';
import Modal from "../../Components/UI/Modal/Modal";
import NewTaskForm from '../../Components/NewTaskForm/NewTaskForm';
import TodoCategoryListCard from "../../Components/TodoCategory/TodoCategoryList/TodoCategoryListCard";

class Layout extends Component {
  state = {
      showSideDrawer: true,
      showAddTaskModal: false,
      currentCategory: "All Tasks",
      idIndicator: 0,
      personal: {
        today:[],
        tomorrow: [],
        upComing: [],
        someday: []
      },
      work: {
        today:[],
        tomorrow: [],
        upComing: [],
        someday: []
      },
      groceryList: {
        today: [],
        tomorrow: [],
        upComing: [],
        someday: []
      }
  };

  sideDrawerClosedHandler = () => {
    this.setState( { showSideDrawer: false } );
  };

  sideDrawerToggleHandler = () => {
    this.setState( ( prevState ) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    } );
  };

  showTodoHandler = (todoCategory) => {
    this.setState({showTodoFor: todoCategory});
  };

  showAddTaskModalHandler = () => {
    this.setState({showAddTaskModal: true});
  };

  modalClosed = () => {
    this.setState({showAddTaskModal: false});
  };

  updateCurrentCategory = (category) => {
    this.setState({currentCategory: category});
  };

  addNewTaskHandler = (newTask) => {
    let taskCat= newTask.category;
    let taskCatList = {...this.state[taskCat]};
    let newAddedTask = {
      id: this.state.idIndicator+1,
      name: newTask.name,
      notes: newTask.notes,
      category: newTask.category,
      taskFor: newTask.taskFor
    };
    console.log("new Added task", newAddedTask);
    taskCatList[newTask.taskFor].push(newAddedTask);
    // console.log("add new task",newTask, "taskCat", taskCat, this.state[taskCat], taskCatList);
    this.updateState(taskCat, taskCatList);
  };

  closeAddNewForm = () => {
    this.setState({showAddTaskModal: false});
  };

  updateNotesForTask = (event, task) => {
    console.log("update", event.target.value, task);
    let taskCat= task.category;
    let taskCatList = {...this.state[taskCat]};

    taskCatList[task.taskFor].forEach((eachTask) => {
      if(eachTask.id === task.id){
        const index = taskCatList[task.taskFor].indexOf(eachTask);
        taskCatList[task.taskFor][index].notes = event.target.value;
      }
    });

    this.updateState(taskCat, taskCatList);
    // console.log("add new task",newTask, "taskCat", taskCat, this.state[taskCat], taskCatList);


  };

  updateState = (taskCat, taskCatList) => {
    if(taskCat === "personal") {
      this.setState({...this.state, personal: taskCatList, idIndicator: this.state.idIndicator+1});
    }
    if(taskCat === "work") {
      this.setState({...this.state, work: taskCatList, idIndicator: this.state.idIndicator+1});
    }
    if(taskCat === "groceryList") {
      this.setState({...this.state, groceryList: taskCatList, idIndicator: this.state.idIndicator+1});
    }
  };

  addQuickTaskHandler = (taskName) => {
    console.log(taskName);
    let category = this.state.currentCategory;

    if(this.state.currentCategory === "All Tasks"){
      category="personal";
    }

    let quickTask ={
      name: taskName,
      notes: "",
      category: category,
      taskFor: "today"
    };

    this.addNewTaskHandler(quickTask);
  };

  removeTaskHandler = (task) => {
    console.log("taskId:", task);
    let taskCat= task.category;
    let taskCatList = {...this.state[taskCat]};
    console.log(taskCatList[task.taskFor]);
    taskCatList[task.taskFor].forEach((eachTask) => {
      if(eachTask.id === task.id){
        console.log("found", taskCatList[task.taskFor].indexOf(eachTask));
        const index = taskCatList[task.taskFor].indexOf(eachTask);
        taskCatList[task.taskFor].splice(index, 1);
      }
    });

    // console.log("add new task",newTask, "taskCat", taskCat, this.state[taskCat], taskCatList);
    this.updateState(taskCat, taskCatList);

  };

  render () {
    console.log(this.state);
    let stateAsProps={
      personal:{...this.state.personal},
      work:{...this.state.work},
      groceryList:{...this.state.groceryList}
    };

    console.log(this.state.currentCategory);

    return (
        <Aux>
          <Modal show={this.state.showAddTaskModal} modalClosed={this.modalClosed}>
            <NewTaskForm
                currentCategory={this.state.currentCategory}
                addNewTask={this.addNewTaskHandler}
                closeModal={this.closeAddNewForm}
            />
          </Modal>
          <Toolbar
              drawerToggleClicked={this.sideDrawerToggleHandler}
              addNewButtonClicked={this.showAddTaskModalHandler}
          />
          <SideDrawer
              open={this.state.showSideDrawer}
              closed={this.sideDrawerClosedHandler}
              todoCategoryClicked={this.showTodoHandler}
              currentCategory={this.updateCurrentCategory}
              updateNotes={this.updateNotesForTask}
              category={this.state.currentCategory}
          />
          <TodoCategoryListCard
            category={this.state.currentCategory}
            tasks={stateAsProps}
            addQuickTask={this.addQuickTaskHandler}
            removeTask={this.removeTaskHandler}
            updateNotes={this.updateNotesForTask}
          />
        </Aux>
    )
  }
}

export default Layout;