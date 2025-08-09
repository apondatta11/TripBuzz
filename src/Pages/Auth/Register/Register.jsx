// // import React, { use, useState } from "react";
// // import { Link, useNavigate } from "react-router";
// // import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
// // import { showErrorToast, showSuccessToast } from "../../../Utilities/Toasterror";
// // // import { Helmet } from "react-helmet";
// // import { AuthContext } from "../../../Provider/AuthContext";

// // const Register = () => {
// //     const { createUser, setUser, updateUser, googleSignIn } = use(AuthContext);
// //     const navigate = useNavigate();
// //     const [error, setError] = useState("");
// //     const [showPassword, setShowPassword] = useState(false);

// //     const handleRegister = (e) => {
// //         e.preventDefault();
// //         console.log(e.target);
// //         const form = e.target;
// //         const name = form.name.value;
// //         const photo = form.photo.value;
// //         const email = form.email.value;
// //         const password = form.password.value;
// //         // console.log({ name, photo, email, password });

// //         const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
// //         if (!passwordRegex.test(password)) {
// //             showErrorToast("Password must be at least 6 characters long and include both uppercase and lowercase letters.");
// //             return;
// //         }

// //         createUser(email, password)
// //             .then((result) => {
// //                 const user = result.user;
// //                 // console.log(user);
// //                 updateUser({ displayName: name, photoURL: photo })
// //                     .then(() => {
// //                         showSuccessToast('Registration successful');
// //                         setUser({ ...user, displayName: name, photoURL: photo });
// //                         console.log(user);
// //                         // navigate("/");
// //                         setTimeout(() => {
// //                             navigate("/");
// //                           }, 3000);
// //                     })
// //                     .catch((error) => {
// //                         // console.log(error)
// //                         showErrorToast(`please provide valid name & photUrl.`);
// //                         setError(error.message);
// //                         setUser(user);
// //                     });
// //             })
// //             .catch((error) => {
// //                 setError(error.message);
// //                 showErrorToast('Registration Failed')
// //             });
// //     };

// //     const handleGoogleLogIn = () => {
// //         googleSignIn()
// //             .then(result => {
// //                 const user = result.user;
// //                 // console.log(user)
// //                 setUser(user);
// //                 showSuccessToast("Google Sign-In Successful")
// //                 // navigate(location?.state || '/')
// //                 setTimeout(() => {
// //                     navigate(location?.state || '/')
// //                   }, 3000);
// //             })
// //             .catch(error => {
// //                 console.log(error)
// //                 showErrorToast('Google Sign-In Failed.')
// //             })
// //     }


// //     return (
// //         <div className="w-[90vw] xl:w-[95vw] mx-auto flex justify-center min-h-screen items-center">
// //             {/* <Helmet>
// //                 <title>Register</title>
// //             </Helmet> */}
// //             <div className="card bg-cyan-50 font-semibold w-full max-w-sm shrink-0 shadow-2xl py-5">
// //                 <h2 className="font-semibold text-2xl text-center">
// //                     Register your account
// //                 </h2>
// //                 <form onSubmit={handleRegister} className="card-body">
// //                     <fieldset className="fieldset">
// //                         <label className="label font-semibold">Name</label>
// //                         <input
// //                             name="name"
// //                             type="text"
// //                             className="input"
// //                             placeholder="Name"
// //                             required
// //                         />
// //                         <label className="label font-semibold">Photo URl </label>
// //                         <input
// //                             name="photo"
// //                             type="text"
// //                             className="input"
// //                             placeholder="Photo URl"
// //                             required
// //                         />
// //                         <label className="label font-semibold">Email</label>
// //                         <input
// //                             name="email"
// //                             type="email"
// //                             className="input"
// //                             placeholder="Email"
// //                             required
// //                         />
// //                         <label className="label font-semibold">Password</label>
// //                         <div className='relative'>
// //                             <input
// //                                 type={showPassword ? 'text' : 'password'}
// //                                 name='password'
// //                                 className="input"
// //                                 placeholder="Password" />
// //                             <button
// //                                 onClick={() => { setShowPassword(!showPassword) }}
// //                                 className='btn btn-xs absolute top-2 right-6'>
// //                                 {
// //                                     showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
// //                                 }
// //                             </button>
// //                         </div>
// //                         <button type="submit" className="btn btn-info btn-outline mt-4">
// //                             Register
// //                         </button>
// //                         {
// //                             error && <p className='text-red-500'>{error}</p>
// //                         }
// //                         <button onClick={handleGoogleLogIn} className="btn  btn-accent text-black border-[#e5e5e5] mt-4">
// //                             <FaGoogle></FaGoogle>
// //                             Login with Google
// //                         </button>
// //                         <p className="font-bold text-center pt-5 text-base">
// //                             Already Have An Account ?{" "}
// //                             <Link className="text-red-400 hover:text-red-600 hover:border-b-2" to="/auth/login">
// //                                 Login
// //                             </Link>
// //                         </p>
// //                     </fieldset>
// //                 </form>
// //             </div>
// //         </div>
// //     );
// // };

