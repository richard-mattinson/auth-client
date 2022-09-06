import "./App.css";
import { useState } from "react";
import Form from "./components/Form";
import Input from "./components/Input";

export default function App() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [loginUser, setLoginUser] = useState({ username: "", password: "" });
  const [registerResponse, setRegisterResponse] = useState("");
  const [loginResponse, setLoginResponse] = useState("");

  const register = async (event) => {
    event.preventDefault();
    // Write your register code here
    try {
      const { username, password } = user;

      if (!username || !password) {
        setRegisterResponse(`Please enter a username and password`);
      } else {
        await fetch("http://www.localhost:4000/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        setRegisterResponse(`Thank you for registering ${username}`);
      }
    } catch (error) {
      setRegisterResponse(`Error: registration failed`);
    }
  };

  const login = async (event) => {
    event.preventDefault();
    // Write your login code here
    try {
      const { username, password } = user;

      if (!username || !password) {
        setLoginResponse(`Please enter your username and password`);
      } else {
        const response = await fetch("http://www.localhost:4000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        const login = await response.json();
        localStorage.setItem("token", login.token); // key/value pair
        setLoginResponse(`Welcome back ${username}`);
      }
    } catch {
      setLoginResponse(`Error: login failed`);
    }
  };

  // You can safely ignore everything below this line, it's just boilerplate
  // so you can focus on the exercise requirements

  const handleRegisterChange = (event) => {
    const { value, name } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleLoginChange = (event) => {
    const { value, name } = event.target;

    setLoginUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div className="App">
      <h1>Register</h1>

      <Form
        handleSubmit={register}
        inputs={[
          <Input
            key={1}
            type="text"
            name="username"
            placeholder="Username"
            value={user.username}
            handleChange={handleRegisterChange}
          />,
          <Input
            key={2}
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            handleChange={handleRegisterChange}
          />,
        ]}
      />

      {registerResponse && <p>{registerResponse}</p>}

      <h1>Login</h1>

      <Form
        handleSubmit={login}
        inputs={[
          <Input
            key={1}
            type="text"
            name="username"
            placeholder="Username"
            value={loginUser.username}
            handleChange={handleLoginChange}
          />,
          <Input
            key={2}
            type="password"
            name="password"
            placeholder="Password"
            value={loginUser.password}
            handleChange={handleLoginChange}
          />,
        ]}
      />

      {loginResponse && <p>{loginResponse}</p>}
    </div>
  );
}
