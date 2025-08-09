export const packagesCreatedByPromise=(email,accessToken)=>{
    return fetch(`https://cse-2100-project-server.vercel.app/packages?email=${email}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(res=>res.json())
}