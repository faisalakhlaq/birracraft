import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Orders from './Orders.js';
import Payments from './Payments.js';
import Products from './Products.js';
import Customers from './Customers.js';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';

const Contents = () => (
    <Routes>
        <Route exact path="/SignIn" element={<SignIn />} />
        <Route exact path="/SignUp" element={<SignUp />} />
        <Route exact path="/Orders" element={<Orders />} />
        <Route exact path="/Payments" element={<Payments />} />
        <Route exact path="/Products" element={<Products />} />
        <Route exact path="/Customers" element={<Customers />} />
    </Routes>
);

export default Contents;
