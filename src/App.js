import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import AdminLayout from "layouts/Admin";
import AuthLayout from "layouts/Auth";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setisLoggedIn } from "ReduxSlices/AdminSlice";

const App = () => {
  const isLoggedIn = useSelector((state)=>state.admin.isloggedin)
  const dispatch = useDispatch()
  const location = useLocation();

  useEffect(() => {
    // Watch localStorage changes in case login status changes elsewhere
    const checkLoginStatus = () => {
      dispatch(setisLoggedIn((localStorage.getItem("isLoggedIn") === "true")));
    };

    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  useEffect(() => {
    // Re-check on location change, like after a login redirect
    dispatch(setisLoggedIn((localStorage.getItem("isLoggedIn") === "true")));
  }, [location]);

  return (
    <>
      <ToastContainer />
      <Routes>
        {!isLoggedIn && <Route path="/auth/*" element={<AuthLayout />} />}
        {isLoggedIn && (
          <>
            <Route path="/admin/*" element={<AdminLayout />} />
            <Route path="*" element={<Navigate to="/admin/index" replace />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
