import { useRef } from "react";
import Form from "react-bootstrap/Form";

import { verifyUser } from "../../data/users.jsx";
import "./Login.css";

const Login = ({ setToken, setRole }) => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  return (
    <div className="login-conatiner">
      <Form.Label htmlFor="username">Username</Form.Label>
      <Form.Control
        type="text"
        id="username"
        placeholder="admin"
        style={{ textAlign: "center" }}
        ref={usernameRef}
      />
      <Form.Label htmlFor="password">Password</Form.Label>
      <Form.Control
        type="password"
        id="password"
        placeholder="adminpass"
        style={{ textAlign: "center" }}
        ref={passwordRef}
      />
      <button
        className="btn btn-success mt-3"
        onClick={() => {
          const username = usernameRef.current.value.trim();
          const password = passwordRef.current.value.trim();
          const userInfo = verifyUser(username, password);
          usernameRef.current.value = "";
          passwordRef.current.value = "";
          if (userInfo === null) {
            alert("Wrong username or password");
            usernameRef.current.focus();
          } else {
            setToken(userInfo.token);
            setRole(userInfo.role);
          }
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
