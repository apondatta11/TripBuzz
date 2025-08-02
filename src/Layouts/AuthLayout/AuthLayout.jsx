import Footer from '@/Components/Footer/Footer';
import Navbar from '@/Components/Navbar/Navbar';
import React from 'react';

import { Outlet } from 'react-router';


const AuthLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default AuthLayout;