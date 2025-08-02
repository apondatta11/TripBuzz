export const packagesCreatedByPromise=(email,accessToken)=>{
    return fetch(`http://localhost:4000/packages?email=${email}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(res=>res.json())
}