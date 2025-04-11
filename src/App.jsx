import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import TaskPage from "./components/TaskPage"; // your main to-do component
import { useSelector } from "react-redux";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/tasks"
        element={isAuthenticated ? <TaskPage /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
