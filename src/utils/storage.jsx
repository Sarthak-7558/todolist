export const saveTasksToStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  
  export const getTasksFromStorage = () => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  };
  