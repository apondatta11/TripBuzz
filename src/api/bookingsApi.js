// export const myBookingsPromise = (email, accessToken) => {
//     return fetch(`http://localhost:4000/bookings?email=${email}`, {
//         headers: {
//             'Authorization': `Bearer ${accessToken}`
//         }
//     })
//     .then(res => res.json());
// };
export const myBookingsPromise = (email) => {
    return fetch(`http://localhost:4000/bookings?email=${email}`)
    .then(res => res.json())
}