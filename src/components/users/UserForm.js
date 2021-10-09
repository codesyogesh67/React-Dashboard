import React, { useState, useEffect } from "react";
import "./UserForm.css";
import db from "../../firebase";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectUserInfo } from "../../features/userSlice";
import { useHistory } from "react-router-dom";
import UserTransaction from "./UserTransaction";
import UserDeleteModal from "./UserDeleteModal";
import { Modal } from "@mui/material";
import {
  selectdeleteCustomerModal,
  updateDeleteCustomerModal,
} from "../../features/extraSlice";

function UserForm(props) {
  const {
    first_name,
    last_name,
    email,
    username,
    role,
    id,
  } = props.location.state;

  const user = useSelector(selectUser);
  const deleteCustomerModal = useSelector(selectdeleteCustomerModal);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(first_name);
  const [lastName, setLastName] = useState(last_name);
  const [emailId, setEmailId] = useState(email);
  const [userName, setUserName] = useState(username);
  const [userRole, setUserRole] = useState(role);
  const history = useHistory();
  const userInfo = useSelector(selectUserInfo);
  const [userOrders, setUserOrders] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    db.collection("orders")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        const orders = snapshot.docs.filter(
          (doc) => doc.data().customer.email === email
        );
        setUserOrders(
          orders.map((order) => ({ id: order.id, data: order.data() }))
        );
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInfo?.role === "Manager") {
      db.collection("users").doc(id).update({
        first_name: firstName,
        last_name: lastName,
        email: emailId,
        username: userName,
        role: userRole,
      });
      history.push("/users");
    }
  };

  return (
    <div className="userForm">
      <div className="userForm__container">
        {userOrders.length > 0 && (
          <UserTransaction username={userName} email={emailId} role={role} />
        )}

        <form className="userForm__form" onSubmit={handleSubmit}>
          <div className="userForm__row">
            <label>First Name</label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="userForm__row">
            <label>Last Name</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="userForm__row userForm__email">
            <label>Email</label>
            <p>{emailId}</p>
          </div>
          <div className="userForm__row">
            <label>Username</label>
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="userForm__row">
            <label>Role</label>{" "}
            {userInfo.role === "Manager" ? (
              <input
                // style={{ border: "none", background: "transparent" }}
                defaultValue="Customer"
              />
            ) : (
              <p>{userRole}</p>
            )}
          </div>

          <div className="userForm__buttons">
            <button onClick={() => history.goBack()} className="userForm__back">
              Back
            </button>
            <button>Save</button>
          </div>
        </form>

        <button
          onClick={() => dispatch(updateDeleteCustomerModal())}
          className="userForm__deleteUser"
        >
          Delete customer
        </button>
        <Modal
          open={deleteCustomerModal}
          onClose={() => dispatch(updateDeleteCustomerModal())}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <UserDeleteModal id={id} email={email} />
        </Modal>
      </div>
    </div>
  );
}

export default UserForm;
