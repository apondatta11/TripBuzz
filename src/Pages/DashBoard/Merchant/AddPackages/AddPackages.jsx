// import React, { use } from 'react';
// import Swal from 'sweetalert2';
// import { AuthContext } from '../provider/AuthContext';
// import axios from 'axios';

// const AddPackages = () => {
//     const { user } = use(AuthContext)
//     console.log(user)

//     const handleAddPackages = e => {
//         e.preventDefault();
//         const form = e.target;
//         const formData = new FormData(form);
//         const newPost = Object.fromEntries(formData.entries())
//         console.log(newPost);
//         //pathanor age status niye ekta kahini ase,status name notun ekta property declare type dekha jak
//         // send listing data to the db
//         axios.post('http://localhost:4000/packages', newPost)
//             .then(res => {
//                 if (res.data.insertedId) {
//                     Swal.fire({
//                         position: "top-end",
//                         icon: "success",
//                         title: "Package added successfully!",
//                         showConfirmButton: false,
//                         timer: 1500,
//                         background: 'var(--color-neutral)',
//                         color: 'var(--color-text)'
//                     });
//                     //form.reset();
//                 }
//             })
//             .catch(error => {
//                 console.log(error);
//             })



//     }
//     return (
//         <div>
//             <div className="bg-background min-h-screen py-10 px-4">
//                 <div className="max-w-4xl mx-auto bg-secondary p-8 rounded-2xl shadow-lg">

//                 {/* Header Section */}
//                <div className="bg-primary p-6 text-neutral-content">
//                    <div className="flex items-center gap-3">
//                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                        </svg>
//                        <h2 className="text-2xl font-bold">Create New Tour Package</h2>
//                    </div>
//                    <p className="mt-1 opacity-90">Fill out the form to list your travel experience</p>
//                </div>
                    
//                     <h2 className="text-3xl font-bold mb-6 text-center text-accent">📋 Submit Tour Package</h2>

//                     <form onSubmit={handleAddPackages} className="grid grid-cols-1 md:grid-cols-2 gap-6">

//                         {/* Tour Name */}
//                         <div>
//                             <label className="block font-medium mb-1">Tour Name</label>
//                             <input type="text" name="tourName" className="input input-bordered w-full" required />
//                         </div>

//                         {/* Image Upload */}
//                         <div>
//                             <label className="block font-medium mb-1">Tour Image</label>
//                             <input type="url" name="image" className="input input-bordered w-full" placeholder="Image URL" required />
//                         </div>

//                         {/* Duration */}
//                         <div>
//                             <label className="block font-medium mb-1">Duration</label>
//                             <input type="text" name="duration" className="input input-bordered w-full" placeholder="3 Days 2 Nights" required />
//                         </div>

//                         {/* Departure Date */}
//                         <div>
//                             <label className="block font-medium mb-1">Departure Date</label>
//                             <input type="date" name="departureDate" className="input input-bordered w-full" required />
//                         </div>

//                         {/* Departure Location */}
//                         <div>
//                             <label className="block font-medium mb-1">Departure Location</label>
//                             <input type="text" name="departureLocation" className="input input-bordered w-full" required />
//                         </div>

//                         {/* Destination */}
//                         <div>
//                             <label className="block font-medium mb-1">Destination</label>
//                             <input type="text" name="destination" className="input input-bordered w-full" required />
//                         </div>

//                         {/* Price */}
//                         <div>
//                             <label className="block font-medium mb-1">Price (in BDT)</label>
//                             <input type="number" name="price" className="input input-bordered w-full" required />
//                         </div>

//                         {/* Contact No */}
//                         <div>
//                             <label className="block font-medium mb-1">Contact Number</label>
//                             <input type="tel" name="contact" className="input input-bordered w-full" required />
//                         </div>

//                         {/* Package Details - Full width */}
//                         <div className="md:col-span-2">
//                             <label className="block font-medium mb-1">Package Details</label>
//                             <textarea name="details" rows="4" className="textarea textarea-bordered w-full" placeholder="Describe the tour package..." required />
//                         </div>

//                         {/* Guide Info */}
//                         <div className="md:col-span-2 border-t pt-6 mt-4">
//                             <h3 className="text-xl font-semibold mb-4 text-primary">👨‍💼 Guide Info (Auto-filled)</h3>

//                             <div className="grid md:grid-cols-3 gap-4">
//                                 <input type="text" name="guideName" className="input input-bordered w-full" value={user.displayName} readOnly />
//                                 <input type="email" name="guideEmail" className="input input-bordered w-full" value={user.email} readOnly />
//                                 <input type="url" name="guidePhoto" className="input input-bordered w-full" value={user.photoURL} readOnly />
//                             </div>
//                         </div>

//                         {/* Submit Button */}
//                         <div className="md:col-span-2 text-center mt-6">
//                             <button type="submit" className="btn bg-accent text-white hover:bg-accent/90 px-6 py-2">
//                                 Submit Tour Package
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>

