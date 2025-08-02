import React, { use } from 'react';

const MyBookingsList = ({ myBookingsPromise }) => {
    console.log(myBookingsPromise);
    const bookings = use(myBookingsPromise)

    return (
        <div>
            <h3>bookings: {bookings.length}</h3>
        </div>
    );
};

export default MyBookingsList;