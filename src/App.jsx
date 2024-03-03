/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Form from "./compononts/form";
import FilterButton from "./compononts/filterButton";
import Todo from "./compononts/todo";
import { useState } from "react";
import { nanoid } from "nanoid";


function App(props) {
  
  const [tasks, setTask] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTask([...tasks, newTask]);
  }
    
  function toggleTaskCompleted(id) {
    // console.log(tasks[0]);
    const updatedTask = tasks.map((task=>{
      if(task.id == id) {
        // task.completed =!task.completed;
        return{...task, completed:!task.completed}
    }
    return task;
    }))
      setTask(updatedTask);
  }

  function deleteTask(id){
    // console.log("deleteTask", id);
    const deletedTask = tasks.filter((task)=> task.id != id);
    setTask(deletedTask);
  }

  function editTask(id, newName){
    const newTaskList = tasks.map((task)=>{
      if(task.id == id){
        return {...task, name: newName};
      }
      return task;
    })
    setTask(newTaskList);
  }

  const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
  };
  
  const FILTER_NAMES = Object.keys(FILTER_MAP);


  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));


  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));  
  
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">3 tasks remaining</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
