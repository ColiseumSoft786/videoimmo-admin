import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import AdminLayout from "layouts/Admin";
import AuthLayout from "layouts/Auth";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setisLoggedIn } from "ReduxSlices/AdminSlice";

const App = () => {
  const isLoggedIn = useSelector((state)=>state.admin.isloggedin)
  const dispatch = useDispatch()
  const location = useLocation();
  const navigate = useNavigate()

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
  useEffect(()=>{
    if(!isLoggedIn){
      navigate('/auth/login')
      console.log('navigating to the login')
    }
  },[])

  return (
    <>
      <ToastContainer />
      <Routes>
        {!isLoggedIn && <Route path="/auth/*" element={<AuthLayout />} />}
        {isLoggedIn && (
          <>
            <Route path="/*" element={<AdminLayout />} />
            <Route path="/*" element={<Navigate to="/index" replace />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
