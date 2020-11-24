import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
} from "@material-ui/core";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { removeStatus } from "../../features/userSlice";
import DeleteIcon from "@material-ui/icons/Delete";
import db from "../../firebase";

function UsersList({ usersList }) {
  const removeStatusInfo = useSelector(removeStatus);
  // const user = JSON.parse(localStorage.getItem("user"));
  // const userId = useSelector(selectUserId);

  const deleteUser = (id) => {
    db.collection("users").doc(id).delete();
  };

  return (
    <div className="usersList__list">
      <TableContainer component={Paper}>
        <Table stickyHeader size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersList.map(
              ({
                id,
                data: { first_name, last_name, email, username, role },
              }) => (
                <TableRow key={id}>
                  <TableCell align="center">
                    <Link
                      to={{
                        pathname: `/users/${first_name}-${last_name}/edit`,
                        state: {
                          first_name,
                          last_name,
                          email,
                          username,
                          role,
                          id,
                        },
                      }}
                    >
                      <p className="usersList__fullName">
                        {first_name} {last_name}
                      </p>
                    </Link>
                  </TableCell>
                  <TableCell align="center"> {username}</TableCell>
                  <TableCell align="center">{email}</TableCell>
                  <TableCell align="center">{role}</TableCell>
                  {removeStatusInfo && (
                    <TableCell align="center">
                      <DeleteIcon onClick={() => deleteUser(id)} />
                    </TableCell>
                  )}
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UsersList;
