import React, { useEffect } from "react";
import Alert from "@mui/material/Alert";
import "./Message.css";

import { useDispatch, useSelector } from "react-redux";
import { updateMessageStatus } from "../../features/messageSlice";

function Message(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    const timeId = setTimeout(() => {
      dispatch(updateMessageStatus(false));
    }, 2000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  return (
    <div className="message">
      <Alert severity="error">{props.message}</Alert>
    </div>
  );
}

export default Message;
