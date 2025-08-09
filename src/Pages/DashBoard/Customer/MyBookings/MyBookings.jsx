// import React, { useContext } from 'react';
// import { Link } from 'react-router';
// import { AuthContext } from '@/Provider/AuthContext';
// import { FaCalendarAlt, FaMoneyBillWave } from 'react-icons/fa';
// import { Button } from '@/components/ui/button';
// import Loading from '@/Components/Loading/Loading';
// import useAxiosSecure from '@/Hooks/useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';

// const fetchBookings = async (axiosSecure, email) => {
//     const { data } = await axiosSecure.get(`/bookings?email=${email}`);
//     return data;
// };

// const MyBookings = () => {
//     const { user } = useContext(AuthContext);
//     const axiosSecure = useAxiosSecure();

//     const {
//         data: bookings = [],
//         isLoading,
//         refetch,
//     } = useQuery({
//         queryKey: ['bookings', user?.email],
//         queryFn: () => fetchBookings(axiosSecure, user.email),
//         enabled: !!user?.email,
//         refetchInterval: 5000, // Poll every 5 seconds
//     });


//     // Refetch bookings when page becomes visible (after payment redirect)
//     React.useEffect(() => {
//         const handleVisibility = () => {
//             if (document.visibilityState === 'visible') {
//                 refetch();
//             }
//         };
//         document.addEventListener('visibilitychange', handleVisibility);
//         return () => document.removeEventListener('visibilitychange', handleVisibility);
//     }, [refetch]);

//     const goToPayment = async ({ packageId, bookingId }) => {
//         const booking = bookings.find(b => b._id === bookingId);
//         if (!booking) return;
//         const payment = {
//             name: user.displayName,
//             email: user.email,
//             price: booking.price,
//             transactionId: "",
//             date: new Date().toISOString().split('T')[0],
//             tourId: packageId,
//             bookingId: bookingId,
//             status: "pending",
//         };
//         const response = await axiosSecure.post("/create-ssl-payment", payment);
//         if (response.data?.gatewayUrl) {
//             window.location.replace(response.data.gatewayUrl);
//         }
//     };

//     if (isLoading) return <Loading />;

//     return (
//         <div className="min-h-screen bg-neutral py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-7xl mx-auto">
//                 <div className="text-center mb-16">
//                     <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4">
//                         My Travel Adventures
//                     </h1>
//                     <p className="text-xl text-text/80 max-w-3xl mx-auto">
//                         Relive your booked journeys and explore future trips
//                     </p>
//                 </div>
//                 {bookings.length > 0 ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                         {bookings.map(booking => (
//                             <div
//                                 key={booking._id}
//                                 className="card bg-neutral shadow-xl hover:shadow-2xl transition-all duration-300 border border-secondary/20"
//                             >
//                                 <div className="p-6">
//                                     <div className="flex justify-between items-start mb-4">
//                                         <h2 className="text-2xl font-bold text-primary">{booking.tourName}</h2>
//                                         <span className="badge badge-primary text-neutral-content">
//                                             Confirmed
//                                         </span>
//                                     </div>
//                                     <div className="space-y-3 text-text">
//                                         <div className="flex items-center">
//                                             <FaCalendarAlt className="mr-2 text-secondary" />
//                                             <span>
//                                                 {new Date(booking.bookingDate).toLocaleDateString('en-US', {
//                                                     year: 'numeric',
//                                                     month: 'long',
//                                                     day: 'numeric'
//                                                 })}
//                                             </span>
//                                         </div>
//                                         <div className="flex items-center">
//                                             <FaMoneyBillWave className="mr-2 text-secondary" />
//                                             <span className="font-semibold">
//                                                 ৳{booking.price || 'N/A'}
//                                             </span>
//                                         </div>
//                                         {booking.notes && (
//                                             <div className="mt-4">
//                                                 <h4 className="font-semibold mb-1">Your Notes:</h4>
//                                                 <p className="text-sm bg-neutral-focus p-3 rounded-lg">
//                                                     "{booking.notes}"
//                                                 </p>
//                                             </div>
//                                         )}
//                                         <div className="flex justify-between items-center mt-6">
//                                             <div className="rating rating-sm">
//                                                 {[1, 2, 3, 4, 5].map((star) => (
//                                                     <input
//                                                         key={star}
//                                                         type="radio"
//                                                         name={`rating-${booking._id}`}
//                                                         className="mask mask-star-2 bg-secondary"
//                                                     />
//                                                 ))}
//                                             </div>
//                                             <Link
//                                                 to={`/packages/${booking.packageId}`}
//                                                 className="btn btn-sm btn-primary text-neutral-content"
//                                             >
//                                                 View Details
//                                             </Link>
//                                             {booking.payment_status !== 'paid' && (
//                                                 <Button onClick={() => goToPayment({ packageId: booking.packageId, bookingId: booking._id })}>
//                                                     Pay Now
//                                                 </Button>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     <div className="text-center py-16">
//                         <div className="text-6xl mb-4">✈️</div>
//                         <h3 className="text-2xl font-bold mb-2 text-primary">No Bookings Yet</h3>
//                         <p className="text-text/70 mb-6">Start your journey by exploring our amazing packages</p>
//                         <Link to="/allpackages" className="btn btn-primary text-neutral-content">
//                             Browse Packages
//                         </Link>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default MyBookings;

