import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import RegistrationSuccess from './registration/RegistrationSuccess.js';
import RegistrationFail from './registration/RegistrationFail.js';
import ActivationSuccess from './registration/ActivationSuccess.js';
import ActivationFail from './registration/ActivationFail.js';
import ResetPass from './ResetPass.js';
import Orders from './Orders.js';
import Payments from './Payments.js';
import Products from './Products.js';
import Customers from './Customers.js';


const Contents = () => (
    <Routes>
        <Route exact path="/SignIn" element={<SignIn />} />
        <Route exact path="/SignUp" element={<SignUp />} />
        <Route exact path="/RegistrationSuccess" element={<RegistrationSuccess />} />
        <Route exact path="/RegistrationFail" element={<RegistrationFail />} />
        <Route exact path="/ActivationSuccess" element={<ActivationSuccess />} />
        <Route exact path="/ActivationFail" element={<ActivationFail />} />
        <Route exact path="/ResetPass" element={<ResetPass />} />
        <Route exact path="/Orders" element={<Orders />} />
        <Route exact path="/Payments" element={<Payments />} />
        <Route exact path="/Products" element={<Products />} />
        <Route exact path="/Customers" element={<Customers />} />
    </Routes>
);

export default Contents;
