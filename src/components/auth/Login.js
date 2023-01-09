import React, { useState, useEffect } from "react";
import "./Login.css";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import Message from "../header/Message";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const history = useNavigate();
  const [message, setMessage] = useState(false);

  return (
    <div className="login">
      <div className="login__wrapper">
        {message && (
          <Message message="Either email or password does not match." />
        )}
        <div className="login__container">
          <h2 className="login__title">Log In </h2>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              console.log("submitting sign up form..")
              const auth = getAuth();
              signInWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                  if (userCredential) {
                    history.push("/")
                  }
                }
                )
                // .then((auth) => {})
                .catch((error) => setMessage(true));
              setTimeout(() => {
                resetForm({ values: "" });
                setSubmitting(false);
                setMessage(false);
              }, 2000);
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
                <>
                  <Form className="login__form" onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                      onBlur={handleBlur}
                      placeholder="Enter email address..."
                    />
                    {errors.email && touched.email && (
                      <div className="errors-feedback">{errors.email}</div>
                    )}
                    <label>Password</label>
                    <input
                      name="password"
                      type="password"
                      onChange={handleChange}
                      value={values.password}
                      placeholder="Enter password.."
                    />
                    {errors.password && touched.password && (
                      <div className="errors-feedback">{errors.password}</div>
                    )}
                    <button type="submit" disabled={isSubmitting}>
                      Log In
                    </button>
                  </Form>
                </>
              );
            }}
          </Formik>
          <p className="login__footerText">
            Not a member? <Link to="/signup">Sign Up now</Link>
          </p>

          <p>
            for admin use: use admin@gmail.com and password: 123456
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
