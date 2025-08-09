import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import useAxios from '../../../hooks/useAxios';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const [profilePic, setProfilePic] = useState('');
    const axiosInstance = useAxios();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';

    const onSubmit = data => {

        console.log(data);

        createUser(data.email, data.password)
            .then(async (result) => {
                console.log(result.user);

                // update userinfo in the database
                const userInfo = {
                    email: data.email,
                    role: 'user', // default role
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString()
                }

                const userRes = await axiosInstance.post('/users', userInfo);
                console.log(userRes.data);

                // update user profile in firebase
                const userProfile = {
                    displayName: data.name,
                    photoURL: profilePic
                }
                updateUserProfile(userProfile)
                    .then(() => {
                        console.log('profile name pic updated');
                        navigate(from);
                    })
                    .catch(error => {
                        console.log(error)
                    })

            })
            .catch(error => {
                console.error(error);
            })
    }

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        console.log(image)

        const formData = new FormData();
        formData.append('image', image);


        const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`
        const res = await axios.post(imagUploadUrl, formData)

        setProfilePic(res.data.data.url);

    }

    return (

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-5xl font-bold">Create Account</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        {/* name field */}
                        <label className="label">Your Name</label>
                        <input type="text"
                            {...register('name', { required: true })}
                            className="input" placeholder="Your Name" />
                        {
                            errors.email?.type === 'required' && <p className='text-red-500'>Name is required</p>
                        }
                        {/* name field */}
                        <label className="label">Your Name</label>
                        <input type="file"
                            onChange={handleImageUpload}
                            className="input" placeholder="Your Profile picture" />

                        {/* email field */}
                        <label className="label">Email</label>
                        <input type="email"
                            {...register('email', { required: true })}
                            className="input" placeholder="Email" />
                        {
                            errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                        }
                        {/* password field*/}
                        <label className="label">Password</label>
                        <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />
                        {
                            errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters or longer</p>
                        }

                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-primary text-black mt-4">Register</button>
                    </fieldset>
                    <p><small>Already have an account? <Link className="btn btn-link" to="/login">Login</Link></small></p>
                </form>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Register;

// import React from 'react';
// import useAuth from '../../../hooks/useAuth';
// import { useLocation, useNavigate } from 'react-router';
// import useAxios from '../../../hooks/useAxios';

// const SocialLogin = () => {
//     const { signInWithGoogle } = useAuth();
//     const location = useLocation();
//     const navigate = useNavigate();
//     const from = location.state?.from || '/';
//     const axiosInstance = useAxios();

//     const handleGoogleSignIn = () => {
//         signInWithGoogle()
//             .then(async (result) => {
//                 const user = result.user;
//                 console.log(result.user);
//                 // update userinfo in the database
//                 const userInfo = {
//                     email: user.email,
//                     role: 'user', // default role
//                     created_at: new Date().toISOString(),
//                     last_log_in: new Date().toISOString()
//                 }

//                 const res = await axiosInstance.post('/users', userInfo);
//                 console.log('user update info', res.data)

//                 navigate(from);
//             })
//             .catch(error => {
//                 console.error(error);
//             })
//     }

//     return (
//         <div className='text-center'>
//             <p className='mb-4'>OR</p>
//             <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
//                 <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
//                 Login with Google
//             </button>
//         </div>
//     );
// };

// export default SocialLogin;