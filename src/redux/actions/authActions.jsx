export const login = (credentials) => (dispatch) => {
    const { email, password } = credentials;
  
    if (email === "admin@123.com" && password === "admin123") {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { email },
      });
    } else {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: "Invalid email or password",
      });
    }
  };
  
  export const logout = () => ({
    type: "LOGOUT",
  });
  