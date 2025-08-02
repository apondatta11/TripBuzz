// import React, { use, useEffect } from 'react';
// import { Link } from 'react-router';
// import { AuthContext } from '@/provider/AuthContext';
// import { myBookingsPromise } from '@/api/bookingsApi';
// import { FaCalendarAlt, FaMapMarkerAlt, FaMoneyBillWave, FaStar } from 'react-icons/fa';

// const MyBookings = () => {
//     const { user } = use(AuthContext);
//     const [bookings, setBookings] = React.useState([]);
//     const [filteredBookings, setFilteredBookings] = React.useState([]);


//     // Filter bookings based on payment status


//     return (
//         <div className="min-h-screen bg-neutral py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-7xl mx-auto">
//                 {/* Header Section */}
//                 <div className="text-center mb-16">
//                     <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4">
//                         My Travel Adventures
//                     </h1>
//                     <p className="text-xl text-text/80 max-w-3xl mx-auto">
//                         Relive your booked journeys and explore future trips
//                     </p>
//                 </div>

//                 {loading ? (
//                     <div className="flex justify-center items-center h-64">
//                         <span className="loading loading-spinner loading-lg text-primary"></span>
//                     </div>
//                 ) : bookings.length > 0 ? (
//                     <>


//                         {filteredBookings.length > 0 ? (
//                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                                 {filteredBookings.map(booking => (
//                                     <div 
//                                         key={booking._id}
//                                         className="card bg-neutral shadow-xl hover:shadow-2xl transition-all duration-300 border border-secondary/20"
//                                     >
//                                         <div className="p-6">
//                                             <div className="flex justify-between items-start mb-4">
//                                                 <h2 className="text-2xl font-bold text-primary">{booking.tour_name}</h2>
//                                                 <span className={`badge ${
//                                                     booking.status === 'completed' 
//                                                         ? 'badge-success' 
//                                                         : booking.status === 'pending' 
//                                                             ? 'badge-warning' 
//                                                             : 'badge-primary'
//                                                 } text-neutral-content`}>
//                                                     {booking.status === 'completed' ? 'Confirmed' : 
//                                                      booking.status === 'pending' ? 'Pending Payment' : 
//                                                      'Processing'}
//                                                 </span>
//                                             </div>

//                                             <div className="space-y-3 text-text">
//                                                 <div className="flex items-center">
//                                                     <FaCalendarAlt className="mr-2 text-secondary" />
//                                                     <span>
//                                                         {new Date(booking.bookingDate).toLocaleDateString('en-US', {
//                                                             year: 'numeric',
//                                                             month: 'long',
//                                                             day: 'numeric'
//                                                         })}
//                                                     </span>
//                                                 </div>

//                                                 <div className="flex items-center">
//                                                     <FaMoneyBillWave className="mr-2 text-secondary" />
//                                                     <span className="font-semibold">
//                                                         ৳{booking.price || 'N/A'}
//                                                     </span>
//                                                 </div>

//                                                 {booking.notes && (
//                                                     <div className="mt-4">
//                                                         <h4 className="font-semibold mb-1">Your Notes:</h4>
//                                                         <p className="text-sm bg-neutral-focus p-3 rounded-lg">
//                                                             "{booking.notes}"
//                                                         </p>
//                                                     </div>
//                                                 )}

