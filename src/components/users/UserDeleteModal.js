import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { selectUserInfo } from "../../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import db from "../../firebase";
import { updateDeleteCustomerModal } from "../../features/extraSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UserDeleteModal = React.forwardRef(({ id, email }, ref) => {
  const history = useNavigate();
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  const deleteAccount = () => {
    if (user.role === "Manager") {
      db.collection("users").doc(id).delete();
      db.collection("orders").onSnapshot((snapshot) => {
        snapshot.docs.filter((doc) => {
          if (doc.data().customer.email === email) {
            db.collection("orders").doc(doc.id).delete();
          }
        });
      });
    }
    history.goBack();
  };
  return (
    <Box className="userDeleteModal__box" sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Are you sure you want to delete the customer?
      </Typography>
      <Typography
        className="userDeleteModal__buttons"
        id="modal-modal-description"
        sx={{ mt: 2 }}
      >
        <button onClick={deleteAccount}>Delete</button>
        <button onClick={() => dispatch(updateDeleteCustomerModal())}>
          Go Back
        </button>
      </Typography>
    </Box>
  );
});

export default UserDeleteModal;
