import React, { useState } from "react";
import "./SignUp.css";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

import { Formik } from "formik";
import db, { auth, getDoc, addDoc, where, collection, getDocs, query, doc }
  from "../../firebase";

import Message from "../header/Message";

function SignUp() {
  const history = useNavigate();

  const [message, setMessage] = useState({ status: false, body: "" });

  return (
    <div className="signUp">
      <div className="signUp__wrapper">
        <div className="signUp__container">
          {message?.status && <Message message={message?.body} />}
          <h2 className="signUp__title">Sign Up </h2>
          <Formik
            initialValues={{
              first_name: "",
              last_name: "",
              username: "",
              email: "",
              password: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              auth
                .createUserWithEmailAndPassword(values.email, values.password)
                .then((authUser) => {
                  console.log(authUser);
                  setTimeout(() => {
                    const q = collection(db, "users")

                    const values = {
                      first_name: values.first_name,
                      last_name: values.last_name,
                      username: values.username,
                      role: "Customer",
                      email: authUser.user.email,
                      id: authUser.user.uid,
                    }
                    const querySnapshot = addDoc(q, values)
                    // db.collection("users").add({
                    //   first_name: values.first_name,
                    //   last_name: values.last_name,
                    //   username: values.username,
                    //   role: "Customer",
                    //   email: authUser.user.email,
                    //   id: authUser.user.uid,
                    // });
                  }, 2000);
                  setSubmitting(false);
                })
                .catch((error) =>
                  setMessage({ status: true, body: error.message })
                );
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email()
                .required("Required")
                .matches(
                  /([^\s@]+@[^\s@]+\.[^\s@]{2,})/,
                  "Invalid email format"
                ),
              password: Yup.string()
                .required("Required")
                .min(6, "Password must be 6 characters long.")
                .matches(/(?=.*[0-9])/, "Password must contain a number."),
            })}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
              } = props;

              return (
                <form className="signUp__form" onSubmit={handleSubmit}>
                  <label>First Name</label>
                  <input
                    name="first_name"
                    type="name"
                    onChange={handleChange}
                    value={values.first_name}
                  />

                  <label>Last Name</label>
                  <input
                    name="last_name"
                    type="name"
                    onChange={handleChange}
                    value={values.last_name}
                  />
                  <label>Username</label>
                  <input
                    name="username"
                    type="name"
                    onChange={handleChange}
                    value={values.username}
                  />
                  <label>Email</label>
                  <input
                    name="email"
                    type="email"
                    onChange={handleChange}
                    value={values.email}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email && (
                    <div className="errors-feedback">{errors.email}</div>
                  )}

                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.email && touched.email && "error"}
                    value={values.password}
                  />
                  {errors.password && touched.password && (
                    <div className="errors-feedback">{errors.password}</div>
                  )}
                  <button
                    type="submit"
                    className="signUp__button"
                    disabled={isSubmitting}
                  >
                    Sign Up
                  </button>
                </form>
              );
            }}
          </Formik>

          <p className="signUp__footerText">
            Already a member? <Link to="/">Log in now</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
