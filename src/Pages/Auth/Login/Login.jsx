import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { showErrorToast, showSuccessToast } from "../../../Utilities/Toasterror";
// import { Helmet } from "react-helmet";
import { AuthContext } from "../../../Provider/AuthContext";

const Login = () => {
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { signIn, googleSignIn, setUser } = use(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    
    // console.log(location);
    const handleLogin = (e) => {
        e.preventDefault();
        // console.log('entered in signIn');
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log({ email, password });
        signIn(email, password)
        .then((result) => {
            const user = result.user;
            // console.log(user);
            // console.log('login detected')
            showSuccessToast("user Log-In Successful")
            setUser(user);
            // console.log(location.state);
            // navigate(`${location.state ? location.state : "/"}`);
            setTimeout(() => {
                navigate(location.state ? location.state : "/");
              }, 3000);
            })
            .catch((error) => {
                const errorCode = error.code;
                setError(errorCode);
                showErrorToast('User Log-In Failed!!!')
            });
    };

    const handleGoogleLogIn = () => {
        googleSignIn()
            .then(result => {
                console.log('entered google login')
                // console.log(result.user)
                setUser(result.user);
                showSuccessToast("Google Sign-In Successful")
                // navigate(location?.state || '/')
                setTimeout(() => {
                    navigate(location?.state || '/')
                  }, 3000);

            })
            .catch(error => {
                console.log(error)
                showErrorToast("Google Sign-In Failed")
            })
    }



    return (
        <div className="w-[90vw] xl:w-[95vw] mx-auto flex justify-center min-h-screen items-center">
            {/* <Helmet>
                <title>Login</title>
            </Helmet> */}
            <div className="card bg-primary  w-full max-w-sm shrink-0 shadow-2xl py-5">
                <h2 className="font-semibold text-2xl text-center">
                    Login your account
                </h2>
                <form onSubmit={handleLogin} className="card-body">
                    <fieldset className="fieldset">
                        <label className="label font-semibold">Email</label>
                        <input
                            name="email"
                            type="email"
                            className="input"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                                type="button"
                                onClick={() => { setShowPassword(!showPassword) }}
                                className='btn btn-xs absolute top-2 right-6'>
                                {
                                    showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                }
                            </button>
                        </div>
                        <div>
                            <Link
                                to={`/auth/forgot-password?email=${encodeURIComponent(document.querySelector('input[name="email"]')?.value || '')}`}
                                className="link link-hover font-semibold"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {error && <p className="text-red-400 text-xs">{error}</p>}

                        <button type="submit" className="btn btn-info btn-outline mt-4">
                            Login
                        </button>

                        <button onClick={handleGoogleLogIn} className="btn  btn-secondary text-black border-[#e5e5e5] mt-4">
                            <FaGoogle></FaGoogle>
                            Login with Google
                        </button>
                        <p className="font-bold text-center pt-5 text-base">
                            Don’t Have An Account ?{" "}
                            <Link className="text-red-400 hover:text-red-600 hover:border-b-2" to="/auth/register">
                                Register
                            </Link>
                        </p>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default Login;
