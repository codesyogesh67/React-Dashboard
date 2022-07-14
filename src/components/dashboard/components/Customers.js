import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Typography,
  ListItemText,
  Avatar,
} from "@mui/material";
import db from "../../../firebase";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updatePrevUsersList } from "../../../features/userSlice";
import AvatarColors from "./AvatarColors"

function Customers() {
  const [customer, setCustomer] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      db.collection("users").onSnapshot((snapshot) => {
        const filteredDoc = snapshot.docs?.filter(
          (doc) => doc.data().role === "Customer"
        );
        dispatch(
          updatePrevUsersList(
            filteredDoc.map((doc) => ({ id: doc.id, data: doc.data() }))
          )
        );
        setCustomer(
          filteredDoc.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
    }

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="dashboard__customers">
      <div className="dashboard__customersHeader">
        <p className="dashboard__customersTitle">Top Customers</p>
        <button>View All</button>
      </div>
      <div className="dashboard__customerList">
        <List>
          {customer.map((each) => {
            const {
              id,
              data: { first_name, last_name, email, role, username },
            } = each;

            return (
              <Link
                key={id}
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
                <ListItem alignItems="flex-start" className="dashboard__customersList">

                  <ListItemAvatar>

                    {/* <Avatar
                      alt={first_name.toUpperCase()}
                      src="/static/images/avatar/1.jpg"
                    /> */}
                    <AvatarColors name={first_name?.toUpperCase()} />

                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      first_name.charAt(0).toUpperCase() +
                      first_name.slice(1) +
                      " " +
                      last_name.charAt(0).toUpperCase() +
                      last_name.slice(1)
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        ></Typography>
                        {email}
                      </React.Fragment>
                    }
                  />

                </ListItem>
              </Link>

            );
          })}
        </List>
      </div>
    </div >
  );
}

export default Customers;
