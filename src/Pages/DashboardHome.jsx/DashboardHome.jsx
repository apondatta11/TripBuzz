import Loading from '@/Components/Loading/Loading';
import useUserRole from '@/Hooks/useUserRole';
import React from 'react';
import UserDashboard from './UserDashboard';
import MerchantDashboard from './MerchantDashborad';
import AdminDashboard from './AdminDashboard';
import Forbidden from '../Forbidden/Forbidden';


const DashboardHome = () => {
    const { role, roleLoading } = useUserRole();

    if (roleLoading) {
        return <Loading></Loading>
    }

    if(role === 'user'){
        return <UserDashboard></UserDashboard>
    }
    else if(role === 'merchant'){
        return <MerchantDashboard></MerchantDashboard>
    }
    else if(role ==='admin'){
        return <AdminDashboard></AdminDashboard>
    }
    else {
        return <Forbidden></Forbidden>
    }

};

export default DashboardHome;