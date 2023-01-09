import React from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "./features/userSlice";
import { Route, Navigate } from "react-router-dom";

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const user = useSelector(selectUserInfo);
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         user?.role === "Manager" ? (
//           <Component {...props} />
//         ) : (
//             <Navigate to="/" />
//           )
//       }
//     />
//   );
// };

const PrivateRoute = ({ children }) => {
  const user = useSelector(selectUserInfo);
  return user ? children : <Navigate to="/login" />
}

export default PrivateRoute;
