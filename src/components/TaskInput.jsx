import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/actions/taskActions";
import "./TaskInput.css"; // Import the CSS file

const TaskInput = () => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [taskLocation, setTaskLocation] = useState("InDoor");
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (task.trim()) {
      dispatch(addTask(task, priority , taskLocation));
      setTask("");
    }
  };

  return (
    <div className="task-input-container">
      <input
        className="task-input"
        placeholder="Enter task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <select
        className="task-priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <select
        className="task-priority"
        value={taskLocation}
        onChange={(e) => setTaskLocation(e.target.value)}
      >
        <option>InDoor</option>
        <option>OutDoor</option>
      </select>
      <button className="task-button" onClick={handleAdd}>
        Add Task
      </button>
    </div>
  );
};

export default TaskInput;