//         </div>
//     );
// };

// export default AddPackages;
import React, { use } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '@/Provider/AuthContext';
import axios from 'axios';

const AddPackages = () => {
    const { user } = use(AuthContext);
    console.log(user)

    const handleAddPackages = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const newPost = Object.fromEntries(formData.entries())
        console.log(newPost);
        
        axios.post('http://localhost:4000/packages', newPost)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Package added successfully!",
                        showConfirmButton: false,
                        timer: 1500,
                        background: 'var(--color-neutral)',
                        color: 'var(--color-text)'
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div className="bg-neutral min-h-screen py-10 px-4">
            <div className="max-w-4xl mx-auto bg-neutral p-8 rounded-2xl shadow-lg border border-secondary/20">
                            {/* Header Section */}
                                            <div className="bg-primary p-6 text-neutral-content">
                                                    <div className="flex items-center gap-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                    <h2 className="text-2xl font-bold">Create New Tour Package</h2>
                                                </div>
                                                <p className="mt-1 opacity-90">Fill out the form to list your travel experience</p>
                                            </div>
                <h2 className="text-3xl font-bold mb-6 text-center text-primary">📋 Submit Tour Package</h2>

                <form onSubmit={handleAddPackages} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Tour Name */}
                    <div>
                        <label className="block font-medium mb-1 text-text">Tour Name</label>
                        <input 
                            type="text" 
                            name="tourName" 
                            className="input input-bordered w-full bg-neutral-focus border-secondary/20" 
                            required 
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block font-medium mb-1 text-text">Tour Image</label>
                        <input 
                            type="url" 
                            name="image" 
                            className="input input-bordered w-full bg-neutral-focus border-secondary/20" 
                            placeholder="Image URL" 
                            required 
                        />
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="block font-medium mb-1 text-text">Duration</label>
                        <input 
                            type="text" 
                            name="duration" 
                            className="input input-bordered w-full bg-neutral-focus border-secondary/20" 
                            placeholder="3 Days 2 Nights" 
                            required 
                        />
                    </div>

                    {/* Departure Date */}
                    <div>
                        <label className="block font-medium mb-1 text-text">Departure Date</label>
                        <input 
                            type="date" 
                            name="departureDate" 
                            className="input input-bordered w-full bg-neutral-focus border-secondary/20" 
                            required 
                        />
                    </div>

                    {/* Departure Location */}
                    <div>
                        <label className="block font-medium mb-1 text-text">Departure Location</label>
                        <input 
                            type="text" 
                            name="departureLocation" 
                            className="input input-bordered w-full bg-neutral-focus border-secondary/20" 
                            required 
                        />
                    </div>

                    {/* Destination */}
                    <div>
                        <label className="block font-medium mb-1 text-text">Destination</label>
                        <input 
                            type="text" 
                            name="destination" 
                            className="input input-bordered w-full bg-neutral-focus border-secondary/20" 
                            required 
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block font-medium mb-1 text-text">Price (in BDT)</label>
                        <input 
                            type="number" 
                            name="price" 
                            className="input input-bordered w-full bg-neutral-focus border-secondary/20" 
                            required 
                        />
                    </div>

                    {/* Contact No */}
                    <div>
                        <label className="block font-medium mb-1 text-text">Contact Number</label>
                        <input 
                            type="tel" 
                            name="contact" 
                            className="input input-bordered w-full bg-neutral-focus border-secondary/20" 
                            required 
                        />
                    </div>

                    {/* Package Details - Full width */}
                    <div className="md:col-span-2">
                        <label className="block font-medium mb-1 text-text">Package Details</label>
                        <textarea 
                            name="details" 
                            rows="4" 
                            className="textarea textarea-bordered w-full bg-neutral-focus border-secondary/20" 
                            placeholder="Describe the tour package..." 
                            required 
                        />
                    </div>

                    {/* Guide Info */}
                    <div className="md:col-span-2 border-t border-secondary/20 pt-6 mt-4">
                        <h3 className="text-xl font-semibold mb-4 text-primary">👨‍💼 Guide Info (Auto-filled)</h3>

                        <div className="grid md:grid-cols-3 gap-4">
                            <input 
                                type="text" 
                                name="guideName" 
                                className="input input-bordered w-full bg-neutral border-secondary/20" 
                                value={user?.displayName || ''} 
                                readOnly 
                            />
                            <input 
                                type="email" 
                                name="guideEmail" 
                                className="input input-bordered w-full bg-neutral border-secondary/20" 
                                value={user?.email || ''} 
                                readOnly 
                            />
                            <input 
                                type="url" 
                                name="guidePhoto" 
                                className="input input-bordered w-full bg-neutral border-secondary/20" 
                                value={user?.photoURL || ''} 
                                readOnly 
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2 text-center mt-6">
                        <button 
                            type="submit" 
                            className="btn bg-primary hover:bg-primary/90 text-neutral-content px-8 py-3 rounded-lg"
                        >
                            Submit Tour Package
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPackages;