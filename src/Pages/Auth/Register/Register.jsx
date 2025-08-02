import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { showErrorToast, showSuccessToast } from "../../../Utilities/Toasterror";
// import { Helmet } from "react-helmet";
import { AuthContext } from "../../../Provider/AuthContext";

const Register = () => {
    const { createUser, setUser, updateUser, googleSignIn } = use(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const handleRegister = (e) => {
        e.preventDefault();
        console.log(e.target);
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        // console.log({ name, photo, email, password });

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            showErrorToast("Password must be at least 6 characters long and include both uppercase and lowercase letters.");
            return;
        }

        createUser(email, password)
            .then((result) => {
                const user = result.user;
                // console.log(user);
                updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        showSuccessToast('Registration successful');
                        setUser({ ...user, displayName: name, photoURL: photo });
                        console.log(user);
                        // navigate("/");
                        setTimeout(() => {
                            navigate("/");
                          }, 3000);
                    })
                    .catch((error) => {
                        // console.log(error)
                        showErrorToast(`please provide valid name & photUrl.`);
                        setError(error.message);
                        setUser(user);
                    });
            })
            .catch((error) => {
                setError(error.message);
                showErrorToast('Registration Failed')
            });
    };

    const handleGoogleLogIn = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                // console.log(user)
                setUser(user);
                showSuccessToast("Google Sign-In Successful")
                // navigate(location?.state || '/')
                setTimeout(() => {
                    navigate(location?.state || '/')
                  }, 3000);
            })
            .catch(error => {
                console.log(error)
                showErrorToast('Google Sign-In Failed.')
            })
    }


    return (
        <div className="w-[90vw] xl:w-[95vw] mx-auto flex justify-center min-h-screen items-center">
            {/* <Helmet>
                <title>Register</title>
            </Helmet> */}
            <div className="card bg-cyan-50 font-semibold w-full max-w-sm shrink-0 shadow-2xl py-5">
                <h2 className="font-semibold text-2xl text-center">
                    Register your account
                </h2>
                <form onSubmit={handleRegister} className="card-body">
                    <fieldset className="fieldset">
                        <label className="label font-semibold">Name</label>
                        <input
                            name="name"
                            type="text"
                            className="input"
                            placeholder="Name"
                            required
                        />
                        <label className="label font-semibold">Photo URl </label>
                        <input
                            name="photo"
                            type="text"
                            className="input"
                            placeholder="Photo URl"
                            required
                        />
                        <label className="label font-semibold">Email</label>
                        <input
                            name="email"
                            type="email"
                            className="input"
                            placeholder="Email"
                            required
                        />
                        <label className="label font-semibold">Password</label>
                        <div className='relative'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                className="input"
                                placeholder="Password" />
                            <button
                                onClick={() => { setShowPassword(!showPassword) }}
                                className='btn btn-xs absolute top-2 right-6'>
                                {
                                    showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                }
                            </button>
                        </div>
                        <button type="submit" className="btn btn-info btn-outline mt-4">
                            Register
                        </button>
                        {
                            error && <p className='text-red-500'>{error}</p>
                        }
                        <button onClick={handleGoogleLogIn} className="btn  btn-accent text-black border-[#e5e5e5] mt-4">
                            <FaGoogle></FaGoogle>
                            Login with Google
                        </button>
                        <p className="font-bold text-center pt-5 text-base">
                            Already Have An Account ?{" "}
                            <Link className="text-red-400 hover:text-red-600 hover:border-b-2" to="/auth/login">
                                Login
                            </Link>
                        </p>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default Register;
