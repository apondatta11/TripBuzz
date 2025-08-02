//from cursor

// import React, { use } from 'react';
// import { Navigate, useLocation } from 'react-router';
// import { AuthContext } from '../provider/AuthContext';

// const AdminRoute = ({ children }) => {
//     const { user, userRole, loading } = use(AuthContext);
//     const location = useLocation();
    
//     if(loading){
//         return <span className="loading loading-ring loading-xl"></span>
//     }

//     if(!user){
//         return <Navigate to="/auth/login" state={location.pathname}></Navigate>
//     }

//     if(userRole !== 'admin'){
//         return <Navigate to="/unauthorized" state={location.pathname}></Navigate>
//     }

//     return children;
// };

// export default AdminRoute; 





import React, { Children } from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';
import { Navigate } from 'react-router';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) {
        return <span className="loading loading-spinner loading-xl"></span>
    }

    if (!user || role !== 'admin') {
        return <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    }

    return children;
};

export default AdminRoute;