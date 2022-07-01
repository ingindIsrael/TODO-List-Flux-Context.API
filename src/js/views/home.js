//IMPORTS
import React from "react";
import "../../styles/home.css";
import { useContext, createContext, useState } from "react";

const Context = createContext();

export const Home = () => {
  // Initialize array with placeholder values
  const tasksList = ["test1", "test2", "test3"];

  //Set States
  const [newTask, setnewTask] = useState(tasksList);
  const [remainingTasks, setremainingTasks] = useState(newTask.length);

  //Append new task to current array
  const handleNewTask = (newTask) => {
    setnewTask((current) => [...current, newTask]);
    setremainingTasks(remainingTasks + 1);
  };

  //Remove "li" when X button is clicked
  function handleDeleteTask(item) {
    item.target.parentNode.parentNode.remove();
    setremainingTasks(remainingTasks - 1);
  }

  return (
    <Context.Provider
      value={{ newTask, remainingTasks, handleDeleteTask, handleNewTask }}
    >
      <ToDos />
    </Context.Provider>
  );
};

const ToDos = () => {
  const value = useContext(Context);

  const listItems = value.newTask.map((item, index) => {
    return (
      <li key={index} className="d-flex flex-row justify-spacing-between">
        {item}
        <span
          type="button"
          onClick={value.handleDeleteTask}
          className="delete-button"
        >
          <i className="fas fa-times"></i>
        </span>
      </li>
    );
  });

  return (
    <div>
      <h1 className="todo-header">Todos</h1>
      <div className="todos-container d-flex flex-column">
        <div className="todos-container-header d-flex flex-row">
          <span className="me-3">Tasks</span>
          <Inputs onTask={value.handleNewTask} />
        </div>

        <div className="todos-container-body flex-grow-1">
          <ul>{listItems}</ul>
        </div>

        <div className="todos-container-footer flex-grow-1">
          {value.remainingTasks === 0
            ? "No tasks, add a task"
            : `Number of Tasks: ${value.remainingTasks}`}
        </div>
      </div>
    </div>
  );
};

const Inputs = (props) => {
  const [inputValue, setInputValue] = useState("");

  const targetInputEvent = (e) => {
    setInputValue(e.target.value);
  };
  const passToParent = (e) => {
    if (e.key === "Enter") {
      props.onTask(inputValue);
      setInputValue("");
    }
  };
  return (
    <input
      type="text"
      onChange={targetInputEvent}
      value={inputValue}
      onKeyDown={passToParent}
      placeholder="Enter Task"
    />
  );
};
