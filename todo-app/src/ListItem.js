import React, { useState } from "react";

function ListItem(props) {
  const [editable, setEditable] = useState(false);
  const [taskChange, setTaskChange] = useState(props.task.task);
  const saveEditedTask = () => {
    props.editHandler(taskChange, props.id);
    setEditable(false);
  };
  return (
    <div className="taskContainer">
      {editable ? (
        <>
            <textarea
              className="editTextBox"
              placeholder="edit task"
              value={taskChange}
              onChange={(e) => setTaskChange(e.target.value)}
            ></textarea>
          <div>
            <button onClick={saveEditedTask} disabled={taskChange.length === 0}>
              Save Task
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="textItem">{`${props.id + 1}. ${props.task.task}`}</div>
          <div className="btn">
            <button onClick={() => setEditable(true)}>Edit</button>
            <button onClick={() => props.deleteHandler(props.id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ListItem;
