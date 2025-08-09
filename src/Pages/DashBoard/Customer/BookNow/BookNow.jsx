// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router';
// import useAuth from '@/Hooks/UseAuth';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const BookNow = () => {
//     const { id } = useParams();
//     // console.log(typeof tour_id);
//     const { user } = useAuth();
//     // console.log(tour_id, user)

//     const [date, setDate] = useState('');
//     useEffect(() => {
//         const timestamp = Date.now();
//         const today = new Date(timestamp).toISOString().split('T')[0];
//         setDate(today);
//     }, []);

//     const [listing, setListing] = useState(null);

//     useEffect(() => {
//         fetch(`https://cse-2100-project-server.vercel.app/packages/${id}`)
//         .then((res) => res.json())
//         .then((data) => {
//             setListing(data);
//         });
//     }, [id]);

//     console.log(listing);

//     if (!listing) return (<div className="flex justify-center items-center h-screen">
//         <span className="loading loading-ring loading-lg text-accent"></span>
//     </div>)
//     const {  tourName, price  } = listing;


//     const handleSubmit = e => {
//         e.preventDefault();
//         const form = e.target;
//         const specialNote = form.specialNote.value;
//         // const tourName = tourName;
//         // const buyerName = form.buyerName.value;
//         // const buyerEmail = form.buyerEmail.value;
//         const booking = {
//             tour_id: id,
//             buyer_email: user?.email,
//             buyer_name: user?.displayName,
//             tour_name: tourName,
//             bookingDate: date,
//             notes: specialNote,
//         };

//         console.log(booking);
//             axios.post('https://cse-2100-project-server.vercel.app/bookings', booking)
//             .then(res => {
//                 console.log(res.data)
//                 if(res.data.insertedId){
//                     Swal.fire({
//                         position: "top-end",
//                         icon: "success",
//                         title: "Your Booking has been Confirmed",
//                         showConfirmButton: false,
//                         timer: 1500
//                       });
//                 }
//             })
//             .catch(error => {
//                 console.log(error)
//             })
//     }

//     return (
//         <div className="w-[90vw] max-w-4xl mx-auto p-8 bg-base-200 rounded-2xl shadow-lg">
//             <h2 className="text-2xl font-bold mb-6 text-center text-accent">Book This Tour</h2>
//             <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

//                 {/* Tour Name */}
//                 <div>
//                     <label className="label">
//                         <span className="label-text">Tour Package Name</span>
//                     </label>
//                     <input
//                         type="text"
//                         defaultValue={tourName}
//                         readOnly
//                         className="input input-bordered w-full bg-gray-100"
//                     />
//                 </div>

//                 {/* Price */}
//                 <div>
//                     <label className="label">
//                         <span className="label-text">Price (BDT)</span>
//                     </label>
//                     <input
//                         type="text"
//                         defaultValue={price}
//                         readOnly
//                         className="input input-bordered w-full bg-gray-100"
//                     />
//                 </div>

//                 {/* Buyer Name */}
//                 <div>
//                     <label className="label">
//                         <span className="label-text">Buyer Name</span>
//                     </label>
//                     <input
//                         type="text"
//                         defaultValue={user?.displayName}
//                         readOnly
//                         className="input input-bordered w-full bg-gray-100"
//                     />
//                 </div>

//                 {/* Buyer Email */}
//                 <div>
//                     <label className="label">
//                         <span className="label-text">Buyer Email</span>
//                     </label>
//                     <input
//                         type="email"
//                         defaultValue={user?.email}
//                         readOnly
//                         className="input input-bordered w-full bg-gray-100"
//                     />
//                 </div>

//                 {/* Booking Date */}
//                 <div>
//                     <label className="label">
//                         <span className="label-text">Booking Date</span>
//                     </label>
//                     <input
//                         type="date"
//                         value={date}
//                         readOnly
//                         className="input input-bordered w-full bg-gray-100"
//                     />
//                 </div>

//                 {/* Special Note */}
//                 <div className="col-span-2">
//                     <label className="label">
//                         <span className="label-text">Special Note (optional)</span>
//                     </label>
//                     <textarea
//                         name="specialNote"
//                         className="textarea textarea-bordered w-full"
//                         rows="4"
//                         placeholder="Any preferences or instructions?"
//                     ></textarea>
//                 </div>

//                 <div className="col-span-2 text-center">
//                     <button className="btn btn-accent w-1/2 mt-4">Confirm Booking</button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default BookNow;

import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import useAuth from '@/Hooks/useAuth';
import Swal from 'sweetalert2';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Button } from '@/components/ui/button';
import Loading from '@/Components/Loading/Loading';