//                                                 <div className="flex justify-between items-center mt-6">
//                                                     <div className="rating rating-sm">
//                                                         {[1, 2, 3, 4, 5].map((star) => (
//                                                             <input
//                                                                 key={star}
//                                                                 type="radio"
//                                                                 name={`rating-${booking._id}`}
//                                                                 className="mask mask-star-2 bg-secondary"
//                                                             />
//                                                         ))}
//                                                     </div>
//                                                     <div className="space-x-2">
//                                                         <Link 
//                                                             to={`/packages/${booking.tour_id}`}
//                                                             className="btn btn-sm btn-primary text-neutral-content"
//                                                         >
//                                                             View Details
//                                                         </Link>
//                                                         {booking.status === 'pending' && (
//                                                             <Link 
//                                                                 to={`/payment/${booking._id}`}
//                                                                 className="btn btn-sm btn-success text-neutral-content"
//                                                             >
//                                                                 Pay Now
//                                                             </Link>
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         ) : (
//                             <div className="text-center py-16">
//                                 <div className="text-6xl mb-4">🔍</div>
//                                 <h3 className="text-2xl font-bold mb-2 text-primary">No {filter === 'all' ? '' : filter} Bookings</h3>
//                                 <p className="text-text/70 mb-6">
//                                     {filter === 'all' 
//                                         ? "Start your journey by exploring our amazing packages"
//                                         : `No ${filter} bookings found. Try a different filter.`
//                                     }
//                                 </p>
//                                 {filter === 'all' && (
//                                     <Link to="/allpackages" className="btn btn-primary text-neutral-content">
//                                         Browse Packages
//                                     </Link>
//                                 )}
//                             </div>
//                         )}
//                     </>
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


import React, { use, useEffect } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '@/Provider/AuthContext';
import { myBookingsPromise } from '@/api/bookingsApi';
import { FaCalendarAlt, FaMapMarkerAlt, FaMoneyBillWave, FaStar } from 'react-icons/fa';

const MyBookings = () => {
    const { user } = use(AuthContext);
    const [bookings, setBookings] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        if (user?.email) {
            myBookingsPromise(user.email)
                .then(data => {
                    setBookings(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Booking error:", error);
                    setLoading(false);
                });
        }
    }, [user?.email]);

    return (
        <div className="min-h-screen bg-neutral py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4">
                        My Travel Adventures
                    </h1>
                    <p className="text-xl text-text/80 max-w-3xl mx-auto">
                        Relive your booked journeys and explore future trips
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div>
                ) : bookings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {bookings.map(booking => (
                            <div 
                                key={booking._id}
                                className="card bg-neutral shadow-xl hover:shadow-2xl transition-all duration-300 border border-secondary/20"
                            >
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <h2 className="text-2xl font-bold text-primary">{booking.tour_name}</h2>
                                        <span className="badge badge-primary text-neutral-content">
                                            Confirmed
                                        </span>
                                    </div>

                                    <div className="space-y-3 text-text">
                                        <div className="flex items-center">
                                            <FaCalendarAlt className="mr-2 text-secondary" />
                                            <span>
                                                {new Date(booking.bookingDate).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>

                                        <div className="flex items-center">
                                            <FaMoneyBillWave className="mr-2 text-secondary" />
                                            <span className="font-semibold">
                                                ৳{booking.price || 'N/A'}
                                            </span>
                                        </div>

                                        {booking.notes && (
                                            <div className="mt-4">
                                                <h4 className="font-semibold mb-1">Your Notes:</h4>
                                                <p className="text-sm bg-neutral-focus p-3 rounded-lg">
                                                    "{booking.notes}"
                                                </p>
                                            </div>
                                        )}

                                        <div className="flex justify-between items-center mt-6">
                                            <div className="rating rating-sm">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <input
                                                        key={star}
                                                        type="radio"
                                                        name={`rating-${booking._id}`}
                                                        className="mask mask-star-2 bg-secondary"
                                                    />
                                                ))}
                                            </div>
                                            <Link 
                                                to={`/packages/${booking.tour_id}`}
                                                className="btn btn-sm btn-primary text-neutral-content"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">✈️</div>
                        <h3 className="text-2xl font-bold mb-2 text-primary">No Bookings Yet</h3>
                        <p className="text-text/70 mb-6">Start your journey by exploring our amazing packages</p>
                        <Link to="/allpackages" className="btn btn-primary text-neutral-content">
                            Browse Packages
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;
