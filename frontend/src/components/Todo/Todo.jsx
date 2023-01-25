//this is the todo page

import { React, useState, useEffect } from "react";
import { FaTasks, FaEdit, FaTrashAlt, FaCheckCircle } from "react-icons/fa";
import "./Todo.css";

const Todo = (props) => {
  const [tasks, setTasks] = useState([""]);
  const [task, setTask] = useState("");
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [todo, setTodo] = useState("");
  const [email, setEmail] = useState(props.userEmail);
  const [dbData, setDbData] = useState(props.dataObj || []);
  const [newTodoList, setNewTodoList] = useState([]);

  console.log(dbData);
  console.log(props.dataObj);
  console.log("email in todo.jsx", email);

  // let userEmail = sessionStorage.getItem("email");
  //getting the JWT token
  let authToken = sessionStorage.getItem("token");

  //function to submit a todo
  const submitHandler = (e) => {
    console.log("submit handler 1");
    e.preventDefault();
    if (task) {
      setTasks([...tasks, task]);
      //setTask("");
    } else {
      //setError("Type Something to add");
      return;
    }
    console.log("submit handler 2");
    fetch("http://localhost:8080/todo/create", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-type": "application/json",
      },
      body: JSON.stringify({ todo: task, email: email }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("response", response);
        setDbData([{ todo: response.todo }]);
        console.log("dbData", dbData);
        console.log("dbData.todo", dbData[0].todo);

        console.log("repsonse from submit", [response.todo]);
      });

    console.log(" todo from DB", todo);
  };

  const changeHandler = (e) => {
    if (e.target.value.length === 0) {
      setTask("");
      setError("");
      return;
    } else {
      setTask(e.target.value);
      setError("");
    }
  };

  //function to delete a todo
  function deleteThis(index, e) {
    console.log(e.target.dataset.todo);

    // setTasks(newTasks);
    fetch("http://localhost:8080/todo/delete", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        todo: e.target.dataset.todo,
        email: props.userEmail,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setDbData(response);
      });
  }

  const setUpdate = (key) => {};

  return (
    <>
      <div className="todo-main-container">
        <div className="todo-container">
          <h1 className="todo-title">
            Task Lists <FaTasks />
          </h1>
          <form onSubmit={submitHandler}>
            <input
              className="todo-input"
              type="text"
              placeholder="Add new task..."
              onChange={changeHandler}
              value={task}
              autoComplete="off"
            />
            {error && <label className="error">{error}</label>}
          </form>
          {tasks.length >= 0 && (
            <ul className="todo-items">
              {dbData?.length > 0 &&
                dbData?.[0].todo.map((todo, index) => (
                  <li key={index} className="lists">
                    <input
                      className="todo-name"
                      type="text"
                      disabled={disabled}
                      key={index}
                      value={todo}
                      onChange={setUpdate(index)}
                    />

                    <button
                      className="todo-icon todo-delete"
                      data-todo={todo}
                      onClick={(e) => deleteThis(index, e)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Todo;
