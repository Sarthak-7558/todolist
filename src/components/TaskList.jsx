import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, fetchWeatherForTasks ,loadTasks} from "../redux/actions/taskActions";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./TaskList.css"; // Import external CSS


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TaskList = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const { tasks, weather, error } = useSelector((state) => state.task);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [taskStatusList, setTaskStatusList] = useState(tasks.map(() => false));
  const prevTasksLength = useRef(tasks.length);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(loadTasks());
  },[]);

  useEffect(() => {
    dispatch(fetchWeatherForTasks());
  }, [tasks]);

  useEffect(() => {
    if (tasks.length > prevTasksLength.current) {
      setSnackbarMsg("Task added successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } else if (tasks.length < prevTasksLength.current) {
      setSnackbarMsg("Task deleted!");
      setSnackbarSeverity("info");
      setSnackbarOpen(true);
    }
    prevTasksLength.current = tasks.length;
  }, [tasks]);

  const toggleStatus = (index) => {
    const updatedStatus = [...taskStatusList];
    updatedStatus[index] = !updatedStatus[index];
    setTaskStatusList(updatedStatus);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="task-container">
      {tasks.length === 0 ? (
        <div className="no-task">No tasks to show 🎉</div>
      ) : (
        tasks.map((task, index) => (
          <div key={index} className="task-card">
            <div className="task-header">
              <div
                className={taskStatusList[index] ? "task-complete" : "task-text"}
                onClick={() => toggleStatus(index)}
              >
                <b>{task.text}</b>{" "}
                <span className={task.priority === "High" ? "priority-high" : "priority-low"}>
                  ({task.priority})
                </span>
              </div>
              <button
                className="delete-btn"
                onClick={() => dispatch(deleteTask(index))}
              >
                ❌
              </button>
            </div>
            {task.priority === "High" &&
              weather &&
              task.taskLocation === "OutDoor" && (
                <div className="weather-info">
                  <span role="img" aria-label="weather">
                    ☀️
                  </span>{" "}
                  Weather: <strong>{weather.main.temp}°C</strong>,{" "}
                  {weather?.current?.condition?.text}
                </div>
              )}
          </div>
        ))
      )}
      {error && <div className="task-error">Weather API Error: {error}</div>}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TaskList;
