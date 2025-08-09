// import React, { use, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router";
// import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
// import { showErrorToast, showSuccessToast } from "../../../Utilities/Toasterror";
// // import { Helmet } from "react-helmet";
// import { AuthContext } from "../../../Provider/AuthContext";

// const Login = () => {
//     const [error, setError] = useState("");
//     const [email, setEmail] = useState("");
//     const [showPassword, setShowPassword] = useState(false);
//     const { signIn, googleSignIn, setUser } = use(AuthContext);
//     const location = useLocation();
//     const navigate = useNavigate();

//     // console.log(location);
//     const handleLogin = (e) => {
//         e.preventDefault();
//         // console.log('entered in signIn');
//         const form = e.target;
//         const email = form.email.value;
//         const password = form.password.value;
//         // console.log({ email, password });
//         signIn(email, password)
//         .then((result) => {
//             const user = result.user;
//             // console.log(user);
//             // console.log('login detected')
//             showSuccessToast("user Log-In Successful")
//             setUser(user);
//             // console.log(location.state);
//             // navigate(`${location.state ? location.state : "/"}`);
//             setTimeout(() => {
//                 navigate(location.state ? location.state : "/");
//               }, 3000);
//             })
//             .catch((error) => {
//                 const errorCode = error.code;
//                 setError(errorCode);
//                 showErrorToast('User Log-In Failed!!!')
//             });
//     };

//     const handleGoogleLogIn = () => {
//         googleSignIn()
//             .then(result => {
//                 console.log('entered google login')
//                 // console.log(result.user)
//                 setUser(result.user);
//                 showSuccessToast("Google Sign-In Successful")
//                 // navigate(location?.state || '/')
//                 setTimeout(() => {
//                     navigate(location?.state || '/')
//                   }, 3000);

//             })
//             .catch(error => {
//                 console.log(error)
//                 showErrorToast("Google Sign-In Failed")
//             })
//     }



//     return (
//         <div className="w-[90vw] xl:w-[95vw] mx-auto flex justify-center min-h-screen items-center">
//             {/* <Helmet>
//                 <title>Login</title>
//             </Helmet> */}
//             <div className="card bg-primary  w-full max-w-sm shrink-0 shadow-2xl py-5">
//                 <h2 className="font-semibold text-2xl text-center">
//                     Login your account
//                 </h2>
//                 <form onSubmit={handleLogin} className="card-body">
//                     <fieldset className="fieldset">
//                         <label className="label font-semibold">Email</label>
//                         <input
//                             name="email"
//                             type="email"
//                             className="input"
//                             placeholder="Email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                         <label className="label font-semibold">Password</label>
//                         <div className='relative'>
//                             <input
//                                 type={showPassword ? 'text' : 'password'}
//                                 name='password'
//                                 className="input"
//                                 placeholder="Password" />
//                             <button
//                                 type="button"
//                                 onClick={() => { setShowPassword(!showPassword) }}
//                                 className='btn btn-xs absolute top-2 right-6'>
//                                 {
//                                     showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
//                                 }
//                             </button>
//                         </div>
//                         <div>
//                             <Link
//                                 to={`/auth/forgot-password?email=${encodeURIComponent(document.querySelector('input[name="email"]')?.value || '')}`}
//                                 className="link link-hover font-semibold"
//                             >
//                                 Forgot password?
//                             </Link>
//                         </div>

//                         {error && <p className="text-red-400 text-xs">{error}</p>}

//                         <button type="submit" className="btn btn-info btn-outline mt-4">
//                             Login
//                         </button>

//                         <button onClick={handleGoogleLogIn} className="btn  btn-secondary text-black border-[#e5e5e5] mt-4">
//                             <FaGoogle></FaGoogle>
//                             Login with Google
//                         </button>
//                         <p className="font-bold text-center pt-5 text-base">
//                             Don’t Have An Account ?{" "}
//                             <Link className="text-red-400 hover:text-red-600 hover:border-b-2" to="/auth/register">
//                                 Register
//                             </Link>
//                         </p>
//                     </fieldset>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;


// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { Link, useLocation, useNavigate } from 'react-router';
// import SocialLogin from '../Register/SocialLogin';
// import useAuth from '@/Hooks/useAuth';

// const Login = () => {
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const { signIn } = useAuth();
//     const location = useLocation();
//     const navigate = useNavigate();
//     const from = location.state?.from || '/';

//     const onSubmit = data => {
//         signIn(data.email, data.password)
//             .then(result => {
//                 console.log(result.user);
//                 navigate(from);
//             })
//             .catch(error => console.log(error))
//     }

//     return (
//         <div className="card bg-card w-full max-w-sm shrink-0 shadow-2xl">
//             <div className="card-body">
//                 <h1 className="text-5xl font-bold">Please Login</h1>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <fieldset className="fieldset">

//                         <label className="label">Email</label>
//                         <input
//                             type="email"
//                             {...register('email')}
//                             className="input" placeholder="Email" />


//                         <label className="label">Password</label>
//                         <input
//                             type="password"
//                             {...register('password', {
//                                 required: true,
//                                 minLength: 6
//                             })}
//                             className="input" placeholder="Password" />
//                         {
//                             errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
//                         }
//                         {
//                             errors.password?.type === 'minLength' && <p className='text-red-500'>Password Must be 6 characters or longer</p>
//                         }

//                         <div><a className="link link-hover">Forgot password?</a></div>

//                         <button className="btn btn-primary text-black mt-4">Login</button>
//                     </fieldset>
//                     <p><small>New to this website? <Link state={{ from }} className="btn btn-link" to="/auth/register">Register</Link></small></p>
//                 </form>
//                 <SocialLogin></SocialLogin>
//             </div>
//         </div>
//     );
// };

// export default Login;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../Register/SocialLogin';
import useAuth from '@/Hooks/useAuth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';
    const [showPassword, setShowPassword] = useState(false);
    const [emailValue, setEmailValue] = useState(''); 

    const onSubmit = data => {
        signIn(data.email, data.password)
            .then(result => {
                navigate(from);
            })
            .catch(error => {
                console.error('Login error:', error);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-card rounded-xl shadow-2xl overflow-hidden border border-border">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-primary">Welcome Back</h1>
                        <p className="text-muted-foreground mt-2">Sign in to your account</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Email field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register('email', { required: true })}
                                onChange={(e) => setEmailValue(e.target.value)} // Update email state
                                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                placeholder="your@email.com"
                            />
                            {errors.email?.type === 'required' && (
                                <p className="mt-1 text-sm text-destructive">Email is required</p>
                            )}
                        </div>

                        {/* Password field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password', { required: true, minLength: 6 })}
                                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                </button>
                            </div>
                            {errors.password?.type === 'required' && (
                                <p className="mt-1 text-sm text-destructive">Password is required</p>
                            )}
                            {errors.password?.type === 'minLength' && (
                                <p className="mt-1 text-sm text-destructive">Password must be at least 6 characters</p>
                            )}
                        </div>

                        {/* Forgot password link */}
                        <div className="flex justify-end">
                            <Link
                                to={`/auth/forgot-password?email=${encodeURIComponent(emailValue || '')}`}
                                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Register link */}
                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        Don't have an account?{' '}
                        <Link
                            to="/auth/register"
                            state={{ from }}
                            className="font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                            Register
                        </Link>
                    </div>

                    {/* Social login divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-card text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    {/* Social login buttons */}
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Login;