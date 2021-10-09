import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  selectPrevUsersList,
  updateFilterdList,
} from "../../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import {
  updateFilterStatus,
  selectSearchIcon,
  updateSearch,
} from "../../features/extraSlice";
import GroupIcon from "@mui/icons-material/Group";

function UsersHeader() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const list = useSelector(selectPrevUsersList);
  const searchIcon = useSelector(selectSearchIcon);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input !== "") {
      const filteredList = list.filter(
        (list) =>
          list.first_name.includes(input) ||
          list.last_name.includes(input) ||
          list.email.includes(input)
      );
      dispatch(updateFilterdList(filteredList));
      dispatch(updateFilterStatus(true));
    }
  };

  return (
    <div className="usersHeader">
      {searchIcon ? (
        <form className="usersHeader__searchForm" onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search"
          />
        </form>
      ) : (
        <h2 className="usersHeader__title">Users</h2>
      )}
      <div className="usersHeader__button">
        <Link to="/users/add-new-user">
          <PersonAddAltIcon className="usersHeader__addButton" />
        </Link>
        {searchIcon ? (
          <GroupIcon
            className="usersHeader__searchButton"
            onClick={() => {
              dispatch(updateSearch());
              dispatch(updateFilterStatus(false));
              dispatch(updateFilterdList([]));
            }}
          />
        ) : (
          <PersonSearchIcon
            onClick={() => dispatch(updateSearch())}
            className="usersHeader__searchButton"
          />
        )}
      </div>
    </div>
  );
}

export default UsersHeader;
