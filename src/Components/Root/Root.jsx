import {
    Outlet,
    ScrollRestoration,
} from 'react-router';
import { ToastContainer } from 'react-toastify';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Root = () => {
    return (
        <div className="min-h-screen  bg-background">
            <ScrollRestoration></ScrollRestoration>
            <Navbar></Navbar>
            <Outlet />
            <Footer></Footer>
            <ToastContainer />
        </div>
    );
};

export default Root;
