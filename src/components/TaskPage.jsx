import React from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

const TaskPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>
          {" "}
          <i className="fa-duotone fa-list-check"></i> My To-do List
        </h1>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
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
