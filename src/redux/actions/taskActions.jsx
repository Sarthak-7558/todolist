import { fetchWeather } from "../../api/weatherApi";
import { saveTasksToStorage, getTasksFromStorage } from "../../utils/storage";

export const addTask = (text, priority, taskLocation) => (dispatch, getState) => {
  const task = { text, priority, taskLocation };
  dispatch({ type: "ADD_TASK", payload: task });
  saveTasksToStorage(getState().task.tasks);
};

export const deleteTask = (index) => (dispatch, getState) => {
  dispatch({ type: "DELETE_TASK", payload: index });
  saveTasksToStorage(getState().task.tasks);
};

export const fetchWeatherForTasks = () => async (dispatch, getState) => {
  const highPriorityTasks = getState().task.tasks.filter(
    (t) => t.priority === "High"
  );

  if (highPriorityTasks.length === 0) return;

  try {
    const data = await fetchWeather("Delhi");
    dispatch({ type: "FETCH_WEATHER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "FETCH_WEATHER_FAIL", payload: error.message });
  }
};

export const loadTasks = () => (dispatch) => {
  const tasks = getTasksFromStorage();
  dispatch({ type: "LOAD_TASKS", payload: tasks });
};
