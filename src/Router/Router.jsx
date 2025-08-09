import {
    createBrowserRouter,
} from "react-router";
import Root from "../Components/Root/Root";
import PrivateRoute from "@/Routes/PrivateRoute";
import AddPackages from "@/Pages/DashBoard/Merchant/AddPackages/AddPackages";
import AllPackages from "@/Pages/AllPackages/AllPackages";
import Details from "@/Pages/DashBoard/Customer/Details/Details";
import MyBookings from "@/Pages/Dashboard/Customer/MyBookings/MyBookings";
import ManagePackages from "@/Pages/DashBoard/Merchant/ManagePackages/ManagePackages";
import BookNow from "@/Pages/Dashboard/Customer/BookNow/BookNow";
import Login from "@/Pages/auth/Login/Login";
import Register from "@/Pages/auth/Register/Register";
import ForgotPassword from "@/Pages/auth/ForgotPassword/ForgotPassword";
import ErrorPage from "@/Pages/ErrorPage/ErrorPage";
import HomeLayout from "@/Layouts/HomeLayout/HomeLayout";
import AuthLayout from "@/Layouts/AuthLayout/AuthLayout";
import DashboardLayout from "@/Layouts/DashboardLayout/DashboardLayout";
import DashboardHome from "@/Pages/DashboardHome.jsx/DashboardHome";
import AdminRoute from "@/Routes/AdminRoute";
import MerchantRoute from "@/Routes/MerchantRoute";
import Payment from "@/Pages/Payment/Payment";
import PaymentHistory from "@/Pages/Payment/PaymentHistory";
import BeAMerchant from "@/Pages/DashBoard/Customer/BeAMerchant/BeAMerchant";
import MakeAdmin from "@/Pages/DashBoard/Admin/MakeAdmin/MakeAdmin";
import MyEarnings from "@/Pages/DashBoard/Merchant/MyEarnings/MyEarnings";
import PendingMerchants from "@/Pages/DashBoard/Admin/PendingMerchant/PendingMerchant";
import ActiveMerchants from "@/Pages/DashBoard/Admin/ActiveMerchants/ActiveMerchants";
import PackageApprovals from "@/Pages/DashBoard/Admin/PackageApprovals/PackageApprovals";
import PendingPackages from "@/Pages/DashBoard/Merchant/PendingPackages/PendingPackages";
import ApprovedPackages from "@/Pages/DashBoard/Merchant/ApprovedPackages/ApprovedPackages";
import UpdateMerchantProfile from "@/Pages/DashBoard/Merchant/UpdateMerchantProfile/UpdateMerchantProfile";
import PayNow from "@/Pages/DashBoard/Customer/PayNow/PayNow";



export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                Component: HomeLayout,
            },
            {
                path: "/addpackages",
                element: <PrivateRoute>
                    <AddPackages></AddPackages>
                </PrivateRoute>,
            },
            {
                path: '/allpackages',
                element:
                    <AllPackages></AllPackages>,
            },
            {
                path: '/packages/:id',
                element: <PrivateRoute>
                    <Details></Details>
                </PrivateRoute>,
            },
            {
                path: '/mybookings',
                element: <PrivateRoute><MyBookings></MyBookings></PrivateRoute>
            },
            {
                path: '/manage-packages',
                element: <PrivateRoute>
                    <ManagePackages></ManagePackages>
                </PrivateRoute>
            },
            {
                path: '/bookings/:id',
                element: <PrivateRoute>
                    <BookNow></BookNow>
                </PrivateRoute>
            }
        ],
    },
    {
        path: "/auth",
        Component: AuthLayout,
        children: [
            {
                path: "/auth/login",
                Component: Login,
            },
            {
                path: "/auth/register",
                Component: Register,
            },
            {
                path: "/auth/forgot-password",
                Component: ForgotPassword,
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children: [
            {
                index: true,
                Component: DashboardHome
            },
            {
                path: 'myBookings',
                element: <MyBookings></MyBookings>
            },
            {
                path:'payment',
                Component:PayNow,
            },

            {
                path: 'paymentHistory',
                Component: PaymentHistory
            },
            {
                path: 'be-a-merchant',
                Component: BeAMerchant,
            },
            {
                path:'update-merchant-profile',
                Component: UpdateMerchantProfile,
            },

            // admin only routes

            {
                path:'pending-packages',
                Component:PendingPackages
            },
            {
                path:'approved-packages',
                Component:ApprovedPackages
            },
            {
                path:'package-approvals',
                Component:PackageApprovals,
            },
            {
                path: 'pending-merchants',
                element: <PendingMerchants></PendingMerchants>
            },
              {
                path: 'active-merchants',
                element: <ActiveMerchants></ActiveMerchants>
              },
            {
                path: 'makeAdmin',
                element: <MakeAdmin></MakeAdmin>

            }
        ]
    },
    {
        path: "*",
        element: <ErrorPage></ErrorPage>
    },
]);