// // export default Register;




import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '@/Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';
import axios from 'axios';
import useAxios from '@/Hooks/useAxios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { showErrorToast, showSuccessToast } from '@/Utilities/Toasterror';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const [profilePic, setProfilePic] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [uploadMessage, setUploadMessage] = useState('');

    const axiosInstance = useAxios();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';

    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(async (result) => {
                // update userinfo in the database
                const userInfo = {
                    email: data.email,
                    role: 'user', // default role
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString()
                }

                const userRes = await axiosInstance.post('/users', userInfo);

                // update user profile in firebase
                const userProfile = {
                    displayName: data.name,
                    photoURL: profilePic
                }
                updateUserProfile(userProfile)
                    .then(() => {
                        navigate(from);
                        showSuccessToast('Registration successful');
                    })
                    .catch(error => {
                        console.log(error)
                        showErrorToast(`please provide valid name & Image.`);
                    })
            })
            .catch(error => {
                console.error(error);
                if (error.code === "auth/email-already-in-use") {
                    showErrorToast("This email is already registered. Please log in or use another email.");
                } else {
                    showErrorToast(error.message);
                }
                showErrorToast('Registration Failed')
                console.error(error);

            })
    }
    //imgbb upload
    // const handleImageUpload = async (e) => {
    //     const image = e.target.files[0];
    //     if (!image) return;

    //     setIsUploading(true);
    //     const formData = new FormData();
    //     formData.append('image', image);

    //     try {
    //         const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`
    //         const res = await axios.post(imagUploadUrl, formData)
    //         setProfilePic(res.data.data.url);
    //     } catch (error) {
    //         console.error('Image upload failed:', error);
    //     } finally {
    //         setIsUploading(false);
    //     }
    // }

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        if (!image) return;
        console.log('Uploading image:', image);
        setUploadMessage('Uploading...');

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

        try {
            const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
            const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

            const res = await axios.post(uploadUrl, formData);

            console.log('Cloudinary Upload Success:', res.data);
            const imageUrl = res.data.secure_url;

            setProfilePic(imageUrl);
            setUploadMessage('Your image has been uploaded!');

        } catch (err) {
            setUploadMessage('Image upload failed. Please try again.');
            console.error('Cloudinary Upload Error:', err);
        } finally {
            setIsUploading(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-card rounded-xl shadow-2xl overflow-hidden border border-border">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-primary">Create Your Account</h1>
                        <p className="text-muted-foreground mt-2">Join our community today</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                {...register('name', { required: true })}
                                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                placeholder="Your Full Name"
                            />
                            {errors.name?.type === 'required' && (
                                <p className="mt-1 text-sm text-destructive">Name is required</p>
                            )}
                        </div>

                        {/* Profile picture */}
                        <div>
                            <label htmlFor="profilePic" className="block text-sm font-medium text-foreground mb-2">
                                Profile Picture
                            </label>
                            <div className="flex items-center gap-4">
                                <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-accent rounded-full cursor-pointer hover:bg-accent/10 transition-colors">
                                    {profilePic ? (
                                        <img src={profilePic} alt="Preview" className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            <span className="text-xs mt-1">Upload</span>
                                        </div>
                                    )}
                                    <input
                                        id="profilePic"
                                        type="file"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                </label>
                                <div className="text-sm text-muted-foreground">
                                    {uploadMessage}
                                </div>
                            </div>
                        </div>

                        {/* Email field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register('email', { required: true })}
                                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                placeholder="your@email.com"
                            />
                            {errors.email?.type === 'required' && (
                                <p className="mt-1 text-sm text-destructive">Email is required</p>
                            )}
                        </div>

                        {/* Password field */}
                        {/* <div>
                            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                {...register('password', { required: true, minLength: 6 })}
                                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                placeholder="••••••••"
                            />
                            {errors.password?.type === 'required' && (
                                <p className="mt-1 text-sm text-destructive">Password is required</p>
                            )}
                            {errors.password?.type === 'minLength' && (
                                <p className="mt-1 text-sm text-destructive">Password must be at least 6 characters</p>
                            )}
                        </div> */}
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

                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                            Create Account
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <Link
                            to="/auth/login"
                            className="font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                            Sign in
                        </Link>
                    </div>

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

                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Register;