import React, { useContext, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '@/Provider/AuthContext';
import { FaCalendarAlt, FaMoneyBillWave, FaMapMarkerAlt } from 'react-icons/fa';
import { IoIosAirplane } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import Loading from '@/Components/Loading/Loading';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

const fetchBookings = async (axiosSecure, email) => {
    const { data } = await axiosSecure.get(`/bookings?email=${email}`);
    return data;
};

const MyBookings = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [activeTab, setActiveTab] = useState('upcoming');

    const {
        data: bookings = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: () => fetchBookings(axiosSecure, user.email),
        enabled: !!user?.email,
    });

    const filteredBookings = bookings.filter(booking => {
        const departureDate = new Date(booking.departureDate || booking.bookingDate);
        const today = new Date();
        
        if (activeTab === 'upcoming') return departureDate >= today;
        if (activeTab === 'past') return departureDate < today;
        return true;
    });

    const goToPayment = async (bookingId, packageId) => {
        const booking = bookings.find(b => b._id === bookingId);
        if (!booking) return;
        
        const payment = {
            name: user.displayName,
            email: user.email,
            price: booking.price,
            transactionId: "",
            date: new Date().toISOString().split('T')[0],
            tourId: packageId,
            bookingId: bookingId,
            status: "pending",
        };
        
        const response = await axiosSecure.post("/create-ssl-payment", payment);
        if (response.data?.gatewayUrl) {
            window.location.replace(response.data.gatewayUrl);
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4"
                    >
                        My Bookings
                    </motion.h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Manage your upcoming trips and past adventures
                    </p>
                </div>

                {/* Interactive Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="tabs tabs-boxed bg-muted p-1 rounded-xl">
                        <button 
                            className={`tab ${activeTab === 'upcoming' ? 'tab-active bg-card text-card-foreground shadow-sm' : 'text-muted-foreground'} px-6 py-2 rounded-lg`}
                            onClick={() => setActiveTab('upcoming')}
                        >
                            Upcoming
                        </button> 
                        <button 
                            className={`tab ${activeTab === 'past' ? 'tab-active bg-card text-card-foreground shadow-sm' : 'text-muted-foreground'} px-6 py-2 rounded-lg`}
                            onClick={() => setActiveTab('past')}
                        >
                            Past Trips
                        </button> 
                        <button 
                            className={`tab ${activeTab === 'all' ? 'tab-active bg-card text-card-foreground shadow-sm' : 'text-muted-foreground'} px-6 py-2 rounded-lg`}
                            onClick={() => setActiveTab('all')}
                        >
                            All Bookings
                        </button>
                    </div>
                </div>

                {filteredBookings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBookings.map((booking) => (
                            <motion.div
                                key={booking._id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="card bg-card text-card-foreground shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden border border-border"
                            >
                                {/* Trip Status Ribbon */}
                                {booking.payment_status === 'paid' ? (
                                    <div className="absolute top-16 right-4 bg-success text-success-foreground text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                        Paid
                                    </div>
                                ) : (
                                    <div className="absolute top-16 right-4 bg-warning text-warning-foreground text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                        Payment Pending
                                    </div>
                                )}

                                <div className="p-6">
                                    {/* Destination Header */}
                                    <div className="flex items-center mb-4">
                                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                                            <IoIosAirplane className="text-primary text-xl" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold">{booking.tourName}</h2>
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <FaMapMarkerAlt className="mr-1" />
                                                <span>{booking.destination || 'Multiple destinations'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Trip Details */}
                                    <div className="space-y-3 mb-4">
                                        <div className="flex items-center">
                                            <FaCalendarAlt className="mr-3 text-primary" />
                                            <div>
                                                <p className="text-sm text-muted-foreground">Departure</p>
                                                <p className="font-medium">
                                                    {new Date(booking.departureDate || booking.bookingDate).toLocaleDateString('en-US', {
                                                        weekday: 'short',
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <FaMoneyBillWave className="mr-3 text-primary" />
                                            <div>
                                                <p className="text-sm text-muted-foreground">Total Price</p>
                                                <p className="font-bold text-lg text-primary">
                                                    ৳{parseInt(booking.price).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Special Notes */}
                                    {booking.specialNote && (
                                        <div className="mb-4">
                                            <h4 className="font-semibold text-sm text-muted-foreground mb-1">Your Notes:</h4>
                                            <p className="text-sm bg-muted p-3 rounded-lg italic">
                                                "{booking.specialNote}"
                                            </p>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex justify-between items-center mt-6">
                                        <Link
                                            to={`/packages/${booking.packageId}`}
                                            className="btn btn-sm btn-outline border-border hover:border-primary hover:bg-primary/10"
                                        >
                                            View Package
                                        </Link>
                                        
                                        {booking.payment_status !== 'paid' && (
                                            <Button 
                                                onClick={() => goToPayment(booking._id, booking.packageId)}
                                                className="btn-sm bg-primary hover:bg-primary/90 text-primary-foreground"
                                            >
                                                Pay Now
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16 bg-card rounded-2xl shadow-sm border border-border"
                    >
                        <div className="inline-block p-6 bg-primary/10 rounded-full mb-6">
                            <IoIosAirplane className="text-5xl text-primary rotate-45" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">No {activeTab === 'all' ? '' : activeTab} Bookings</h3>
                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                            {activeTab === 'upcoming' 
                                ? "You don't have any upcoming trips booked yet."
                                : "You haven't completed any trips yet."}
                        </p>
                        <Link 
                            to="/allpackages" 
                            className="btn btn-primary px-8 shadow-md hover:shadow-lg transition-shadow"
                        >
                            Browse Packages
                        </Link>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;