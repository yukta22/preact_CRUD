import { h, render } from "preact";
import preactLogo from "./assets/preact.svg";
import "./style.css";
import { useState, useEffect } from "preact/hooks"; // Import the useState hook
import axios from "axios";
import { Router, route } from "preact-router";

export function Form() {
  interface Idata {
    id: number;
    email: string;
    password: string;
  }

  const [data, setData] = useState<Idata>();
  const [flag, setFlag] = useState<boolean>(false);
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const userDataParam = queryParams.get("userData");

    if (userDataParam) {
      const userData = JSON.parse(userDataParam);

      console.log(userData);
      setData(userData);
      setFlag(true);
    }
  }, []);

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await axios.post("http://127.0.0.1:8000/register", data);
    console.log(res);
    if (res) route("/", true);
  };

  const handleEdit = async (e: any) => {
    const res = await axios.put(`http://127.0.0.1:8000/${data.id}`, data);
    console.log(res);
    if (res) route("/", true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={data?.email}
          onChange={handleChange} // Update the email state on change
          name="email"
          required
        />
      </div>
      <br></br>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={data?.password}
          onChange={handleChange}
          name="password" // Update the password state on change
          required
        />
      </div>
      <br></br>

      <div>
        {flag ? (
          <button type="button" onClick={handleEdit}>
            Edit
          </button>
        ) : (
          <button type="submit">Submit</button>
        )}
      </div>
    </form>
  );
}
