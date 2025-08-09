// import React from 'react';
// import useAuth from '@/Hooks/useAuth';
// import { useLocation, useNavigate } from 'react-router';
// import useAxios from '@/Hooks/useAxios';

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


import React from 'react';
import useAuth from '@/Hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import useAxios from '@/Hooks/useAxios';
import { FaGoogle } from 'react-icons/fa';
import { showErrorToast, showSuccessToast } from '@/Utilities/Toasterror';

const SocialLogin = () => {
    const { signInWithGoogle } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';
    const axiosInstance = useAxios();
    const [isLoading, setIsLoading] = React.useState(false);

    const handleGoogleSignIn = () => {
        setIsLoading(true);
        signInWithGoogle()
            .then(async (result) => {
                const user = result.user;

                // update userinfo in the database
                const userInfo = {
                    email: user.email,
                    role: 'user', // default role
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString()
                }

                await axiosInstance.post('/users', userInfo);
                showSuccessToast("Google Sign-In Successful")
                setTimeout(() => {
                    navigate(from)
                }, 3000);
            })
            .catch(error => {
                console.error('Google sign-in error:', error);
                showErrorToast('Google Sign-In Failed.')
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div className="space-y-4">
            <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-input bg-background hover:bg-accent/10 text-foreground font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
                {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    <>
                        <FaGoogle className="h-5 w-5 text-[#DB4437]" />
                        <span>Continue with Google</span>
                    </>
                )}
            </button>

            {/* Additional social providers can be added here with the same styling */}
            {/* 
            <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-input bg-background hover:bg-accent/10 text-foreground font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                <FaGithub className="h-5 w-5" />
                <span>Continue with GitHub</span>
            </button>
            */}
        </div>
    );
};

export default SocialLogin;