import { useEffect, useState } from "react";
import * as api from "../../requests/API";
import CardLayout from "../../shared/layouts/CardLayout";
import { dateParser } from "../../shared/utils/dateFunctions";
import { User } from "../../shared/utils/interfaces";

const ShowUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api.get("users").then((res) => {
      setUsers(res);
    });
  }, []);

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
        </tr>
      );
    });

  return (
    <CardLayout>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Gender</th>
            <th scope="col">Role</th>
            <th scope="col">Birthday</th>
            <th scope="col">Height(cm)</th>
          </tr>
        </thead>
        <tbody>{userData}</tbody>
      </table>
    </CardLayout>
  );
};

export default ShowUsers;
