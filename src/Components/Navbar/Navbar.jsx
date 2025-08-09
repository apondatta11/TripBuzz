import React, { use, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { showSuccessToast } from '../../Utilities/Toasterror';
import { AuthContext } from '../../Provider/AuthContext';
import { GiWaveSurfer } from 'react-icons/gi';


const Navbar = () => {
    const { user, logOut, loading } = use(AuthContext);
    // console.log("Navbar user:", user);
    // const [theme, setTheme] = useState(
    //     localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
    // )
    // const handleToggle = (e) => {
    //     if (e.target.checked) {
    //         setTheme('dark');
    //     }
    //     else {
    //         setTheme('light');
    //     }
    // }
    // useEffect(() => {
    //     localStorage.setItem('theme', theme);
    //     const localTheme = localStorage.getItem('theme');
    //     document.querySelector('html').setAttribute('data-theme', localTheme);
    // }, [theme]);




    // const [theme, setTheme] = useState(
    //     localStorage.getItem('theme') || 'light'
    // )

    // const handleToggle = (e) => {
    //     const selectedTheme = e.target.checked ? 'dark' : 'light'
    //     setTheme(selectedTheme)
    // }

    // useEffect(() => {
    //     localStorage.setItem('theme', theme)

    //     const html = document.documentElement

    //     if (theme === 'dark') {
    //         html.classList.add('dark')
    //     } else {
    //         html.classList.remove('dark')
    //     }
    // }, [theme])

    const [theme, setTheme] = useState(
        localStorage.getItem('theme') || 'light'
    );

    const handleToggle = (e) => {
        const selectedTheme = e.target.checked ? 'dark' : 'light';
        setTheme(selectedTheme);
    };

    useEffect(() => {
        localStorage.setItem('theme', theme);
        const html = document.documentElement;

        html.setAttribute('data-theme', theme); // DaisyUI
        if (theme === 'dark') {
            html.classList.add('dark'); // Tailwind & shadcn
        } else {
            html.classList.remove('dark');
        }
        console.log('Current theme:', theme, 'Classes:', html.className);
    }, [theme]);



    const handleLogOut = () => {
        console.log("user trying to LogOut");
        logOut()
            .then(() => {
                showSuccessToast("You Logged Out successfully");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const links = <>
        <NavLink to="/" className={({ isActive }) => `m-2 p-2 rounded-sm rounded-b-none border-b-2 ${isActive ? ' border-black font-extrabold' : 'border-border hover:bg-primary hover:border-border hover:text-background'}`}>
            <li>Home</li>
        </NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => `m-2 p-2 rounded-sm rounded-b-none border-b-2 ${isActive ? ' border-black font-extrabold' : 'border-border hover:bg-primary hover:border-border hover:text-background'}`}>
            <li>Dashboard</li>
        </NavLink>
        <NavLink to="/allpackages" className={({ isActive }) => `m-2 p-2 rounded-sm rounded-b-none border-b-2 ${isActive ? ' border-black font-extrabold' : 'border-border hover:bg-primary hover:border-border hover:text-background'}`}>
            <li>All Packages</li>
        </NavLink>
        {/* <NavLink to="/mybookings" className={({ isActive }) => `m-2 p-2 rounded-sm rounded-b-none border-b-2 ${isActive ? ' border-black font-extrabold' : 'border-transparent hover:bg-sky-100 hover:border-black'}`}>
            <li>My Bookings</li>
        </NavLink> */}
        {/* <NavLink to="/about" className={({ isActive }) => `m-2 p-2 rounded-sm rounded-b-none border-b-2 ${isActive ? ' border-black font-extrabold' : 'border-transparent hover:bg-sky-100 hover:border-black'}`}>
            <li>About Us</li>
        </NavLink> */}

    </>
    const links2 = <>
        <NavLink to="/addpackages" className={({ isActive }) => `m-2 p-2 rounded-sm rounded-b-none border-b-2 ${isActive ? ' border-black font-extrabold' : 'border-transparent hover:bg-sky-100 hover:border-black'}`}>
            <li>Add Package</li>
        </NavLink>
        <NavLink to="/manage-packages" className={({ isActive }) => `m-2 p-2 rounded-sm rounded-b-none border-b-2 ${isActive ? ' border-black font-extrabold' : 'border-transparent hover:bg-sky-100 hover:border-black'}`}>
            <li>Manage Package</li>
        </NavLink>
        <NavLink onClick={handleLogOut} className='text-black'>
            <li>Logout</li>
        </NavLink>
    </>

    return (
        <div className="pt-3.5 navbar w-full sm:w-[95%] lg:w-[93%] mx-auto mb-2 ">
            <div className='flex flex-row justify-between items-center w-full'>
                {/* the checkbox */}
                <div className="xl:hidden">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost xl:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content rounded-box z-50 mt-3 w-52 p-2 shadow-xl bg-white border border-gray-300 backdrop-blur-sm">
                            {links}
                        </ul>
                    </div>
                </div>
                {/* the logo & title */}
                <Link to="/" className="flex items-center gap-2 sm:gap-3 lg:gap-4 xl:gap-5">
                    <div className='flex gap-1 justify-center items-center sm:gap-2 lg:gap-3 xl:gap-5'>
                        <GiWaveSurfer size={30} />
                        <h1 className='font-extrabold text-lg sm:text-2xl cursor-pointer '>TripBuzz</h1>
                    </div>
                </Link>

                {/* links */}
                <div className="hidden xl:flex">
                    <ul className="menu menu-horizontal px-1 font-medium text-lg">
                        {links}
                    </ul>
                </div>
                {/* user login site */}
                <div className=" flex flex-row items-center gap-1 sm:gap-2 lg:gap-4 ">
                    {loading ? (
                        <div className="h-8 sm:h-10 lg:h-12 w-[124px] sm:w-[172px] lg:w-[220px] flex justify-center items-center">
                            <span className="loading loading-spinner loading-md"></span>
                        </div>
                    ) : user ? (
                        <>
                            <label className="swap swap-rotate">
                                {/* this hidden checkbox controls the state */}
                                <input type="checkbox" className="theme-controller" checked={theme === 'light' ? false : true} onChange={handleToggle} />
                                {/* sun icon */}
                                <svg
                                    className="swap-off h-8 w-9 sm:h-10 sm:w-10 lg:w-12 lg:h-12 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                                </svg>
                                {/* moon icon */}
                                <svg
                                    className="swap-on h-8 w-9 sm:h-10 sm:w-10 lg:w-12 lg:h-12 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                                </svg>
                            </label>

                            <div className="flex gap-2">
                                <div className="dropdown dropdown-center">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img
                                                alt="Tailwind CSS Navbar component"
                                                src={user.photoURL} />
                                        </div>
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="menu menu-sm dropdown-content bg-accent rounded-box z-1 mt-3 w-36 p-2 shadow">
                                        {links2}
                                    </ul>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <label className="swap swap-rotate">
                                {/* this hidden checkbox controls the state */}
                                <input type="checkbox" className="theme-controller" checked={theme === 'light' ? false : true} onChange={handleToggle} />
                                {/* sun icon */}
                                <svg
                                    className="swap-off h-8 w-8 sm:h-10 sm:w-10 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                                </svg>
                                {/* moon icon */}
                                <svg
                                    className="swap-on h-8 w-8 sm:h-10 sm:w-10 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                                </svg>
                            </label>
                            <div className="relative group flex flex-row items-center gap-1 sm:gap-2 lg:gap-3 xl:gap-4">
                                <Link to="/auth/login" className="btn btn-primary text-accent px-1 sm:px-2 lg:px-3 xl:px-5 btn-xs sm:btn-sm md:btn-md lg:btn-lg">
                                    Login
                                </Link>
                                {/* <Link to="/auth/signup" className="btn btn-primary text-accent px-1 sm:px-2 lg:px-3 xl:px-5 btn-xs sm:btn-sm md:btn-md lg:btn-lg">
                                    SignUp
                                </Link> */}
                            </div>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
};
export default Navbar;

<div className="flex gap-2">
    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
                <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
        </div>
        <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
                <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
        </ul>
    </div>
</div>




