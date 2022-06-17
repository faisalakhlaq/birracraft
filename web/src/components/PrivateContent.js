import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const PrivateContent = () => {
  const auth = window.localStorage.getItem('authTokens')
  return  auth ? <Outlet /> : <Navigate to="/SignIn" /> ;
}

export default PrivateContent;