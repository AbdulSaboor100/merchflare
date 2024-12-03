import React, { Fragment, useLayoutEffect } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import SignUp from "../Pages/SignUp/SignUp";
import SignIn from "../Pages/SignIn/SignIn";
import Home from "../Pages/Home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verification from "../Pages/Verification/Verification";
import { getCookie } from "../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../Redux/Features/getUserSlice";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const AppRoutes = () => {
  const dispatch = useDispatch();
  const { data, isSuccess } = useSelector((state) => state?.getUser);
  let token = getCookie("token");

  useLayoutEffect(() => {
    // let token = getCookie("token");
    if (token) {
      dispatch(getUser(token));
    }
  }, []);

  const isAuthenticated = token || (isSuccess && data?.id);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path={"/signup"}
          element={
            <PublicRoute
              element={<SignUp />}
              isNotAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path={"/signin"}
          element={
            <PublicRoute
              element={<SignIn />}
              isNotAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path={"/verification/:code"}
          element={
            <PublicRoute
              element={<Verification />}
              isNotAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path={"/"}
          element={
            <ProtectedRoute
              element={<Home />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        {/* <Route path={"/signup"} element={<SignUp />} /> */}
        {/* <Route path={"/signin"} element={<SignIn />} /> */}
        {/* <Route path={"/verification/:code"} element={<Verification />} /> */}
        {/* <Route path={"/"} element={<Home />} /> */}
      </>
    )
  );

  return (
    <Fragment>
      <ToastContainer />
      <RouterProvider router={router} />
    </Fragment>
  );
};

export default AppRoutes;
