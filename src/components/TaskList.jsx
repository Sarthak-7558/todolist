import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, fetchWeatherForTasks } from "../redux/actions/taskActions";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

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
    <div style={styles.container}>
      {tasks.length === 0 ? (
        <div style={styles.noTask}>No tasks to show 🎉</div>
      ) : (
        tasks.map((task, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.taskHeader}>
              <div
                style={
                  taskStatusList[index] ? styles.completTask : styles.taskText
                }
                onClick={() => toggleStatus(index)}
              >
                <b>{task.text}</b>{" "}
                <span
                  style={
                    task.priority === "High"
                      ? styles.priority
                      : styles.lowPriority
                  }
                >
                  ({task.priority})
                </span>
              </div>
              <button
                style={styles.deleteBtn}
                onClick={() => dispatch(deleteTask(index))}
              >
                ❌
              </button>
            </div>
            {console.log(task.taskLocation)}
            {task.priority === "High" &&
              weather &&
              task.taskLocation === "OutDoor" && (
                <div style={styles.weather}>
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
      {error && <div style={styles.error}>Weather API Error: {error}</div>}
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

const styles = {
  container: {
    maxWidth: "600px",
    margin: "20px auto",
    padding: "0 16px",
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s",
  },
  taskHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  lowPriority: {
    color: "gold",
    marginLeft: "6px",
    fontStyle: "italic",
  },
  taskText: {
    fontSize: "1.1rem",
    color: "#333",
    marginBottom: "4px",
    cursor: "pointer",
  },
  completTask: {
    textDecoration: "line-through",
    cursor: "pointer",
  },
  priority: {
    color: "#ff6347",
    marginLeft: "6px",
    fontStyle: "italic",
  },
  deleteBtn: {
    backgroundColor: "transparent",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "background-color 0.2s",
  },
  weather: {
    marginTop: "10px",
    fontSize: "0.95rem",
    color: "#555",
  },
  error: {
    color: "red",
    marginTop: "16px",
    textAlign: "center",
  },
  noTask: {
    textAlign: "center",
    color: "#888",
    fontSize: "1.1rem",
    marginTop: "30px",
  },
};

export default TaskList;
