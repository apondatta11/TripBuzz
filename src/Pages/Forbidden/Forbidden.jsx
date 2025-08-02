import React from 'react';
import { Link } from 'react-router';

const Forbidden = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 flex items-center justify-center px-4">
            <div className="text-center">
                <div className="text-6xl mb-6">🚫</div>
                <h1 className="text-4xl font-bold text-error mb-4">Access Denied</h1>
                <p className="text-xl text-base-content/70 mb-8 max-w-md">
                    You don't have permission to access this page. Please contact an administrator if you believe this is an error.
                </p>
                <div className="space-x-4">
                    <Link to="/" className="btn btn-primary">
                        Go Home
                    </Link>
                    <Link to="/auth/login" className="btn btn-outline">
                        Login with Different Account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Forbidden;