const BookNow = () => {
    const { id } = useParams();
    const [packageData, setPackageData] = useState(null);
    const [specialNote, setSpecialNote] = useState('');
    const [bookingId, setBookingId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [date, setDate] = useState('');
    useEffect(() => {
        const timestamp = Date.now();
        const today = new Date(timestamp).toISOString().split('T')[0];
        setDate(today);
    }, []);

    useEffect(() => {
        axiosSecure.get(`/packages/${id}`)
            .then(res => setPackageData(res.data))
            .catch(err => console.error(err));
    }, [axiosSecure, id]);

    const handleBooking = () => {
        const bookingInfo = {
            packageId: id,
            tourName: packageData.tourName,
            price: packageData.price,
            userEmail: user.email,
            userName: user.displayName,
            userImage: user.photoURL,
            specialNote,
            payment_status: 'pending',
            bookingDate: date,
        };

        axiosSecure.post('/bookings', bookingInfo)
            .then(res => {
                console.log(res.data);
                setBookingId(res.data.insertedId);
            axiosSecure.get(`/bookings/${res.data.insertedId}`)
                .then(response => {
                    const booking = response.data;
                    if (booking.payment_status === 'paid') {
                        Swal.fire({
                            icon: 'info',
                            title: 'Already Paid',
                            text: 'You have already paid for this package.',
                            confirmButtonColor: '#3085d6'
                        });
                    } else {
                        setIsModalOpen(true);
                    }
                });
            })
            .catch(err => {
                console.log(err);
                
            });
    };


    const goToPayment = async() => {
        setIsModalOpen(false);
        // navigate(`/dashboard/payment/${bookingId}`);
        // now saving the payment in the database
        const payment = {
            name: user.displayName,
            email: user.email,
            price: price,
            transactionId: "",
            date: date,
            tourId: id,
            bookingId: bookingId, 
            status: "pending",
        };
        console.log("payment", payment);
        const response = await axiosSecure.post("/create-ssl-payment", payment);
        if (response.data?.gatewayUrl) {
            window.location.replace(response.data.gatewayUrl);
        }
        console.log("payment response", response.data);
    };

    const goToMyBookings = () => {
        setIsModalOpen(false);
        navigate('/mybookings');
    };

    if (!packageData) return <Loading></Loading>
    console.log(packageData);
    const { tourName, price } = packageData;

    return (
        <div className="w-[90vw] max-w-4xl mx-auto p-8 bg-card rounded-2xl shadow-lg mt-20 border border-border">
            <h2 className="text-2xl font-bold mb-6 text-center text-accent">Confirm Your Booking</h2>

            <div className="grid grid-cols-2 gap-6">
                {/* Tour Name */}
                <div>
                    <label className="block mb-2 text-sm font-medium text-muted-foreground">
                        Tour Package Name
                    </label>
                    <input
                        type="text"
                        defaultValue={tourName}
                        readOnly
                        className="w-full p-3 rounded-lg border border-input bg-input text-foreground"
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block mb-2 text-sm font-medium text-muted-foreground">
                        Price (BDT)
                    </label>
                    <input
                        type="text"
                        defaultValue={price}
                        readOnly
                        className="w-full p-3 rounded-lg border border-input bg-input text-foreground"
                    />
                </div>

                {/* Buyer Name */}
                <div>
                    <label className="block mb-2 text-sm font-medium text-muted-foreground">
                        Buyer Name
                    </label>
                    <input
                        type="text"
                        defaultValue={user?.displayName}
                        readOnly
                        className="w-full p-3 rounded-lg border border-input bg-input text-foreground"
                    />
                </div>

                {/* Buyer Email */}
                <div>
                    <label className="block mb-2 text-sm font-medium text-muted-foreground">
                        Buyer Email
                    </label>
                    <input
                        type="email"
                        defaultValue={user?.email}
                        readOnly
                        className="w-full p-3 rounded-lg border border-input bg-input text-foreground"
                    />
                </div>

                {/* Booking Date */}
                <div>
                    <label className="block mb-2 text-sm font-medium text-muted-foreground">
                        Booking Date
                    </label>
                    <input
                        type="date"
                        value={date}
                        readOnly
                        className="w-full p-3 rounded-lg border border-input bg-input text-foreground"
                    />
                </div>

                {/* Special Notes */}
                <div className='col-span-2'>
                    <label className="block mb-3 text-sm font-medium text-muted-foreground">
                        Special Notes
                    </label>
                    <textarea
                        className="w-full p-3 rounded-2xl border border-input bg-input text-foreground text-lg"
                        rows="4"
                        value={specialNote}
                        onChange={(e) => setSpecialNote(e.target.value)}
                        placeholder="Anything we should know?"
                    ></textarea>
                </div>

                <div className="col-span-2 text-center">
                    <Button className="mt-4 w-full" onClick={handleBooking}>Confirm Booking</Button>
                </div>
            </div>

            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
                    <DialogPanel className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
                        <DialogTitle className="text-xl font-bold text-green-600 mb-2">Booking Confirmed!</DialogTitle>
                        <p className="mb-4">Would you like to proceed to payment now?</p>
                        <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={goToMyBookings}>No, later</Button>
                            <Button onClick={goToPayment}>Yes, proceed</Button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    );
};

export default BookNow;
