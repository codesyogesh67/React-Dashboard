import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
} from "@mui/material";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectFilteredList,
  selectPrevUsersList,
} from "../../features/userSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import db from "../../firebase";
import { makeStyles } from "@mui/styles";
import { selectFilterStatus } from "../../features/extraSlice";

const useStyles = makeStyles({
  container: {
    maxHeight: 440,
  },
});

function UsersList() {
  const classes = useStyles();
  const [list, setList] = useState([]);

  const data = useSelector(selectPrevUsersList);
  const filteredList = useSelector(selectFilteredList);
  const filterStatus = useSelector(selectFilterStatus);

  useEffect(() => {
    if (filterStatus) {
      setList(filteredList);
    } else {
      setList(data);
    }
  }, [filteredList]);

  return (
    <div className="usersList__list">
      <TableContainer component={Paper} className={classes.container}>
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
            {list?.map(
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
