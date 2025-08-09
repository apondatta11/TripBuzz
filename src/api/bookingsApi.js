// export const myBookingsPromise = (email, accessToken) => {
//     return fetch(`https://cse-2100-project-server.vercel.app/bookings?email=${email}`, {
//         headers: {
//             'Authorization': `Bearer ${accessToken}`
//         }
//     })
//     .then(res => res.json());
// };
export const myBookingsPromise = (email) => {
    return fetch(`https://cse-2100-project-server.vercel.app/bookings?email=${email}`)
    .then(res => res.json())
}