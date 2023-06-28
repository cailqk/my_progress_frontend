import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../requests/API";
import { Modal } from "../../shared/components/Modal";
import { dateParser } from "../../shared/utils/dateFunctions";
import { RoutesEnum } from "../../shared/utils/enums";
import { User } from "../../shared/utils/interfaces";

const ShowUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const getUsers = () => {
    api.get("users").then((res) => {
      setUsers(res);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteHandler = (id: string) => {
    api.del(`users/${id}`).then(() => {
      getUsers();
    });
  };

  const editHandler = (id: string) => {
    navigate(`${RoutesEnum.user_edit}/${id}`);
  };

  const userData = users
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((user) => {
      return (
        <tr key={user._id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.gender}</td>
          <td>{user.role}</td>
          <td>{dateParser(user.dateOfBirth)}</td>
          <td>{user.height} cm</td>
          <td style={{ display: "flex", justifyContent: "space-evenly" }}>
            <button
              className="btn btn-success"
              onClick={() => editHandler(user._id)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              data-bs-toggle="modal"
              data-bs-target="#modal"
              onClick={() => setId(user._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });

  return (
    <>
      <Modal
        text={"Are you sure you want to delete this user ?"}
        onConfirm={() => deleteHandler(id)}
        cancelButtonText={"No"}
        confirmButtonText={"Yes"}
      />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Gender</th>
            <th scope="col">Role</th>
            <th scope="col">Date of Birth</th>
            <th scope="col">Height(cm)</th>
          </tr>
        </thead>
        <tbody>{userData}</tbody>
      </table>
    </>
  );
};

export default ShowUsers;
