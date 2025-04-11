import React from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import "./TaskPage.css"; // Import the external CSS

const TaskPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="task-page-container">
      <div className="task-page-header">
        <h1>
          <i className="fa-duotone fa-list-check"></i> My To-do 
        </h1>
        <button className="logout-btn" onClick={handleLogout}>
          <i className="fa fa-sign-out" style={{ marginRight: "5px" }}></i>
          LogOut
        </button>
      </div>

      <div>
        <TaskInput />
        <TaskList />
      </div>
    </div>
  );
};

export default TaskPage;
