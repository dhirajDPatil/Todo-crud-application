import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import "./App.css";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState("");

  const addTaskHandler = () => {
    fetch("http://localhost:9090/todo", {
      method: "POST",
      body: JSON.stringify({ task }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("Got data from backend", response);
        taskList.push(response);
        setTaskList([...taskList]);
        setTask("");
      });
  };

  const editHandler = (Newtask, id) => {
    const idToEdit = taskList[id].id;
    fetch(`http://localhost:9090/todo/${idToEdit}`, {
      method: "PUT",
      body: JSON.stringify({id, task: Newtask}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        taskList[id] = response;
        setTaskList([...taskList]);
      });
  };

  const deleteHandler = (idx) => {
    const idToDelete = taskList[idx].id;
    fetch(`http://localhost:9090/todo/${idToDelete}`, {
      method: "DELETE",
    }).then((res) => {
      console.log("Deleted successfully", res);
      taskList.splice(idx, 1);
      setTaskList([...taskList]);
    });
  };

  useEffect(() => {
    // fetched all data on load and displayed
    fetch("http://localhost:9090/todo")
      .then((response) => response.json())
      .then((result) => {
        const sortArr = result.sort((a, b) => a.id - b.id);
        // const temp = sortArr.map((e)=> e.task)
        setTaskList(sortArr);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div className="App">
      <div className="container">
        <textarea
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="enter task here"
        ></textarea>

        <button onClick={addTaskHandler} disabled={task.trim().length === 0}>
          Add Task
        </button>
      </div>
      {taskList.length === 0 ? (
        <></>
      ) : (
        <div>
          {taskList.map((task, index) => {
            return (
              <ListItem
                key={`${task.task}_${index}`}
                editHandler={editHandler}
                deleteHandler={deleteHandler}
                task={task}
                id={index}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
