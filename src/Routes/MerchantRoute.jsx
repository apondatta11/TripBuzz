//cursor
// import React, { use } from 'react';
// import { Navigate, useLocation } from 'react-router';
// import { AuthContext } from '../provider/AuthContext';

// const MerchantRoute = ({ children }) => {
//     const { user, userRole, loading } = use(AuthContext);
//     const location = useLocation();
    
//     if(loading){
//         return <span className="loading loading-ring loading-xl"></span>
//     }

//     if(!user){
//         return <Navigate to="/auth/login" state={location.pathname}></Navigate>
//     }

//     if(userRole !== 'merchant'){
//         return <Navigate to="/unauthorized" state={location.pathname}></Navigate>
//     }

//     return children;
// };

// export default MerchantRoute; 

//
import React from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';

const MerchantRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) {
        return <span className="loading loading-spinner loading-xl"></span>
    }

    if (!user || role !== 'rider') {
        return <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    }

    return children;
};

export default MerchantRoute;