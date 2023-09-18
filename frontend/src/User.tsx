import { h, render } from "preact";
import { useState, useEffect } from "preact/hooks";
import axios from "axios";
import { route } from "preact-router";

const User = () => {
  interface Idata {
    id: number;
    email: string;
    password: string;
  }
  const [data, setData] = useState<Idata[]>();
  const [flag, setFlag] = useState<boolean>(false);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/users").then((response) => {
      setData(response.data);
    });
  }, [flag]);

  const handleDelete = async (id: number) => {
    setFlag(true);
    const res = await axios.delete(`http://127.0.0.1:8000/${id}`);
    console.log(res);
  };

  const handleUpdate = async (ele: Idata) => {
    const queryParams = new URLSearchParams({
      userData: JSON.stringify(ele),
    });
    route(`/form?${queryParams.toString()}`);
  };

  return (
    <>
      <div>
        <h3 style={{ textAlign: "center" }}>User data</h3>
        <table class="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Password</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((ele: Idata) => {
              return (
                <tr>
                  <td>{ele.email}</td>
                  <td>{ele.password}</td>
                  <td>
                    <button type="button" onClick={() => handleUpdate(ele)}>
                      Update
                    </button>
                  </td>
                  <td>
                    <button type="button" onClick={() => handleDelete(ele.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default User;
