import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home.js';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import RegistrationSuccess from './registration/RegistrationSuccess.js';
import RegistrationFail from './registration/RegistrationFail.js';
import ActivationSuccess from './registration/ActivationSuccess.js';
import ActivationFail from './registration/ActivationFail.js';
import ResetPass from './resetPass/ResetPass.js';
import ResetPassForm from './resetPass/ResetPassForm.js';
import ResetPassSent from './resetPass/ResetPassSent.js';
import ResetPassInvalidLink from './resetPass/ResetPassInvalidLink';
import ResetPassSuccess from './resetPass/ResetPassSuccess.js';
import ResetPassFail from './resetPass/ResetPassFail.js';
import PrivateContent from './PrivateContent.js';
import Orders from './Orders.js';
import Payments from './Payments.js';
import Products from './Products.js';
import Customers from './Customers.js';
import Profile from './Profile.js';


const Contents = () => (
    <Routes>
				<Route exact path="/" element={<Home />} />
        <Route exact path="/SignIn" element={<SignIn />} />
        <Route exact path="/SignUp" element={<SignUp />} />
        <Route exact path="/RegistrationSuccess" element={<RegistrationSuccess />} />
        <Route exact path="/RegistrationFail" element={<RegistrationFail />} />
        <Route exact path="/ActivationSuccess" element={<ActivationSuccess />} />
        <Route exact path="/ActivationFail" element={<ActivationFail />} />
        <Route exact path="/ResetPass" element={<ResetPass />} />
        <Route exact path="/ResetPassForm" element={<ResetPassForm />} />
        <Route exact path="/ResetPassSent" element={<ResetPassSent />} />
        <Route exact path="/ResetPassInvalidLink" element={<ResetPassInvalidLink />} />
        <Route exact path="/ResetPassSuccess" element={<ResetPassSuccess />} />
        <Route exact path="/ResetPassFail" element={<ResetPassFail />} />
        <Route exact path="/" element={<PrivateContent />}>
					<Route exact path="/Orders" element={<Orders />} />
					<Route exact path="/Payments" element={<Payments />} />
					<Route exact path="/Products" element={<Products />} />
					<Route exact path="/Customers" element={<Customers />} />
					<Route exact path="/Profile" element={<Profile />} />
				</Route>
    </Routes>
);

export default Contents;
