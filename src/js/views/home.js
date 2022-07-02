//IMPORTS
import React from "react";
import "../../styles/home.css";
import { useContext, createContext, useState } from "react";
import { Context } from "../store/appContext";

//Home is the parent component and ToDos is nested inside it
export const Home = () => {
  // here we are making a link between flux.js and home.js to be able to 
  // access the store and the actions at our will
  const { store, actions } = useContext(Context);
  
  //Set States
  const [taskList, setTaskList] = useState(store.list);
  
  //Append new task to current array
  const handleNewTask = (taskList) => {
      setTaskList(
        //we use the actions from flux.js
        actions.addTask(0, taskList)
        )
  };

  //Remove "li" when X button is clicked
  function handleDeleteTask(task) {
    console.log("handleDeleteTask task",task)
    
    //we use the actions from flux.js
    setTaskList(actions.removeTask(task))
  }

  return (
    <Context.Provider value={{ taskList, handleDeleteTask, handleNewTask }}>
      {/* All Components inside Context.Provider get acces to value */}
      <ToDos />
    </Context.Provider>
  );
};

//This ToDos component is nested inside the Home component
const ToDos = () => {
  const props = useContext(Context);
  console.log("Coming from Context.Provider: ", props) // In this line we are printing in the console the values received from the Context.Provider
  const [inputValue, setInputValue] = useState(""); //the string we write gets store in this variable
  
  //we listen to each change in the text box and update the variable 
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  //we verify that enter was pressed to send the received string and delete the content of the text box
  const passNewTask = (e) => {
    if (e.key === "Enter") {
      props.handleNewTask(inputValue);
      setInputValue("");
    }
  };

  //we capture the entire element and send only the text that interests us
  function deleteTask(e) {
    console.log("e from delete", e.target.outerText)
    props.handleDeleteTask(e.target.outerText)
  }
  
  //we map and return a list with HTML tags
  const listItems = props.taskList.map((item, index) => {
    return (
      <li key={index} 
      className="d-flex flex-row justify-spacing-between"
      onClick={e => deleteTask(e)}
      >
        {item}
        <span
          type="button"
          className="delete-button"
        >
          <i className="fas fa-times"></i>
        </span>
      </li>
    );
  });

  // this is the return of ToDos
  return (
    <div>
      <h1 className="todo-header">To-dos</h1>
      <div className="todos-container d-flex flex-column">
        <div className="todos-container-header d-flex flex-row">

          <span className="me-3">Tasks</span>
          <input type="text"
            onChange={handleChange}
            value={inputValue}
            onKeyDown={passNewTask}
            placeholder="Enter Task"
            />

        </div>

        <div className="todos-container-body flex-grow-1">

          {/* Here we use the mapped list */}
          <ul>{listItems}</ul>

        </div>

      </div>
    </div>
  );
};

