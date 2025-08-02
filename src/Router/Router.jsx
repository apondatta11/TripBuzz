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
            path:'/mybookings',
            element:<PrivateRoute><MyBookings></MyBookings></PrivateRoute>
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
        element:<MyBookings></MyBookings>
      },
      {
        path: 'payment/:tourId',
        Component: Payment
      },
    //   {
    //     path: 'paymentHistory',
    //     Component: PaymentHistory
    //   },
    //   {
    //     path: 'track',
    //     Component: TrackParcel
    //   },
      // rider only routes
    //   {
    //     path: 'pending-deliveries',
    //     element: <MerchantRoute><PendingDeliveries></PendingDeliveries></MerchantRoute>
    //   },
    //   {
    //     path: 'completed-deliveries',
    //     element: <MerchantRoute>
    //       <CompletedDeliveries></CompletedDeliveries>
    //     </MerchantRoute>
    //   },
    //   {
    //     path: 'my-earnings',
    //     element: <MerchantRoute>
    //       <MyEarnings></MyEarnings>
    //     </MerchantRoute>
    //   },
      // admin only routes
    //   {
    //     path: 'assign-rider',
    //     element: <AdminRoute><AssignRider></AssignRider></AdminRoute>
    //   },
    //   {
    //     path: 'pending-riders',
    //     element: <AdminRoute><PendingRiders></PendingRiders></AdminRoute>
    //   },
    //   {
    //     path: 'active-riders',
    //     element: <AdminRoute><ActiveRiders></ActiveRiders></AdminRoute>
    //   },
    //   {
    //     path: 'makeAdmin',
    //     element: <AdminRoute><MakeAdmin></MakeAdmin></AdminRoute>
    //   }
    ]
  },
{
    path: "*",
    element: <ErrorPage></ErrorPage>
},
]);